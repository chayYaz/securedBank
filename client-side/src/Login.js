import React, { useState } from "react";
const start = "http://localhost:3001";
const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    branch: "", // Add the branch field to the state
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login credentials to the server for validation
      const ans = await fetch(start+"/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const response = await ans.json();
      console.log("response:");
console.log(response);
      if (ans.status === 200) {
        // Login successful, handle the logged-in user as needed
        console.log("Login successful!");
      } else {
        // Login failed, display an error message or take appropriate action
        console.log("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
    }
    // Clear the form after handling the submit
    setFormData({
      username: "",
      password: "",
      branch: "", // Reset the branch field
    });
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
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
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
