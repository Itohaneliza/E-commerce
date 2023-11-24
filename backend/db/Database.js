// console.log("Process Environment:", process.env);
require("dotenv").config();

const mongoose = require("mongoose");

const connectDatabase = () => {
  console.log("DB_URL:", process.env.DB_URL);
  mongoose
    .connect(
      "mongodb+srv://juliuseli2004:juliuseli2004@cluster0.uaynhfl.mongodb.net/cluster0?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then((data) => {
      console.log(`mongodb connected with server: ${data.connection.host}`);
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
      // Handle the error or exit the process if necessary
      process.exit(1);
    });
};

module.exports = connectDatabase;
