import { useAuth0 } from "@auth0/auth0-react";

function LandingPage() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <div style={styles.container}>
      {/* 🔹 HERO SECTION */}
      <div style={styles.hero}>
        <h1 style={styles.title}>Vault0</h1>
        <p style={styles.subtitle}>
          Secure Financial Platform powered by Auth0
        </p>

        {!isAuthenticated && (
          <button style={styles.cta} onClick={() => loginWithRedirect()}>
            Get Started
          </button>
        )}
      </div>

      {/* 🔹 FEATURES */}
      <div style={styles.features}>
        <div style={styles.card}>
          <h3>🔐 Secure Authentication</h3>
          <p>
            Multi-factor authentication and social login powered by Auth0.
          </p>
        </div>

        <div style={styles.card}>
          <h3>⚡ Seamless Experience</h3>
          <p>
            Adaptive MFA ensures minimal friction for trusted users.
          </p>
        </div>

        <div style={styles.card}>
          <h3>🛡️ Fraud Protection</h3>
          <p>
            Protection against credential stuffing and suspicious login attempts.
          </p>
        </div>

        <div style={styles.card}>
          <h3>👨‍💼 Admin Controls</h3>
          <p>
            Manage users, roles, and permissions securely from one place.
          </p>
        </div>
      </div>

      {/* 🔹 FOOTER */}
      <div style={styles.footer}>
        <p>© 2026 Vault0 • Secure Identity Platform</p>
      </div>
    </div>
  );
}

export default LandingPage;




const styles = {
  container: {
    backgroundColor: "#0f172a",
    minHeight: "100vh",
    color: "white",
    padding: "40px",
    fontFamily: "sans-serif",
  },

  hero: {
    textAlign: "center",
    marginTop: "60px",
  },

  title: {
    fontSize: "48px",
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: "18px",
    marginTop: "10px",
    color: "#94a3b8",
  },

  cta: {
    marginTop: "20px",
    padding: "12px 24px",
    backgroundColor: "#3b82f6",
    border: "none",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
  },

  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginTop: "60px",
  },

  card: {
    backgroundColor: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
  },

  footer: {
    textAlign: "center",
    marginTop: "60px",
    color: "#64748b",
  },
};