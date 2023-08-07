const express = require('express');
const router = express.Router();
const connection = require('../database');

router.post('/users/recurringTransfers', async (req, res) => {
  try {
    const { user_account_number, user_account_branch } = req.body;

    // Query the database to get the transfers for the specified user
    const query = `
      SELECT *
      FROM recurring_transfers
      WHERE sender_account_number = ? AND sender_branch = ?;
    `;

    connection.query(query, [user_account_number, user_account_branch], (err, results) => {
      if (err) {
        console.error('Error fetching user transfers:', err);
        return res.status(500).json({ message: 'Error fetching user transfers' });
      }
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

module.exports = router;
