import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";
import "./WebpageDesign.css";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute.js";
import Chat from "./Chat";
import { auth } from "../firebaseConfig"; // Import Firebase Auth
import { onAuthStateChanged } from "firebase/auth";

const WebpageDesign = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // Update state based on user authentication
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  return (
    <Router>
      <div className="main">
        <div className="navbar">
          <div className="icon">
            <h2 className="logo">LMSFrog</h2>
          </div>

          <div className="menu">
            <ul>
              <li>
                <Link to="/">DASHBOARD</Link>
              </li>
              <li>
                <Link to="/about">COURSES</Link>
              </li>
              {isAuthenticated && (
                <>
                                 <li>
                    <Link to="/chat">CHAT</Link>
                  </li>
                </>
              )}
              <li>
                <Link to="/contact">CONTACT</Link>
              </li>
              {!isAuthenticated ? (
                <>
                  <li>
                    <Link to="/login">LOGIN</Link>
                  </li>
                  <li>
                    <Link to="/register">REGISTER</Link>
                  </li>
                </>
              ) : (
                <li>
                  <button
                    onClick={() => {
                      auth.signOut();
                      setIsAuthenticated(false);
                    }}
                    className="logout-btn"
                  >
                    LOGOUT
                  </button>
                </li>
              )}
            </ul>
          </div>

          <div className="search">
            <input className="srch" type="search" placeholder="Type To text" />
            <button className="btn">Search</button>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
        </Routes>
              </div>
    </Router>
  );
};

export default WebpageDesign;
