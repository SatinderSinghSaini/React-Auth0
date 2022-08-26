import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Auth from "./auth/Auth";
import Callback from "./Callback";
import Home from "./Home";
import Nav from "./Nav";
import Private from "./Private";
import Profile from "./Profile";
import Public from "./Public";

function App(props) {
  const navigate = useNavigate();
  const [auth] = useState(new Auth(navigate));
  return (
    <>
      <Nav auth={auth} />
      <div className="body">
        <Routes>
          <Route path="/" element={<Home auth={auth} />} />
          <Route
            path="/profile"
            element={
              auth.isAuthenticated() ? <Profile auth={auth} /> : navigate("/")
            }
          />
          <Route path="/callback" element={<Callback auth={auth} />} />
          <Route path="/public" element={<Public />} />
          <Route
            path="/private"
            element={
              auth.isAuthenticated() ? <Private auth={auth} /> : navigate("/")
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
