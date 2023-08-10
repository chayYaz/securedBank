const express = require('express'); //It's used to create web servers and define routes.
const router = express.Router(); express.Router(); //Creates an instance of an Express router.
const connection = require('../database');  //The exact content of the database.js file would define how the connection is established.


// Defining a route for handling recurring transfers request
router.post('/users/recurringTransfers', async (req, res) => {
  try {
    const { user_account_number, user_account_branch } = req.body;

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

module.exports = router; // Exporting the router with defined route
