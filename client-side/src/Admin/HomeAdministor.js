import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomeAdministrator.css"
import JSEncrypt from "jsencrypt"


// Defining the HomeAdministor component
const HomeAdministor = () => {
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    password:"",
    confirm_password:"",
    account_number: "", // Branch name, not ID
  });

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    let adminId = localStorage.getItem("managerId");
    try {
      // Fetch customer data for the admin
      const response = await fetch("http://localhost:3001/managerOperations/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: adminId }),
      });
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
      alert("Error fetching customers:", error);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };
  const encryptMessage = (message, publicKey) => {
    const jsEncrypt = new JSEncrypt();
    jsEncrypt.setPublicKey(publicKey);
  
    return jsEncrypt.encrypt(message);
  };
  const handleAddCustomer = async (e) => {
    let start="http://localhost:3001"
    e.preventDefault();
    let branch = localStorage.getItem("branch");
  
    // Check if the password and confirm password match
    if (newCustomer.password !== newCustomer.confirm_password) {
      console.error("Password and Confirm Password do not match");
      alert("Passwords do not match");
      return;
    }
  
    try {
      // Fetch the public key from the server
      const publicKeyResponse = await fetch(start + '/homeAdmin/public-key');
      if (!publicKeyResponse.ok) {
        throw new Error('Failed to fetch public key');
      }
      const publicKey = await publicKeyResponse.text();
  
      // Encrypt the password using the public key
      const encryptedPassword = encryptMessage(newCustomer.password, publicKey);
  
      // Send customer data to the server for addition
      const response = await fetch(start + '/managerOperations/customers/add', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newCustomer, password: encryptedPassword, branch: branch }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Clear the form fields after successful response
      setNewCustomer({
        name: "",
        email: "",
        phone: "",
        account_number: "",
        password: "",
        confirm_password: "",
      });
  
      // Update the customer list after adding
      setCustomers((prevCustomers) => [...prevCustomers, { ...newCustomer, money: 100 }]);
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };
  
  
  // Delete customer based on account number and branch
  const handleDeleteCustomer = async (customerAccount,customerBranch) => {
    try {
      await fetch(`http://localhost:3001/managerOperations/customers/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Add this line
        },
        body: JSON.stringify({ customerId: customerAccount, customerBranch: customerBranch }),
      });
      // Update the customer list after deleting
      setCustomers((prev) =>
      prev.filter((customer) => customer.account_number !== customerAccount));
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <div className="homeAdmin">
      <h1>Have a nice day at work today</h1>
      <div className="newCustForm">
        <h2>Add New Customer</h2>
        <form>
          <div>
            <label>Name:</label>
            <input type="text" name="name" value={newCustomer.name} onChange={handleInputChange} required />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={newCustomer.email} onChange={handleInputChange} required />
          </div>
          <div>
            <label>Phone:</label>
            <input type="tel" name="phone" value={newCustomer.phone} onChange={handleInputChange} required />
          </div>
          <div>
            <label>account number:</label>
            <input type="text" name="account_number" value={newCustomer.account_number} onChange={handleInputChange} required />
          </div>
          <div>
            <label>password:</label>
            <input type="password" name="password" value={newCustomer.password} onChange={handleInputChange} required />
          </div>
          <div>
            <label>confirm password:</label>
            <input type="password" name="confirm_password" value={newCustomer.confirm_password} onChange={handleInputChange} required />
          </div>
          <button type="submit" onClick={handleAddCustomer}>Add Customer</button>
        </form>
      </div>
      <div className="customerList">
        <h2>Customer List</h2>
        <ul>
          {customers.map((customer,idx) => (
          <li key={idx}>
            {customer.name} - {customer.account_number} - {customer.money}  
            <button onClick={() => handleDeleteCustomer(customer.account_number,customer.branch)}>
              Delete
            </button>
          </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomeAdministor;
