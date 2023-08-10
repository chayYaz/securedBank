

const express = require('express');  //It's used to create web servers and define routes.
const mysql2 = require('mysql2'); //It allows you to interact with a MySQL database.
const connection = require('../database');  //The exact content of the database.js file would define how the connection is established.
const router = express.Router(); //Creates an instance of an Express router.


// Route to get all operations related to a specific user's account
router.get("/users/:userNum/:branch/allOperations", (req, res) => {
  console.log("in users/id");

  const { userNum, branch } = req.params;
  const query = "select * from operations where (sender_account_number=? and sender_branch=?) or(receiver_account_number=? and receiver_branch=?)";
  let ansForQuery;
  // Execute the query to fetch operations
  connection.query(query, [userNum, branch,userNum, branch], (err, results) => {
    if (err) throw err;
    ansForQuery = results;
    console.log(ansForQuery);
    res.send(ansForQuery);
  });
});

// Route to get user's name and money for a specific account and branch
router.get("/users/:userNum/:branch/userNameAndMoney", (req, res) => {
  console.log("in userNameAndMoney");
  const { userNum, branch } = req.params;
  const query = "SELECT name ,money  FROM user_accounts WHERE account_number = ? AND branch = ? LIMIT 1";
  let ansForQuery;
   // Execute the query to fetch user's name and money
  connection.query(query, [userNum, branch,userNum, branch], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ message: "Database error in userNameAndMoney query " });
    }
    ansForQuery = results;
    console.log(ansForQuery);
    res.send(ansForQuery);
  });
});

// Route to get sender's operations with pagination
router.get("/users/:userNum/:branch/senderOperations", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const itemsPerPage = 4; // Number of items per page
console.log(itemsPerPage);
console.log("in get sender");
  // Calculate the offset for pagination
  const offset = (page - 1) * itemsPerPage;

  const { userNum, branch } = req.params;
  const query = "select * from operations where (sender_account_number=? and sender_branch=?) LIMIT ? OFFSET ?";
  let ansForQuery;
  // Execute the query to fetch sender's operations with pagination
  connection.query(query, [userNum, branch,itemsPerPage, offset], (err, results) => {
    if (err) throw err;
    ansForQuery = results;
    console.log(ansForQuery);
    res.send(ansForQuery);
  });
});
module.exports = router; // Export the router with defined routes