import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import VideoPage from "./pages/VideoPage";
import HomePage from "./pages/HomePage";
import "./App.css";
import ServerPage from "./pages/ServerPage";

function App() {
  return (
    <Router>
      <nav className="navbar bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand text-white navbar-link" href="/">
            <img
              src={reactLogo}
              className="logo d-inline-block align-text-right"
              alt="Video Platform"
            />
            <span className="navbar-title">Video Platform</span>
          </a>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:server" element={<ServerPage />} />
        <Route path="/:server/video/:id" element={<VideoPage />} />
        <Route path="*" element={<p>Error 404: Not Found</p>} />
      </Routes>
    </Router>
  );
}

export default App;
