import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Nav from "./Nav";
import Profile from "./Profile";

function App() {
  return (
    <>
      <Nav />
      <div className="body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
