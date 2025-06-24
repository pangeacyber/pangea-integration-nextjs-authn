import { useAuth } from "@pangeacyber/react-auth";
import { useEffect } from "react";

const pageWithAuthentication = (Component) => {
  const AuthenticatedComponent = () => {
    const { authenticated, login } = useAuth();

    useEffect(() => {
      if (!authenticated) {
        login();
      }
    }, [authenticated, login]);

    return !!authenticated ? <Component /> : null;
  };

  return AuthenticatedComponent;
};

export default pageWithAuthentication;
