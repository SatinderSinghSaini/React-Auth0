import React, { useState, useEffect, useContext } from "react";
import AuthContext from "./AuthContext";

export default function Profile(props) {
  const auth = useContext(AuthContext);
  const { getUserInfo } = auth;
  const [user, setUser] = useState({
    profile: null,
    error: "",
  });
  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = () => {
    getUserInfo((profile, err) => {
      setUser({
        profile: profile,
        error: err,
      });
    });
  };

  return (
    <>
      {user.profile === null ? null : (
        <>
          <div>Profile</div>
          <p>{user.profile.nickname}</p>
          <img
            alt="Profile"
            style={{ width: 50, height: 50 }}
            src={user.profile.picture}
          />
          <br />
          {JSON.stringify(user.profile)}
        </>
      )}
    </>
  );
}
