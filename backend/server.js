require("dotenv").config();
// const app = require("./app");

const express = require("express");
const bodyParser = require("body-parser");
const connectDatabase = require("./db/Database");
const User = require("./model/user");
const PORT = process.env.PORT || 8000;
const app = express();

const postUsers = require('./route.js/userRoute');

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect db
connectDatabase();

app.use("/user", postUsers);

// Endpoint to handle POST requests to /user/create-user
// app.post("/api/v2/user/create-user", (req, res) => {
//   const { name, email, password, file } = req.body;

//   // Validate the incoming data
//   if (!name || !email || !password) {
//     return res
//       .status(400)
//       .json({ error: "Name, email, and password are required" });
//   }

//   // Create a new user instance
//   const newUser = new User({
//     name,
//     email,
//     password,
//     avatar: file,
//   });

//   // Save the user to the database
//   newUser
//     .save()
//     .then((savedUser) => {
//       console.log("User saved to database:", savedUser);

//       // Log the created user
//       console.log("User created:", savedUser);

//       // Send a response back to the client
//       res
//         .status(201)
//         .json({ message: "User created successfully", user: savedUser });
//     })
//     .catch((error) => {
//       console.error("Error saving user to database:", error);

//       // Send an error response back to the client
//       res.status(500).json({ error: "Internal server error" });
//     });
// });

//  Handling uncaught Exception
// process.on("uncaughtException", (err) => {
//   console.log(`Error: ${err.message}`);
//   console.log(`shutting down the server for handling uncaught exception`);
// });

// config
// if (process.env.NODE_ENV !== "PRODUCTION") {
//   require("dotenv").config({
//     path: "config/.env",
//   });
// }

// create server
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// unhandled promise rejection
// process.on("unhandledRejection", (err) => {
//   console.log(`Shutting down the server for ${err.message}`);
//   console.log(`shutting down the server for unhandle promise rejection`);

//   server.close(() => {
//     process.exit(1);
//   });
// });
