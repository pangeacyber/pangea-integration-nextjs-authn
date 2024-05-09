import { PangeaConfig, AuthNService, PangeaErrors } from "pangea-node-sdk";
import { type NextRequest, NextResponse } from "next/server";

const config = new PangeaConfig({ domain: process.env.PANGEA_DOMAIN });
const authn = new AuthNService(process.env.PANGEA_TOKEN, config);

const getBearerToken = (req: NextRequest) => {
  const authorizationHeader = req.headers.get("authorization");

  const authorizationHeaderParts = authorizationHeader?.split(" ");

  const bearerToken =
    authorizationHeaderParts?.[0]?.toLowerCase() === "bearer" &&
    authorizationHeaderParts?.[1];

  return bearerToken;
};

const validateToken = async (token: string) => {
  if (!token) {
    return false;
  }

  // Check the token against the authn service
  try {
    const response = await authn.client.clientToken.check(token);
    const authStatus = response.status === "Success";
    return authStatus;
  } catch (error) {
    if (error instanceof PangeaErrors.APIError) {
      console.error("Something went wrong with your Pangea Configuration");
      console.error(error.toString());
    } else {
      console.error(
        "Error occurred during token validation. Looks like environment variables haven't been set correctly, or the service token has expired",
        error,
      );
    }
  }

  return false;
};

// Fetch user Info
export const getUserInfo = async (req: NextRequest) => {
  const token = getBearerToken(req);
  const result = { userEmail: "", userProfile: "" };

  if (!token) {
    return result;
  }

  // Check the token against the authn service
  try {
    const response = await authn.client.clientToken.check(token);
    const authStatus = response.status === "Success";

    const userEmail = authStatus ? response.result.email : "";
    const userProfile = authStatus ? response.result.profile : "";

    return { userEmail, userProfile };
  } catch (error) {
    if (error instanceof PangeaErrors.APIError) {
      console.error("Something went wrong with your Pangea Configuration");
      console.error(error.toString());
    } else {
      console.error(
        "Error occurred during token validation. Looks like environment variables haven't been set correctly, or the service token has expired",
        error,
      );
    }
  }

  return result;
};

// Middleware to check the authentication
// ONLY USE THIS ON SERVER SIDE
export const withAPIAuthentication = <T>(
  apiHandler: (req: NextRequest, res: NextResponse) => Promise<T>,
) => {
  return async (req: NextRequest, res: NextResponse) => {
    // Check the environment variables
    if (!process.env.PANGEA_DOMAIN || !process.env.PANGEA_TOKEN) {
      console.error(
        "Missing environment variables, please make sure you have PANGEA_DOMAIN and PANGEA_TOKEN set in your .env file",
      );
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isTokenValid = await validateToken(getBearerToken(req));

    // Authentication failed, return 401
    if (!isTokenValid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // We are good to continue
    return await apiHandler(req, res);
  };
};
