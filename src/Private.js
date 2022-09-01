import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";

export default function Private() {
    const auth = useContext(AuthContext);
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch("/private", {
      headers: { Authorization: `Bearer ${auth.getAccessToken()}` },
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Netwok response is not Ok.");
      })
      .then((res) => {
        setMessage(res.message);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div>Private</div>
      <p>{message}</p>
    </>
  );
}
