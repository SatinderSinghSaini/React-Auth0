import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "./AuthContext";

export default function Callback(props) {
  const auth = useContext(AuthContext);
  const { hash } = useLocation();
  useEffect(() => {
    if (/access_token|id_token|error/.test(hash)) {
      auth.handleAuthentication();
    } else {
      throw new Error("Invalid Callback URL.");
    }
  }, []);

  return <div>Callback</div>;
}
