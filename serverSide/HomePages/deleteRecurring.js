// server.js (or wherever your server-side code is)

const express = require("express");
const mysql2 = require("mysql2");
const connection = require("../database");
const router = express.Router();

// Delete a transfer by its ID
router.delete("/recurringTransfers/:id", async (req, res) => {
  const transferId = req.params.id;
  const query = "DELETE FROM recurring_transfers WHERE id = ?";
  try {
    connection.query(query, [transferId]);
    return res.status(200).json({ message: "Transfer deleted successfully" });
  } catch (error) {
    console.error("Error deleting transfer:", error);
    return res.status(500).json({ message: "Database error" });
  }
});

module.exports = router;
