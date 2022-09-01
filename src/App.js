import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Auth from "./auth/Auth";
import Callback from "./Callback";
import Courses from "./Courses";
import Home from "./Home";
import Nav from "./Nav";
import Private from "./Private";
import Profile from "./Profile";
import Public from "./Public";
import AuthContext from "./AuthContext";

function App() {
  const navigate = useNavigate();
  const [auth] = useState(new Auth(navigate));
  const [isTokenRenewed, setTokenRenewed] = useState(false);

  useEffect(() => {
    auth.renewToken(() => {
      setTokenRenewed(true);
    });
  }, []);
  return (
    <>
      <AuthContext.Provider value={auth}>
        <Nav />
        {!isTokenRenewed ? (
          <h1>Loading...</h1>
        ) : (
          <div className="body">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/profile"
                element={
                  auth.isAuthenticated() ? <Profile /> : <Navigate to="/" />
                }
              />
              <Route path="/callback" element={<Callback />} />
              <Route path="/public" element={<Public />} />
              <Route
                path="/private"
                element={
                  auth.isAuthenticated() ? <Private /> : <Navigate to="/" />
                }
              />
              <Route
                path="/courses"
                element={
                  auth.isAuthenticated() &&
                  auth.userHasScopes(["read:courses"]) ? (
                    <Courses />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
            </Routes>
          </div>
        )}
      </AuthContext.Provider>
    </>
  );
}

export default App;
