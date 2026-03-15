const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const AUTH0_DOMAIN = "dev-eketxqf17u8eym7u.us.auth0.com";
const CLIENT_ID = "KfvbPvG99kE0WfANrFF9kasWl7YUOZez";
const CLIENT_SECRET = "r-yBwyzkm-MSTiuhNHBMx53cNUMiEblhtC9f-rlBpeFOCj5JB26RKSRuUVjsE5jY";
const AUDIENCE = `https://${AUTH0_DOMAIN}/api/v2/`;

// 🔐 Get Management API token
async function getManagementToken() {
  const res = await axios.post(`https://${AUTH0_DOMAIN}/oauth/token`, {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    audience: AUDIENCE,
    grant_type: "client_credentials"
  });
  return res.data.access_token;
}

// 🔹 GET USERS
app.get("/users", async (req, res) => {
  try {
    const token = await getManagementToken();

    const users = await axios.get(
      `https://${AUTH0_DOMAIN}/api/v2/users`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    res.json(users.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send("Error fetching users");
  }
});

// 🔹 CREATE USER
app.post("/users", async (req, res) => {
  try {
    const token = await getManagementToken();

    const newUser = await axios.post(
      `https://${AUTH0_DOMAIN}/api/v2/users`,
      req.body,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    res.json(newUser.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send("Error creating user");
  }
});

// 🔹 DELETE USER
app.delete("/users/:id", async (req, res) => {
  try {
    const token = await getManagementToken();

    await axios.delete(
      `https://${AUTH0_DOMAIN}/api/v2/users/${req.params.id}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    res.send("User deleted");
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send("Error deleting user");
  }
});


// 🔹 PROMOTE USER TO ADMIN
app.post("/promote/:id", async (req, res) => {
  try {
    const token = await getManagementToken();

    const ADMIN_ROLE_ID = "rol_VCvkcOhA3qZmbK88"; // paste here

    await axios.post(
      `https://${AUTH0_DOMAIN}/api/v2/users/${req.params.id}/roles`,
      {
        roles: [ADMIN_ROLE_ID],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.send("User promoted to Admin");
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send("Error promoting user");
  }
});

app.listen(5000, () => console.log("Backend running on port 5000"));