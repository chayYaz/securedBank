import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";

const UserRecurringTransfers = () => {
  const [transfers, setTransfers] = useState([]);
  let account_number = localStorage.getItem("account_number");
  let branch = localStorage.getItem("branch");
  const fetchTransfers = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/users/recurringTransfers",
        {
          user_account_number: account_number,
          user_account_branch: branch,
        }
      );
      setTransfers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user transfers:", error);
    }
  };
  useEffect(() => {
    // Fetch all transfers for the specific user
    fetchTransfers();
  }, []);

  const handleDelete = async (transferId) => {
    try {
      await axios.delete(`http://localhost:3001/recurringTransfers/${transferId}`);
      // Fetch transfers again after deleting to update the list
      fetchTransfers();
    } catch (error) {
      console.error("Error deleting transfer:", error);
    }
  };

  return (
    <div>
      <h2>All Recurring Transfers for User {account_number}</h2>
      {transfers.length === 0 ? (
        <p>No transfers found.</p>
      ) : (
        <ul>
          {transfers.map((transfer) => (
            <li key={transfer.id}>
              Receiver Account Number: {transfer.receiver_account_number}
              <br />
              Receiver Branch: {transfer.receiver_branch}
              <br />
              Amount: {transfer.amount}
              <br />
              Reason: {transfer.reason}
              <br />
              <button onClick={() => handleDelete(transfer.id)}>
                <AiFillDelete />
              </button>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserRecurringTransfers;
