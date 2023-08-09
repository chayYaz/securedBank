

const express = require("express");
const connection = require("../database");
const router = express.Router();
//I tried with post and something did not work properly
// Delete a transfer by its ID
router.post("/recurringTransfers/delete", async (req, res) => {
  const transferId = req.body.id;
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
