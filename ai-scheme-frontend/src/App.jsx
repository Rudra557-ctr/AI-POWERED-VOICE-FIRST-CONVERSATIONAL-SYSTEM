import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Schemes from "./pages/Schemes";

function App() {
  return (
    <>
      {/* NAVBAR */}
      <nav
        style={{
          padding: "15px 40px",
          background: "rgba(23, 31, 37, 1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Link to="/" style={{ color: "white", marginRight: "20px" }}>
            Home
          </Link>
          <Link to="/about" style={{ color: "white", marginRight: "20px" }}>
            About
          </Link>
          <Link to="/schemes" style={{ color: "white" }}>
            Schemes
          </Link>
        </div>

        <div style={{ color: "white", fontWeight: "600" }}>
          Hacktivists
        </div>
      </nav>

      {/* ROUTES (THIS WAS MISSING) */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/schemes" element={<Schemes />} />
      </Routes>
    </>
  );
}

export default App;
