### Application Overview

This app is created using create-react-app
Run this command to install dependencies: npm install auth0-js auth0-lock express express-jwt express-jwt-authz jwks-rsa npm-run-all react-router-dom

# Configure Auth0

We signedup for Auth0 (https://manage.auth0.com/)
key decisions:

1.  OAuth-flow: implicit
2.  Login/Signup: Universal

Created Auth0 app named "React-Auth0" in Auth0 offical website and configured .env variables

# API Authorization

1.  Under api section of auth0 application, created new API project"Demo App API on localhost"
2.  In Auth.js, passed audience propoerty for authorizing api calls with auth0
3.  Created Api via Node and Express
4.  Configured express to parse JWT
5.  Created Api endpoints: public(anyone can call) and private(login required)
    For Admin api(/admin), it is checking the role. We are embedding the role value to the user's id_token while authentication. This is done by creating rules under AuthPipeline-> Rules ->Set Role to a User.Then, server.js will access this value from it's request headers and check the user's role.

# Implemented 2 types of Authorization

1. Scope Based: Implemented '/course' api
2. Role Based: Implemented '/admin' api

# Shared auth object to child components using React Context (AuthContext)

# Implemented Silent Authentication

Steps for Silent Authentication:

1. Called renewToken method at the apps entry point to get the session details after every load.
2. In auth0 application's(React-Auth0) settings, set "Allowed Web Origins" settings with application url(http://localhost:3000)

# Commands

npm start: to run application
