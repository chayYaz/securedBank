// HomeAdministor.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

  const handleAddCustomer = async () => {
    let branch=localStorage.getItem("branch")
    if (newCustomer.password !== newCustomer.confirm_password) {
      console.error("Password and Confirm Password do not match");
      alert("passwords do not match")
      return;
    }
    try {
      await fetch("http://localhost:3001/managerOperations/customers/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...newCustomer,branch:branch}),
      });
      // Refresh the customer list after adding
      fetchCustomers();
      // Clear the input fields
      setNewCustomer({ name: "", email: "", phone: "", branch: "" ,account_number:"",password:"",confirm_password:""});
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  const handleDeleteCustomer = async (customerId,customerBranch) => {
    console.log(customerId);
    console.log(customerBranch);
    try {
      await fetch(`http://localhost:3001/managerOperations/customers/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Add this line
        },
        body: JSON.stringify({ customerId: customerId, customerBranch: customerBranch }),
      });
      // Refresh the customer list after deleting
      fetchCustomers();
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <div>
      <div>
        <h2>Add New Customer</h2>
        <form onSubmit={handleAddCustomer}>
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
            <input type="text" name="password" value={newCustomer.password} onChange={handleInputChange} required />
          </div>
          <div>
            <label>confirm password:</label>
            <input type="number" name="confirm_password" value={newCustomer.confirm_password} onChange={handleInputChange} required />

          </div>
          <button type="submit">Add Customer</button>
        </form>

      </div>

      <div>
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
