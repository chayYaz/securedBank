// managerOperations.js
const express = require('express');
const router = express.Router();
const connection = require('./database');

// Route to add a new customer
              
router.post('/managerOperations/customers/add', (req, res) => {
  
    const { name, account_number, password, branch } = req.body;
    const money = 100;
    const insertUserQuery = 'INSERT INTO user_accounts (name, account_number, password, branch,money) VALUES (?, ?, ?, ?,?)';
    connection.query(insertUserQuery, [name, account_number, password, branch,money], (err, userResult) => {
      if (err) {
        console.error('Error creating user:', err);
        return res.status(500).json({ message: 'Database error' });
      }
      
    });
  });
  

  

// Route to fetch all customers
// Route to fetch all customers
router.post('/managerOperations/customers', (req, res) => {
  const { id } = req.body;
  console.log(id);
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
  console.log(customerId)
  console.log(customerBranch);
  
  // Start a transaction
  connection.beginTransaction((err) => {
    if (err) {
      console.error('Error starting transaction:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    // First, delete related rows from the 'operations' table
    const deleteOperationsQuery = 'DELETE FROM operations WHERE (sender_account_number = ? and sender_branch=?) OR (receiver_account_number=? and receiver_branch =?)';
    connection.query(deleteOperationsQuery, [customerId, customerBranch, customerId, customerBranch], (err, operationsResult) => {
      if (err) {
        console.error('Error deleting customer operations:', err);
        return connection.rollback(() => {
          res.status(500).json({ message: 'Database error' });
        });
      }

      // Next, delete the customer from 'user_accounts' table
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
