const express = require('express'); //It's used to create web servers and define routes.
const router = express.Router(); express.Router(); //Creates an instance of an Express router.
const connection = require('../database');  //The exact content of the database.js file would define how the connection is established.
const jwt = require('jsonwebtoken'); 
const { authenticateToken } = require("../authenticateToken");
// Defining a route for handling recurring transfers request
router.post('/users/recurringTransfers',authenticateToken, async (req, res) => {
  try {

    const user_account_number= req.user.account_number;
    const user_account_branch= req.user.branch;

    // Query the database to get the transfers for the specified user
    const query = `
      SELECT *
      FROM recurring_transfers
      WHERE sender_account_number = ? AND sender_branch = ?;
    `;

    // Executing the query using the connection
    connection.query(query, [user_account_number, user_account_branch], (err, results) => {
      if (err) {
        console.error('Error fetching user transfers:', err);
        return res.status(500).json({ message: 'Error fetching user transfers' });
      }

      // Logging the retrieved recurring transfers data
      console.log("recurring transfers are:");
      console.log(results);
      console.log("end"
      );
      // Send the transfers data as JSON response
      res.json(results);
    });
  } catch (error) {
    console.error('Error handling user transfers request:', error);
    res.status(500).json({ message: 'Error handling user transfers request' });
  }
});
// function authenticateToken(req,res,next){
//   const authHeader=req.headers['authorization']
//   const token=authHeader && authHeader.split(' ')[1];
//   if(token==null){
//     console.log("got null");
//     return res.sendStatus(401);}
//   jwt.verify(token,'df1ea1eb859f1f669b7a92453f30887a9ae59491d054d51116ae05e197b73066fbe4b57af4e603394b833e4528a351f814a93f68471a16629d15dfffeb6f860e',(err,user)=>{
//   if(err) {
//     console.log("got error in line 48");
//     return res.sendStatus(403);}
//   req.user=user;
//   next()
//   });
//   }
module.exports = router; // Exporting the router with defined route
