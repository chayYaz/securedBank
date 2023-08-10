const express = require('express'); //It's used to create web servers and define routes.
const router = express.Router(); //Creates an instance of an Express router.
const connection = require('../database'); //The exact content of the database.js file would define how the connection is established.

// Route to get all recurring transfers
router.get('/recurringTransfers', (req, res) => {
  try {
    // Query the database to get the recurring transfers data using callbacks
    connection.query('SELECT * FROM recurring_transfers', (error, results) => {
      if (error) {
        console.error('Error getting recurring transfers:', error);
        res.status(500).json({ message: 'Error getting recurring transfers' });
      } else {
        // Send the data as JSON response
        res.json(results);
      }
    });
  } catch (error) {
    console.error('Error getting recurring transfers:', error);
    res.status(500).json({ message: 'Error getting recurring transfers' });
  }
});
module.exports = router; // Export the router with defined routes