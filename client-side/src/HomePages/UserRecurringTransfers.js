import React, { useState, useEffect } from "react";
import axios from "axios";

const UserRecurringTransfers = () => {
  const [transfers, setTransfers] = useState([]);
let account_number=1234567890;
let branch="Branch A"

  useEffect(() => {
    // Fetch all transfers for the specific user
    const fetchTransfers = async () => {
      try {
        const response = await axios.post("http://localhost:3001/users/recurringTransfers", {
          user_account_number: account_number,
          user_account_branch: branch,
        });
        setTransfers(response.data);
      } catch (error) {
        console.error("Error fetching user transfers:", error);
      }
    };

    fetchTransfers();
  }, []);

  return (
    <div>
      <h2>All Recurring Transfers for User {account_number}</h2>
      {transfers.length === 0 ? (
        <p>No transfers found.</p>
      ) : (
        <ul>
          {transfers.map((transfer) => (
            <li key={transfer.id}>
              Sender Account Number: {transfer.sender_account_number}
              <br />
              Sender Branch: {transfer.sender_branch}
              <br />
              Receiver Account Number: {transfer.receiver_account_number}
              <br />
              Receiver Branch: {transfer.receiver_branch}
              <br />
              Amount: {transfer.amount}
              <br />
              Reason: {transfer.reason}
              <br />

              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserRecurringTransfers;
