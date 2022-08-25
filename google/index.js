const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const url = `https://www.googleapis.com/geolocation/v1/geolocate?key=${
  process.env.GOOGLE_API_KEY
}`;

const fetchLocation = async () => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
      },
      body: JSON.stringify({}),
    });

    return response.json();
  } catch (err) {
    console.log(err);
  }
};

fetchLocation().then(data => {
  console.log(data);
});

router.get("/", (req, res) => {
  res.json({ success: "Hello google!" });
});

router.get("/location", async (req, res) => {
  const data = await fetchLocation();
  res.json(data);
});

module.exports = router;
