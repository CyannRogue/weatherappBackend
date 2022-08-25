const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const fetchWeather = async searchtext => {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${searchtext}&days=7&aqi=no&alerts=no`;
  try {
    const weatherStream = await fetch(url);
    const weatherJson = await weatherStream.json();
    return weatherJson;
  } catch (err) {
    return { Error: err.stack };
  }
};

router.get("/", (req, res) => {
  res.json({ success: "Hello Weather!" });
});

router.get("/:searchtext", async (req, res) => {
  const searchtext = req.params.searchtext;
  const data = await fetchWeather(searchtext);
  res.json(data);
});

router.post("/", async (req, res) => {
  const searchtext = req.body.searchtext;
  const data = await fetchWeather(searchtext);
  res.json(data);
});

module.exports = router;
