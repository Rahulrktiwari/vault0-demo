
import { Auth0Provider } from "@auth0/auth0-react";

export const AuthProvider = ({ children }) => {

  const domain = "dev-f5yhsqg75hl2smt8.us.auth0.com";
  const clientId = "aCB2c0x7LL3kVhV7d04FBbW5Dr0NVxKe";

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
