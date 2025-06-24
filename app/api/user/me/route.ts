import { withAPIAuthentication } from "../../../../utils/pangeaAuthCheck";

export const GET = withAPIAuthentication(async () => Response.json({
  name: "John Doe",
  address: { state: "CA", zip: "92401" },
}));
