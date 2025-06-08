const express = require("express");
const axios = require("axios");
const qs = require("qs");
const cors = require("cors"); // ✅ Add CORS middleware

const app = express();
app.use(cors()); // ✅ Enable CORS for all origins

// Dynamics/Power Platform Config
const TENANT_ID = "bf89b15f-7f7c-44c4-93e2-409e96a1f14a";
const CLIENT_ID = "38b04926-04ba-45b0-8271-e8599db37e67";
const CLIENT_SECRET = "EDI8Q~FSnMw2VAOBAPv.fZ.rpK4ZdgUr1CcYvcA5";
const RESOURCE = "https://org6f1a3d6d.crm8.dynamics.com";

// Function to get access token
async function getAccessToken() {
  const tokenUrl = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`;
  const data = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: "client_credentials",
    scope: `${RESOURCE}/.default`,
  };

  const response = await axios.post(tokenUrl, qs.stringify(data), {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return response.data.access_token;
}

// API route to fetch menu items
app.get("/api/menu", async (req, res) => {
  try {
    const token = await getAccessToken();
    const response = await axios.get(
      `${RESOURCE}/api/data/v9.2/cr4ab_table1s?$select=cr4ab_name,cr4ab_price,cr4ab_category,cr4ab_imageurl,cr4ab_table1id`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    const menuItems = response.data.value.map((item) => ({
      id: item.cr4ab_table1id,
      name: item.cr4ab_name,
      price: item.cr4ab_price,
      category: item.cr4ab_category,
      image: item.cr4ab_imageurl || "https://via.placeholder.com/150",
    }));

    res.json(menuItems);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch menu items." });
  }
});

// Start server
app.listen(5000, () => {
  console.log("✅ Backend running on http://localhost:5000");
});
