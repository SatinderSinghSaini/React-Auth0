import auth0 from "auth0-js";

export default class Auth {
  constructor(navigate) {
    this.navigate = navigate;
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
      responseType: "token id_token",
      scope: "openid profile email",
    });
  }

  login = () => {
    this.auth0.authorize();
  };
  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.navigate("/");
      } else if (err) {
        this.navigate("/");
        alert(`Error ${err.error}. Check the console for further details`);
        console.log(err);
      }
    });
  };

  setSession = (authResult) => {
    //set the time that the access token will expire
    const expireAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("identity_token", authResult.idToken);
    localStorage.setItem("expires_at", expireAt);
  };

  isAuthenticated = () => {
    const expiresAt = localStorage.getItem("expires_at");
    return new Date().getTime() < expiresAt;
  };

  logout = () => {
    //This removes data from local
    localStorage.removeItem("access_token");
    localStorage.removeItem("identity_token");
    localStorage.removeItem("expires_at");
    //This will logout from auth0
    this.auth0.logout({
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      redirectTo: "http://localhost:3000", //Add this url in the 'Allowed Logout URLs' settings of Auth0 application
    });
  };
}
