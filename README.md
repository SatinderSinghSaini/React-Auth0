### Application Overview

This app is created using create-react-app
Run this command to install dependencies: npm install auth0-js auth0-lock express express-jwt express-jwt-authz jwks-rsa npm-run-all react-router-dom

# Configure Auth0

We signedup for Auth0
key decisions:

1.  OAuth-flow: implicit
2.  Login/Signup: Universal

Created Auth0 app in Auth0 offical website and configured .env variables

# API Authorization

Under api section of auth0 page, created new API project"Demo App API on localhost"
In Auth.js, passed audience propoerty for authorizing api calls with auth0

Created Api via Node and Express
Configured express to parse JWT
Created Api endpoints: public(anyone can call) and private(login required)

# Implemented 2 types of Authorization

1. Scope Based: Implemented '/course' api
2. Role Based: Implemented '/admin' api

# Shared auth object to child components using React Context (AuthContext)

# Commands

npm start: to run application
