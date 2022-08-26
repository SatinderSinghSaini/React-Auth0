import React, { useEffect, useState } from "react";

export default function Public() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch("/public")
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
      <div>Public</div>
      <p>{message}</p>
    </>
  );
}
