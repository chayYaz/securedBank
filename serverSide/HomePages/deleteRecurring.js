const express = require("express"); //It's used to create web servers and define routes.
const connection = require("../database"); //The exact content of the database.js file would define how the connection is established.
const router = express.Router(); //Creates an instance of an Express router.
 

// Delete a transfer by its ID
router.post("/recurringTransfers/delete", async (req, res) => {
  const transferId = req.body.id; // Extracting the transfer ID from the request body
  const query = "DELETE FROM recurring_transfers WHERE id = ?";
  try {
    connection.query(query, [transferId]); // Executing the delete query with the transfer ID parameter
    return res.status(200).json({ message: "Transfer deleted successfully" }); // Sending a success response
  } catch (error) {
    console.error("Error deleting transfer:", error); // Logging the error if deletion fails
    return res.status(500).json({ message: "Database error" }); // Sending an error response
  }
});


module.exports = router; // Export the router with defined routes
