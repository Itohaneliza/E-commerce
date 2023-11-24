const express = require("express");
const path = require("path");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./model/user");

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true }));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

app.post("/api/v2/user/create-user", (req, res) => {
  // Extract necessary fields from the request body
  const { name, email, password, avatar } = req.body;

  // Log the extracted fields
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Password:", password);
  console.log("Avatar:", avatar);

  // Your logic to handle creating a user goes here
  console.log("Request Body:", req.body);

  res.status(200).json({ message: "User created successfully" });
});

// import routes
const user = require("./controller/user");
app.use("/api/v2", user);

// it's for ErrorHandling
app.use(ErrorHandler);

module.exports = app;
