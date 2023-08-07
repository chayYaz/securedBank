const express = require('express');
const router = express.Router();
const connection = require('../database');

router.post('/users/addRecuringTransfer', async (req, res) => {
  console.log("in /users/addRecuringTransfer");
  try {
    const {
      sender_account_number,
      sender_branch,
      receiver_account_number,
      receiver_branch,
      amount,
      reason,
      way_of_payment,
    } = req.body;

    // Validate the required fields
    if (!sender_account_number || !sender_branch || !receiver_account_number || !receiver_branch || !amount || !reason || !way_of_payment) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Insert the new row into the recurring_transfers table
    const insertQuery = 'INSERT INTO recurring_transfers (sender_account_number, sender_branch, receiver_account_number, receiver_branch, amount, reason, way_of_payment) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [sender_account_number, sender_branch, receiver_account_number, receiver_branch, amount, reason, way_of_payment];

    connection.query(insertQuery, values, (err, result) => {
      if (err) {
        console.error('Error inserting data into recurring_transfers table:', err);
        return res.status(500).json({ message: 'Error inserting data into recurring_transfers table' });
      }

      console.log('Data inserted into recurring_transfers table successfully!');
      res.status(200).json({ message: 'Data inserted into recurring_transfers table successfully' });
    });
  } catch (error) {
    console.error('Error adding new row to recurring_transfers table:', error);
    res.status(500).json({ message: 'Error adding new row to recurring_transfers table' });
  }
});

module.exports = router;
