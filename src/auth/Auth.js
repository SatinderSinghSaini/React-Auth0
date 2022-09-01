import auth0 from "auth0-js";

const REDIRECT_TO_LOGIN = "redirect_to_login";

//Storing tokens in memory
let _idToken;
let _accessToken;
let _scopes;
let _expiresAt;

export default class Auth {
  constructor(navigate) {
    this.navigate = navigate;
    this.userProfile = null;
    this.requestedScopes = "openid profile email read:courses";
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      responseType: "token id_token",
      scope: this.requestedScopes,
    });
  }

  login = () => {
    localStorage.setItem(REDIRECT_TO_LOGIN, window.location.pathname);
    this.auth0.authorize();
  };
  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);

        const redirectTo = localStorage.getItem(REDIRECT_TO_LOGIN) || "/";
        this.navigate(redirectTo);
        localStorage.removeItem(REDIRECT_TO_LOGIN);
      } else if (err) {
        this.navigate("/");
        alert(`Error ${err.error}. Check the console for further details`);
        console.log(err);
      }
    });
  };

  setSession = (authResult) => {
    //set the time that the access token will expire
    _expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    _scopes = authResult.scopes || this.requestedScopes || "";
    _accessToken = authResult.accessToken;
    _idToken = authResult.idToken;
  };

  isAuthenticated = () => {
    return new Date().getTime() < _expiresAt;
  };

  logout = () => {
    //This will logout from auth0
    this.auth0.logout({
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      redirectTo: "http://localhost:3000", //Add this url in the 'Allowed Logout URLs' settings of Auth0 application
    });
  };

  getAccessToken = () => {
    if (!_accessToken) {
      throw Error("No Access Token");
    }
    return _accessToken;
  };

  getUserInfo = (cb) => {
    if (this.userProfile) return cb(this.userProfile);
    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
      if (profile) this.userProfile = profile;
      cb(this.userProfile, err);
    });
  };

  userHasScopes(scopes) {
    return scopes.every((scope) => _scopes.includes(scope));
  }

  renewToken(cb) {
    this.auth0.checkSession({}, (err, result) => {
      if (err) {
        console.log(`Error: ${err.error} - ${err.error_description}.`);
      } else {
        this.setSession(result);
      }
      if (cb) cb(err, result);
    });
  }
}
