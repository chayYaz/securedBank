const express = require('express');
const mysql2 = require('mysql2');
const CryptoJS = require("crypto-js");
const connection = require('../database'); 
const router = express.Router();
router.post("/loginAdmin", (req, res) => { 
  console.log("in func");

  const { id, password, branch } = req.body;
  
  const bytes = CryptoJS.AES.decrypt(password, "my-secret-key");
  const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
  console.log( id );
  console.log(decryptedPassword);
  console.log(branch);
  //if something returned it means password is right!!!
  const query =
      "SELECT name, password FROM branch_administrators WHERE id = ? AND password = ? AND branch = ? LIMIT 1";
    connection.query(query, [id, decryptedPassword, branch], (err, results) => {
      console.log(results);
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ message: "Database error" });
      }

      if (results.length === 0) {
        console.log("no answer");
        // No matching user found, login failed
        return res.status(401).json({ message: "Invalid credentials" });
      } else {
        console.log("good ans");
        // Login successful
        return res.status(200).json({ message: "Login successful" });
      }
    });
  });

  module.exports = router;