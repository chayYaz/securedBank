

const express = require('express');  //It's used to create web servers and define routes.
const mysql2 = require('mysql2'); //It allows you to interact with a MySQL database.
const connection = require('../database');  //The exact content of the database.js file would define how the connection is established.
const router = express.Router(); //Creates an instance of an Express router.
const { authenticateToken } = require("../authenticateToken");
router.post("/users/allOperations",authenticateToken, (req, res) => {
  const account_number = req.user.account_number;
  const branch = req.user.branch;
  const query = "select * from operations where (sender_account_number=? and sender_branch=?) or(receiver_account_number=? and receiver_branch=?)";
  let ansForQuery;
  // Execute the query to fetch operations
  connection.query(query, [account_number, branch,account_number, branch], (err, results) => {
    if (err) throw err;
    ansForQuery = results;
    console.log(ansForQuery);
    res.send(ansForQuery);
  });
});
//, authenticateToken
router.post("/users/userNameAndMoney",authenticateToken, (req, res) => {
  console.log("in user name and client");
  const account_number = req.user.account_number;
  const branch = req.user.branch;

  const query = "SELECT name, money FROM user_accounts WHERE account_number = ? AND branch = ? LIMIT 1";

  connection.query(query, [account_number, branch], (err, results) => {
    if (err) throw err;

    ansForQuery = results;
    console.log(ansForQuery);
    res.send(ansForQuery);
  });
});





// Route to get sender's operations with pagination
// router.get("/users/:userNum/:branch/senderOperations", (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const itemsPerPage = 4; // Number of items per page
// console.log(itemsPerPage);
// console.log("in get sender");
//   // Calculate the offset for pagination
//   const offset = (page - 1) * itemsPerPage;

//   const { userNum, branch } = req.params;
//   const query = "select * from operations where (sender_account_number=? and sender_branch=?) LIMIT ? OFFSET ?";
//   let ansForQuery;
//   // Execute the query to fetch sender's operations with pagination
//   connection.query(query, [userNum, branch,itemsPerPage, offset], (err, results) => {
//     if (err) throw err;
//     ansForQuery = results;
//     console.log(ansForQuery);
//     res.send(ansForQuery);
//   });
// });
module.exports = router; // Export the router with defined routes