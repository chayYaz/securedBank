

const express = require('express');
const mysql2 = require('mysql2');
//const cors = require('cors');
const connection = require('./database'); 
const router = express.Router();


router.get("/users/:userNum/:branch/allOperations", (req, res) => {
  console.log("in users/id");
  const page = parseInt(req.query.page) || 1;
  const itemsPerPage = 4; // Number of items per page
console.log(itemsPerPage);
  // Calculate the offset for pagination
  const offset = (page - 1) * itemsPerPage;

  const { userNum, branch } = req.params;
  const query = "select * from operations where (sender_account_number=? and sender_branch=?) or(receiver_account_number=? and receiver_branch=?) LIMIT ? OFFSET ?";
  let ansForQuery;
  connection.query(query, [userNum, branch,userNum, branch,itemsPerPage, offset], (err, results) => {
    if (err) throw err;
    ansForQuery = results;
    console.log(ansForQuery);
    res.send(ansForQuery);
  });
});
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
  connection.query(query, [userNum, branch,itemsPerPage, offset], (err, results) => {
    if (err) throw err;
    ansForQuery = results;
    console.log(ansForQuery);
    res.send(ansForQuery);
  });
});
module.exports = router;