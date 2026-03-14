import { useAuth0 } from "@auth0/auth0-react";

function Dashboard() {
  const { user } = useAuth0();

  return (
    <div className="container">
      <div className="card">
        <h2>Welcome, {user?.name}</h2>
        <p>Email: {user?.email}</p>
      </div>
    </div>
  );
}

export default Dashboard;