const express = require('express');//It's used to create web servers and define routes.
const router = express.Router(); //Creates an instance of an Express router.
const connection = require('../database'); //The exact content of the database.js file would define how the connection is established.
const JSEncrypt = require("node-jsencrypt");
const jsEncrypt = new JSEncrypt({ default_key_size: 2048 });
router.get("/homeAdmin/public-key", (req, res) => {
  const publicKey = jsEncrypt.getPublicKey();
  res.send(publicKey);
});
 // Route for adding a new customer
 router.post('/managerOperations/customers/add', (req, res) => {
  const { name, account_number, password, branch } = req.body;
  const money = 100;

  // Decrypt the encrypted password received from the client using the private key
  const decryptedPassword = jsEncrypt.decrypt(password);

  // Construct and execute the SQL query to add a new customer
  const insertUserQuery = 'INSERT INTO user_accounts (name, account_number, password, branch, money) VALUES (?, ?, ?, ?, ?)';
  
  connection.query(insertUserQuery, [name, account_number, decryptedPassword, branch, money], (err, userResult) => {
    if (err) {
      console.error('Error creating user:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(200).json({});
  });
});

module.exports = router;
  

  

// Route to fetch(bring) all customers
router.post('/managerOperations/customers', (req, res) => {
  const { id } = req.body;
  const query = 'SELECT  user_accounts.name,user_accounts.money,user_accounts.account_number,user_accounts.branch FROM user_accounts INNER JOIN branch_administrators ON branch_administrators.branch = user_accounts.branch WHERE branch_administrators.id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching customers:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(200).json(results);
  });
});


// Route to delete a customer
router.post('/managerOperations/customers/delete', (req, res) => {
  console.log("in deleting");
  const { customerId, customerBranch } = req.body;
  // Start a transaction
  connection.beginTransaction((err) => {
    if (err) {
      console.error('Error starting transaction:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    //Delete related rows from the 'operations' table
    const deleteOperationsQuery = 'DELETE FROM operations WHERE (sender_account_number = ? and sender_branch=?) OR (receiver_account_number=? and receiver_branch =?)';
    connection.query(deleteOperationsQuery, [customerId, customerBranch, customerId, customerBranch], (err, operationsResult) => {
      if (err) {
        console.error('Error deleting customer operations:', err);
        return connection.rollback(() => {
          res.status(500).json({ message: 'Database error' });
        });
      }

      // Delete the customer from 'user_accounts' table
      const deleteUserQuery = 'DELETE FROM user_accounts WHERE account_number = ? and branch=?';
      connection.query(deleteUserQuery, [customerId,customerBranch], (err, userResult) => {
        if (err) {
          console.error('Error deleting customer:', err);
          return connection.rollback(() => {
            res.status(500).json({ message: 'Database error' });
          });
        }

        // Commit the transaction
        connection.commit((err) => {
          if (err) {
            console.error('Error committing transaction:', err);
            return connection.rollback(() => {
              res.status(500).json({ message: 'Database error' });
            });
          }

          console.log("finished well");
          res.status(200).json({ message: 'Customer and related operations deleted successfully' });
        });
      });
    });
  });
});

module.exports = router;
