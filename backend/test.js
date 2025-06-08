const axios = require("axios");
const qs = require("qs");

const TENANT_ID = "bf89b15f-7f7c-44c4-93e2-409e96a1f14a";
const CLIENT_ID = "38b04926-04ba-45b0-8271-e8599db37e67";
const CLIENT_SECRET = "EDI8Q~FSnMw2VAOBAPv.fZ.rpK4ZdgUr1CcYvcA5";
const RESOURCE = "https://org6f1a3d6d.crm8.dynamics.com";

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

async function fetchData() {
  try {
    const token = await getAccessToken();
    const response = await axios.get(`${RESOURCE}/api/data/v9.2/cr4ab_table1s?$select=cr4ab_name`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    console.log(response.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
}

fetchData();
