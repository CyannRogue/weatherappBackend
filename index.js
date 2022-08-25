require("dotenv").config();
const express = require("express");
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

const weather = require("./weather");
const google = require("./google");

app.use(express.json());

// Use if you're behind a reverse proxy
// https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const whitelist = [
  "http://127.0.0.1",
  "http://127.0.0.1:5500",
  "http://127.0.0.1:5173/",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(cors(corsOptions));
// don't need this part
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

const limiter = rateLimit({
  windowMs: 1000,
  max: 1,
});
app.use(limiter);

//test route
app.get("/", (req, res) => res.json({ success: "Hello World!" }));

app.use("/weather", weather);
app.use("/google", google);

app.listen(port, () => console.log(`App listening on port ${port}`));
