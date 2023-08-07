import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import "./UserRecurringTransfers.css"
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
    <div className="user-recurring-transfers">
      <h2>All Recurring Transfers for User {account_number}</h2>
      {transfers.length === 0 ? (
        <p>No transfers found.</p>
      ) : (
        <ul>
          {transfers.map((transfer) => (
            <li key={transfer.id} >
                <div className="transfer-row">
  <div className="transfer-details">
    <div className="amount">
      <span>Amount:</span> {transfer.amount}
    </div>
    <div>
      <span>Receiver Account Number:</span> {transfer.receiver_account_number}
    </div>
    <div>
      <span>Receiver Branch:</span> {transfer.receiver_branch}
    </div>
    <div>
      <span>Reason:</span> {transfer.reason}
    </div>
  </div>
 
</div>

              <div className="buttonDelete">
              <button onClick={() => handleDelete(transfer.id)}>
                  <AiFillDelete /> delete
                </button>
              </div>
              
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserRecurringTransfers;
