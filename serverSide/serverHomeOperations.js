
/* The code above imports the necessary dependencies and sets up an
 Express application with JSON parsing and CORS middleware. */
// Importing required modules
const express = require('express');// Express framework for building web applications
const mysql2 = require('mysql2');// MySQL database driver
const cors = require('cors');// Cross-Origin Resource Sharing middleware

// Creating an instance of Express
const app = express();
app.use(express.json()); // Middleware to parse JSON data
app.use(cors()); // Middleware for enabling Cross-Origin Resource Sharing

app.get("/", (req, res) => {
  console.log("Login route accessed");
  res.send("Login page");
});

const connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "0548574423",
  database: "fullstack7",
});

// server starting

app.listen(3001, () => {
  console.log('Server started on port 3001.');

});

app.get("/users/:userNum/:branch/allOperations", (req, res) => {
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
app.get("/users/:userNum/:branch/senderOperations", (req, res) => {
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