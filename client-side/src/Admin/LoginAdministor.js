import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js"; // Importing the CryptoJS library for encryption
import logo from "../Login/logobank.png"
import loginImage from "../Login/backgroundphoto2.jpg"
import "../Login/login.css"


const start = "http://localhost:3001"; // Define the base URL for API requests

// Defining the LoginAdministor component
function LoginAdministor() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    branch: "", // Adding the branch field to the state
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Encrypt the password before sending it to the server
      const encryptedPassword = CryptoJS.AES.encrypt(formData.password, "my-secret-key").toString();

      // Send login credentials to the server for validation
      const ans = await fetch(start+"/loginAdmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...formData,password:encryptedPassword}),
      });
      const response = await ans.json();
      console.log("response:");
      console.log(response);
      if (ans.status === 200) {
        // Login successful, handle the logged-in user as needed
        console.log("Login successful!");
        localStorage.setItem("managerId", formData.id);
        localStorage.setItem("branch", formData.branch);
        localStorage.setItem("isAdmin", "yes");
        navigate("/homeAdministor")
      } else {
        // Login failed, display an error message or take appropriate action
        console.log("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
    }
    // Clear the form after handling the submit
    setFormData({
      id: "",
      password: "",
      branch: "", // Reset the branch field
    });
  };

  return (
    <div className="login-container">
      <div>
        <div className="background-container">
          <img src={loginImage} alt="login image" />
          <div className="overlay"></div>
        </div>
        <div className="logoAndSlogan">
          <img src={logo} alt="Bank Logo" className="bank-logo" />
          <h1>Dear worker <br/>we wish you a great day</h1>
        </div>
      </div>
      <div className="loginForm">
        <h2 className="login-title">Login to Your Bank Account</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <label>
            manager id number:
            <input
              type="number"
              name="id"
              value={formData.id}
              onChange={handleChange}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          <label>
            Branch name:
            <input
              type="text"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              placeholder="Enter Branch"
              />
          </label>
          <button type="submit">Login</button>
        </form>
        <button onClick={()=> navigate("/")}> regular login</button>
      </div>
    </div>
    
    
  );
}

export default LoginAdministor;