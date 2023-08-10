const express = require('express');  //It's used to create web servers and define routes.
const router = express.Router(); //Creates an instance of an Express router.
const connection = require('../database'); //The exact content of the database.js file would define how the connection is established.

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
        return; 
      }

      // Update receiver's account
      const updateReceiverQuery = "UPDATE user_accounts SET money = money + ? WHERE account_number = ? AND branch = ?";
      connection.query(updateReceiverQuery, [amount, receiver_account_number, receiver_branch], (err, receiverResult) => {
        if (err) {
          console.log("Error updating receiver's account:", err);
          connection.rollback(() => {
            res.status(500).json({ message: "Error updating receiver's account" });
          });
          return;
        }

        // Insert the transaction into the operations table
        const insertQuery = "INSERT INTO operations (sender_account_number, sender_branch, receiver_account_number, receiver_branch, amount, date, reason, way_of_payment) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        const values = [sender_account_number, sender_branch, receiver_account_number, receiver_branch, amount, currentDate, reason, wayOfPayment];
        connection.query(insertQuery, values, (err, insertResult) => {
          if (err) {
            console.log("Error inserting data into operations table:", err);
            connection.rollback(() => {
              res.status(500).json({ message: "Error inserting data into operations table" });
            });
            return; 
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
