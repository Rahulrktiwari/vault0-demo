
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import AdminConsole from "./pages/AdminConsole";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <BrowserRouter>
 <nav className="navbar">
  <div className="nav-left">
    <span className="logo">Vault0</span>
    <Link to="/">Home</Link>
    <Link to="/dashboard">Dashboard</Link>
    <Link to="/admin">Admin</Link>
  </div>

  <div className="nav-right">
    {!isAuthenticated ? (
      <button onClick={() => loginWithRedirect()}>
        Login
      </button>
    ) : (
      <button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Logout
      </button>
    )}
  </div>
</nav>

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
