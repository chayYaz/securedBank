const express = require('express');
const router = express.Router();
const connection = require('../database');

router.get('/recurringTransfers', (req, res) => {
  try {
    // Query the database to get the recurring transfers data using callbacks
    // Replace the following query with your actual query to retrieve the data
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
module.exports = router;