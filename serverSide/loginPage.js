const express = require('express');
const crypto = require("crypto");
const connection = require('./database');
const NodeRSA = require('node-rsa');
const router = express.Router();


const key = new NodeRSA({ b: 2048 }); // 2048 bits key length

// Provide the public key to the client
router.get('/public-key', (req, res) => {
  const publicKey = key.exportKey('public');
  res.status(200).send(publicKey);
});
// This route handles the user login functionality
router.post("/login", async (req, res) => {
  console.log("in func");
  const { username, password, branch } = req.body;

  try {
    // Decrypting the password using the fetched public key
    const decryptedPassword = crypto.privateDecrypt(
      privateKey,
      Buffer.from(password, "base64")
    ).toString("utf-8");

    // SQL query to check user credentials in the database
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
  } catch (error) {
    console.error("Error occurred during login:", error);
    return res.status(500).json({ message: "Login error" });
  }
});

module.exports = router;
