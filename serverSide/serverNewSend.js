const express = require('express');
const router = express.Router();
const connection = require('./database');

router.post("/users/newSend", (req, res) => {
  console.log("Received form data:", req.body);

  const {
    sender_account_number,
    sender_branch,
    receiver_account_number,
    receiver_branch,
    amount,
    reason,
  } = req.body;

  const currentDate = new Date().toISOString().split("T")[0];
  const plusMinus = "plus"; // For sender's account
  const wayOfPayment = "Online Transfer";

  // Start the transaction
  connection.beginTransaction((err) => {
    if (err) {
      console.log("Error starting transaction:", err);
      return res.status(500).json({ message: "Error starting transaction" });
    }

    // Update sender's account
    const updateSenderQuery = "UPDATE user_accounts SET money = money - ? WHERE account_number = ? AND branch = ?";
    connection.query(updateSenderQuery, [amount, sender_account_number, sender_branch], (err, senderResult) => {
      if (err) {
        console.log("Error updating sender's account:", err);
        connection.rollback(() => {
          res.status(500).json({ message: "Error updating sender's account" });
        });
        return; // Remove the return statement here
      }

      // Update receiver's account
      const updateReceiverQuery = "UPDATE user_accounts SET money = money + ? WHERE account_number = ? AND branch = ?";
      connection.query(updateReceiverQuery, [amount, receiver_account_number, receiver_branch], (err, receiverResult) => {
        if (err) {
          console.log("Error updating receiver's account:", err);
          connection.rollback(() => {
            res.status(500).json({ message: "Error updating receiver's account" });
          });
          return; // Remove the return statement here
        }

        // Insert the transaction into the operations table
        const insertQuery = "INSERT INTO operations (sender_account_number, sender_branch, receiver_account_number, receiver_branch, amount, date, reason, way_of_payment, plus_minus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const values = [sender_account_number, sender_branch, receiver_account_number, receiver_branch, amount, currentDate, reason, wayOfPayment, plusMinus];
        connection.query(insertQuery, values, (err, insertResult) => {
          if (err) {
            console.log("Error inserting data into operations table:", err);
            connection.rollback(() => {
              res.status(500).json({ message: "Error inserting data into operations table" });
            });
            return; // Remove the return statement here
          }

          // Commit the transaction
          connection.commit((err) => {
            if (err) {
              console.log("Error committing transaction:", err);
              connection.rollback(() => {
                res.status(500).json({ message: "Error committing transaction" });
              });
              return; // Remove the return statement here
            }

            console.log("Transaction completed successfully!");
            res.status(200).json({ message: "Transaction completed successfully" });
          });
        });
      });
    });
  });
});

module.exports = router;
