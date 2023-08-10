import React, { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai"; // Import the delete icon from react-icons
import "./UserRecurringTransfers.css"

// Functional component to display user's recurring transfers
const UserRecurringTransfers = () => {
  const [transfers, setTransfers] = useState([]); // State to hold the list of transfers
  let account_number = localStorage.getItem("account_number");
  let branch = localStorage.getItem("branch");

  // Function to fetch user's recurring transfers
  const fetchTransfers = async () => {
    try {
      const response = await fetch("http://localhost:3001/users/recurringTransfers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_account_number: account_number,
          user_account_branch: branch,
        }),
      });
  
      if (response.status==200) {
        const data = await response.json();  // Parse response data
        setTransfers(data); // Update the transfers state with fetched data
        console.log(data);
      } else {
        console.error("Error fetching user transfers:", await response.text());
      }
    } catch (error) {
      console.error("Error fetching user transfers:", error);
    }
  };
  
  useEffect(() => {
    // Fetch all transfers for the specific user
    fetchTransfers();
  }, []);

  // Function to handle transfer deletion
  const handleDelete = async (transferId) => {
    try {
      await fetch("http://localhost:3001/recurringTransfers/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: transferId }),
      });
      // Update transfers state after successful deletion
      setTransfers((prevTransfers) =>
      prevTransfers.filter((transfer) => transfer.id !== transferId)
    );
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
