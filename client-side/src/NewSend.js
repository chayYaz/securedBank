import React, { useState } from "react";
import axios from "axios";

const NewSend = () => {
  const [formData, setFormData] = useState({
    sender_account_number: "",
    sender_branch: "",
    receiver_account_number: "",
    receiver_branch: "",
    amount: "",
    reason: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value,way_of_payment:"Online Transfer" ,plus_minus:"plus"});
  };

  const handleSubmit = async (e) => {
    console.log("in handle submit");
    e.preventDefault();
  
    // Display a confirmation pop-up before sending the transfer details
    const confirmed = window.confirm(
      `Please confirm the transfer details:\n\n` +
      `Sender Account Number: ${formData.sender_account_number}\n` +
      `Sender Branch: ${formData.sender_branch}\n` +
      `Receiver Account Number: ${formData.receiver_account_number}\n` +
      `Receiver Branch: ${formData.receiver_branch}\n` +
      `Amount: ${formData.amount}\n` +
      `Reason: ${formData.reason}`
    );
  
    if (!confirmed) {
      // If the user clicked "Cancel", exit the function without submitting
      return;
    }
  
    try {
      // Get the current date from the computer
      const currentDate = new Date().toISOString().split("T")[0];
      // Add the current date to the form data
      const dataToSend = { ...formData, date: currentDate };
  
      // Send data to the backend for insertion
      const response = await axios.post(
        "http://localhost:3001/users/newSend",
        dataToSend
      );
      console.log(response.data);
  
      // Clear the form after successful submission
      setFormData({
        sender_account_number: "",
        sender_branch: "",
        receiver_account_number: "",
        receiver_branch: "",
        amount: "",
        reason: "",
      });
    } catch (error) {
      console.log("Error inserting data:", error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Sender Account Number:
        <input
          type="text"
          name="sender_account_number"
          value={formData.sender_account_number}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Sender Branch:
        <input
          type="text"
          name="sender_branch"
          value={formData.sender_branch}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Receiver Account Number:
        <input
          type="text"
          name="receiver_account_number"
          value={formData.receiver_account_number}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Receiver Branch:
        <input
          type="text"
          name="receiver_branch"
          value={formData.receiver_branch}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Amount:
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Reason:
        <input
          type="text"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
        />
      </label>
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default NewSend;
