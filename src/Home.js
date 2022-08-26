import React from "react";
import { Link } from "react-router-dom";

export default function Home(props) {
  const { isAuthenticated, login } = props.auth;
  return (
    <>
      <div>Home</div>
      {isAuthenticated() ? (
        <Link to="/profile">View Profile</Link>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </>
  );
}
