const express = require('express');
const connection = require('./database'); // Import your database connection module
require('dotenv').config();
const router = express.Router();
const jwt=require("jsonwebtoken")
const JSEncrypt = require("node-jsencrypt");

// Initialize JSEncrypt instance with a default key size of 2048 bits
const jsEncrypt = new JSEncrypt({ default_key_size: 2048 });

// Route to get the public key
router.get("/public-key", (req, res) => {
  const publicKey = jsEncrypt.getPublicKey();
  res.send(publicKey);
});

// Route to handle login
router.post("/login", (req, res) => {
  const { account_number, password, branch } = req.body;

  // Decrypt the password received from the frontend
  const decryptedPassword = jsEncrypt.decrypt(password);
  
  // SQL query to check user credentials
  const query =
    "SELECT name, password FROM user_accounts WHERE account_number = ? AND password = ? AND branch = ? LIMIT 1";

  // Execute the SQL query using the database connection
  connection.query(query, [account_number, decryptedPassword, branch], (err, results) => {
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
      let userInfo={
        account_number:account_number, 
        branch:branch}
      const accessToken=jwt.sign(userInfo,'df1ea1eb859f1f669b7a92453f30887a9ae59491d054d51116ae05e197b73066fbe4b57af4e603394b833e4528a351f814a93f68471a16629d15dfffeb6f860e');
      // Login successful
      return res.status(200).json({ message: "Login successful", accessToken:accessToken});
    }
  });
});

module.exports = router;
