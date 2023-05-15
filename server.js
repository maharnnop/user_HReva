const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");
const bodyParser = require("body-parser").json(); // for api req.body as json
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

require('dotenv').config()
const mysql = require('mysql2')
// const connection = mysql.createConnection(process.env.DATABASE_URL)
// console.log('Connected to PlanetScale!')
// connection.end()

app.use(cors());
app.use(bodyParser);

app.use(cookieParser());

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

const verifyToken = (req, res, next) => {
  // let token = req.cookies.jwt
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
  }
  jwt.verify(req.token, "test_jwt", (err, decodedUser) => {
    if (err || !decodedUser)
      return res.status(401).json({ error: "Unauthorized Request" });
    req.user = decodedUser;
    next();
  });
};
app.use("/auth", routes.auth);

app.use("/users", verifyToken, routes.users);

app.listen(3002, () => {
  console.log(`Listening on port ${3002}`);
});
