import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import AdminConsole from "./pages/AdminConsole";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    user,
  } = useAuth0();

  // 🔹 Extract roles safely
  const roles = user?.["https://vault0.com/roles"] || [];

  return (
    <BrowserRouter>
      {/* 🔹 NAVBAR */}
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>Home</Link>

        {/* 🔹 NOT LOGGED IN */}
        {!isAuthenticated && (
          <button
            onClick={() => loginWithRedirect()}
            style={styles.button}
          >
            Login
          </button>
        )}

        {/* 🔹 LOGGED IN */}
        {isAuthenticated && (
          <>
            <Link to="/dashboard" style={styles.link}>
              Dashboard
            </Link>

            {/* 🔹 Show Admin ONLY if role exists */}
            {roles.includes("Admin") && (
              <Link to="/admin" style={styles.link}>
                Admin
              </Link>
            )}

            <button
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
              style={styles.button}
            >
              Logout
            </button>
          </>
        )}
      </nav>

      {/* 🔹 ROUTES */}
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminConsole />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



const styles = {
  nav: {
    display: "flex",
    gap: "20px",
    padding: "15px 30px",
    backgroundColor: "#0f172a",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
  },
  button: {
    marginLeft: "auto",
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
};