import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Callback(props) {
  const { hash } = useLocation();
  useEffect(() => {
    console.log(hash);
    if (/access_token|id_token|error/.test(hash)) {
      props.auth.handleAuthentication();
    } else {
      throw new Error("Invalid Callback URL.");
    }
  }, []);

  return <div>Callback</div>;
}
