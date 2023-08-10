const express = require('express'); //It's used to create web servers and define routes.
const mysql2 = require('mysql2'); //It allows you to interact with a MySQL database.
const CryptoJS = require("crypto-js"); //provides various cryptographic functions for encryption and decryption.
const connection = require('./database');  //The exact content of the database.js file would define how the connection is established.
const router = express.Router(); //Creates an instance of an Express router.

// This route handles the user login functionality
router.post("/api/login", (req, res) => { 
  console.log("in func");
  const { username, password, branch } = req.body;

  // Decrypting the password using CryptoJS
  const bytes = CryptoJS.AES.decrypt(password, "my-secret-key");
  const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

  // SQL query to check user credentials in the database
  //if something returned it means password is right!!!
  const query =
      "SELECT name, password FROM user_accounts WHERE account_number = ? AND password = ? AND branch = ? LIMIT 1";

      // Executing the SQL query using the database connection
      connection.query(query, [username, decryptedPassword, branch], (err, results) => {

      if (err) {
        // If there's an error with the query execution
        console.error("Error executing query:", err);
        return res.status(500).json({ message: "Database error" });
      }

      if (results.length === 0) {
        // If no matching user found in the database
        console.log("no answer");
        // No matching user found, login failed
        return res.status(401).json({ message: "Invalid credentials" });
      } else { 
        // If the user's credentials are valid
        console.log("good ans");
        // Login successful
        return res.status(200).json({ message: "Login successful" });
      }
    });
  });

  module.exports = router;