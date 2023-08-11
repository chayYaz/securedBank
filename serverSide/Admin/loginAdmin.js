const express = require('express'); //It's used to create web servers and define routes.

const connection = require('../database'); //The exact content of the database.js file would define how the connection is established.
const router = express.Router(); //Creates an instance of an Express router.
const JSEncrypt = require("node-jsencrypt");
const jsEncrypt = new JSEncrypt({ default_key_size: 2048 });
 // can be get because its known by everyone.
 router.get("/loginAdmin/public-key", (req, res) => {
  const publicKey = jsEncrypt.getPublicKey();
  res.send(publicKey);
});
 router.post("/loginAdmin", (req, res) => { 

  const { id, password, branch } = req.body;
  
  // Decrypt the password using AES
  const decryptedPassword = jsEncrypt.decrypt(password);
  console.log( id );
  console.log(decryptedPassword);
  console.log(branch);

  //if something returned it means password is right!!!
  // Construct and execute the SQL query
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