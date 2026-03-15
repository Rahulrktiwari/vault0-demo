import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

function AdminConsole() {
  const { user } = useAuth0();
  console.log(user);

  const roles = user?.["https://vault0.com/roles"] || [];

  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔹 Fetch users
  const fetchUsers = async () => {
    try {
      const res = await fetch("https://vault0-backend.onrender.com/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  const promoteUser = async (id) => {
  try {
    await fetch(`https://vault0-backend.onrender.com/promote/${id}`, {
      method: "POST",
    });

    alert("User promoted to Admin");
  } catch (err) {
    console.error("Error promoting user:", err);
  }
};

  // 🔹 Delete user
  const deleteUser = async (id) => {
    try {
      await fetch(`https://vault0-backend.onrender.com/users/${id}`, {
        method: "DELETE",
      });
      fetchUsers(); // refresh list
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  // 🔹 Create user
  const createUser = async () => {
    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    try {
      await fetch("https://vault0-backend.onrender.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          connection: "Username-Password-Authentication",
        }),
      });

      setEmail("");
      setPassword("");
      fetchUsers();
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  // 🔒 RBAC check
  if (!roles.includes("Admin")) {
    return <h2>Access Denied. Admins only.</h2>;
  }

  return (
  <div className="container">
    <h2>Admin Console</h2>

    {/* 🔹 Create User */}
    <div className="card">
      <h3>Create User</h3>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={createUser}>Create User</button>
      </div>
    </div>

    {/* 🔹 User List */}
    <div className="card">
      <h3>All Users</h3>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        users.map((u) => (
          <div className="user-item" key={u.user_id}>
            <div>
              <p style={{ margin: 0, fontWeight: "500" }}>
                {u.email || "No Email"}
              </p>
              <small style={{ color: "#94a3b8" }}>
                {u.user_id}
              </small>
            </div>
<div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => deleteUser(u.user_id)}>
              Delete
            </button>
            <button onClick={() => promoteUser(u.user_id)}>
  Promote to Admin
</button>
</div>
          </div>
        ))
      )}
    </div>
  </div>
);}

export default AdminConsole;