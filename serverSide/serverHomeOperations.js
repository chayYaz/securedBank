
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
  password: "Ranit0907",
  database: "fullstack7",
});

// server starting
app.listen(3000, () => {
  console.log('Server started on port 3000.');
});

app.get("/users/:userNum/:branch/allOperations", (req, res) => {
  console.log("in users/id");

  const { userNum, branch } = req.params;
  const query = "select * from operations where (sender_account_number=? and sender_branch=?) or(receiver_account_number=? and receiver_branch=?)";
  let ansForQuery;
  connection.query(query, [userNum, branch,userNum, branch], (err, results) => {
    if (err) throw err;
    ansForQuery = results;
    console.log(ansForQuery);
    res.send(ansForQuery);
  });
});
