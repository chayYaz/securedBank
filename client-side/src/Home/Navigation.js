import { BrowserRouter, Routes, Route ,Link,Outlet} from "react-router-dom";
import React, { useState } from "react";
import "./Navigation.css"


// Functional component for rendering the navigation menu
const Navigation = () => {
  
  const [menuVisible, setMenuVisible] = useState(false);

  // Function to toggle the visibility of the menu
  const toggleMenu = () => {
    console.log("toggled");
    setMenuVisible((prevMenuVisible) => !prevMenuVisible);
    console.log(menuVisible);
  };
  return (
    <div style={{ display: "flex", flexDirection: "row" }} className="menuDiv">
      <span className="menu-icon" onClick={toggleMenu}  style={
        { fontSize: "5rem"}} >☰</span>
      <nav className={`menu  ${menuVisible ? "show" : ""}`}>
      <ul>
        <li>
          <div><span className="material-symbols-outlined">currency_exchange</span>
            <Link to="./addRecurringTransfer">add Recurring Transfer </Link>
          </div>
        </li>
        <li>
          <div>
            <span className="material-symbols-outlined">sync_alt</span>
            <Link to="./recurringTransfer">Recurring Transfers</Link>
          </div>
        </li>
        <li>
          <div>
            <span className="material-symbols-outlined">credit_score</span>
            <Link to="./homeOperations">Recent operations</Link>
          </div>
        </li>
        <li>
          <div>
            <span className="material-symbols-outlined">receipt_long</span>
            <Link to="./rateReport">Rate Report</Link>
          </div>
        </li>
        <li>
          <div>
            <span className="material-symbols-outlined">add</span><span className="material-symbols-outlined">trending_flat </span>
            <Link to="./oneTimeSend"> One-Time Transfer </Link>
          </div>
        </li>
        <li>
          <div>
            <span className="material-symbols-outlined">logout</span>
            <Link to="/" onClick={() => 
              localStorage.clear() }>
              logout
            </Link>
          </div>
        </li>
      </ul>
    </nav>
  </div>
  );
};
export default Navigation