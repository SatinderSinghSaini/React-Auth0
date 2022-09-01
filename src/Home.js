import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./AuthContext";

export default function Home() {
  const auth = useContext(AuthContext);
  const { isAuthenticated, login } = auth;
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
