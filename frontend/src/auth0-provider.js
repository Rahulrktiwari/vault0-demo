
import { Auth0Provider } from "@auth0/auth0-react";

export const AuthProvider = ({ children }) => {

  const domain = "dev-eketxqf17u8eym7u.us.auth0.com";
  const clientId = "H80SZQhL5vi51BqLE7ulJMBHkFRjKlEF";

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      {children}
    </Auth0Provider>
  );
};
