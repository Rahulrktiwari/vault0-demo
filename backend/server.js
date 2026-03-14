const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const AUTH0_DOMAIN = "dev-f5yhsqg75hl2smt8.us.auth0.com";
const CLIENT_ID = "UOumc7M70kQlv3DzKad2PIuha1XF6P5K";
const CLIENT_SECRET = "rBbaNtExHO7m1HcYeAouRivAgCSA04qrYjLIP7LEBjc_dy9l5z9njdAZlMw1MdVE";
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

app.listen(5000, () => console.log("Backend running on port 5000"));