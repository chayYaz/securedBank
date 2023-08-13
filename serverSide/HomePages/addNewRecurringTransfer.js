const express = require('express'); //It's used to create web servers and define routes.
const router = express.Router(); //Creates an instance of an Express router.
const connection = require('../database'); //The exact content of the database.js file would define how the connection is established.
const { authenticateToken } = require('../authenticateToken');

router.post('/users/addRecuringTransfer', authenticateToken, (req, res) => {
  try {
    const {
      receiver_account_number,
      receiver_branch,
      amount,
      reason,
      way_of_payment,
    } = req.body; // Extracting required fields from the request body
    const sender_account_number = req.user.account_number;
    const sender_branch = req.user.branch;
    // Validate the required fields
    if (!sender_account_number || !sender_branch || !receiver_account_number || !receiver_branch || !amount || !reason || !way_of_payment) {
      return res.status(400).json({ message: 'Missing required fields' });  // Sending an error response for missing fields
    }

    // Insert the new row into the recurring_transfers table
    const insertQuery = 'INSERT INTO recurring_transfers (sender_account_number, sender_branch, receiver_account_number, receiver_branch, amount, reason, way_of_payment) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [sender_account_number, sender_branch, receiver_account_number, receiver_branch, amount, reason, way_of_payment];

    connection.query(insertQuery, values, (err, result) => {
      if (err) {
        console.error('Error inserting data into recurring_transfers table:', err); // Logging the error if insertion fails
        return res.status(500).json({ message: 'Error inserting data into recurring_transfers table' }); // Sending an error response
      }

      console.log('Data inserted into recurring_transfers table successfully!');
      res.status(200).json({ message: 'Data inserted into recurring_transfers table successfully' });  // Sending a success response
    });
  } catch (error) {
    console.error('Error adding new row to recurring_transfers table:', error); // Logging any general error during the process
    res.status(500).json({ message: 'Error adding new row to recurring_transfers table' }); // Sending an error response
  }
});

module.exports = router; // Export the router instance with defined routes
