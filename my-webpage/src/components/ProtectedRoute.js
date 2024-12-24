import React from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = React.useState(true); // Track if authentication is being checked

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsCheckingAuth(false); // Authentication check complete
    });

    return () => unsubscribe(); // Cleanup the listener
  }, []);

  if (isCheckingAuth) {
    // Show loading while checking authentication
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect unauthenticated users to login page
    return <Navigate to="/login" replace />;
  }

  return children; // Render the children if authenticated
};

export default ProtectedRoute;
