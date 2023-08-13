import React, { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai"; // Import the delete icon from react-icons
import Cookies from "js-cookie"
import "./UserRecurringTransfers.css"
import sendAuthorizedFetch from "../sendAuthorizedFetch"
// Functional component to display user's recurring transfers
const UserRecurringTransfers = () => {
  const [transfers, setTransfers] = useState([]); // State to hold the list of transfers
 
  // let account_number = localStorage.getItem("account_number");
  // let branch = localStorage.getItem("branch");
  const jwtToken = Cookies.get("jwtToken");
  console.log(jwtToken);
  // Function to fetch user's recurring transfers
  const fetchTransfers = async () => {
    try {
      const data = await sendAuthorizedFetch(`http://localhost:3001/users/recurringTransfers`);
      // Parse response data
        setTransfers(data); // Update the transfers state with fetched data
        console.log(data);
      
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
      {/* <h2>All Recurring Transfers for User {tokenaccount_number}</h2> */}
      {transfers.length === 0 ? (
        <p>No transfers found.</p>
      ) : (
        <div className="user-recurring-transfers">
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Receiver Account Number</th>
              <th>Receiver Branch</th>
              <th>Reason</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transfers.map((transfer) => (
              <tr key={transfer.id}>
                <td className="amount">{transfer.amount}</td>
                <td>{transfer.receiver_account_number}</td>
                <td>{transfer.receiver_branch}</td>
                <td>{transfer.reason}</td>
                <td className="buttonDelete">
                  <button onClick={() => handleDelete(transfer.id)}>
                    <AiFillDelete /> delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      )}
    </div>
  );
};

export default UserRecurringTransfers;
