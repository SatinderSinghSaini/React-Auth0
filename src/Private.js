import React, { useEffect, useState } from "react";

export default function Private(props) {
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch("/private", {
      headers: { Authorization: `Bearer ${props.auth.getAccessToken()}` },
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
