import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import JSEncrypt from "jsencrypt";
import logo from "./logobank.png"
import loginImage from "./backgroundphoto2.jpg"
import "./login.css"
import Audio from "../Audio/Audio"
const start = "http://localhost:3001";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    account_number: "",
    password: "",
    branch: "", // Add the branch field to the state
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getPublicKey = async () => {
    try {
      const response = await fetch(start + '/public-key');
      if (!response.ok) {
        throw new Error('Failed to fetch public key');
      }
      const publicKey = await response.text();
      return publicKey;
    } catch (error) {
      console.error('Error fetching public key:', error);
      return null;
    }
  };
  function encryptMessage(message, publicKey) {
    const jsEncrypt = new JSEncrypt();
    jsEncrypt.setPublicKey(publicKey);
   
    return jsEncrypt.encrypt(message);
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const publicKey = await getPublicKey();
  
      if (publicKey) {
  
        const encryptedPassword =encryptMessage(formData.password,publicKey)
        // Send encrypted data to the server
        const ans = await fetch(start + '/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            password: encryptedPassword,
          }),
        });
        const response = await ans.json();
      console.log("response:");
      console.log(response);
      if (ans.status === 200) {
        // Login successful, handle the logged-in user as needed
        console.log("Login successful!");
        const token = response.accessToken;
        Cookies.set("jwtToken", token, { expires: 7, secure: true, sameSite: "strict" });//httpOnly: true. is tto secure because i want to use it in my client side.
        // localStorage.setItem("account_number", formData.username);
        // localStorage.setItem("branch", formData.branch);
        navigate("/home/homeOperations")
      } else {
        // Login failed, display an error message or take appropriate action
        console.log("Login failed. Please check your credentials.");
      }
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
    }
  
    // Clear the form after handling the submit
    setFormData({
      account_number: '',
      password: '',
      branch: '', // Reset the branch field
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
      <h1>welcome to Delphi Wealth Management</h1>
    </div>
    </div>
    <div className="loginForm">
    <Audio src= "/logineng.mp3" />
      <h2 className="login-title">Login to Your Bank Account</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <label>
            account number:
            <input
              type="text"
              name="account_number"
              value={formData.account_number}
              onChange={handleChange}
            />
          </label>
          <label>
            Password   :
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          <label>
            Branch:
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
        <button className="manager-login-button" onClick={()=> navigate("/LoginAdministor")}> manager login</button>
        </div>
      </div>
  
  
  );
};

export default LoginPage;
