import { BrowserRouter, Routes, Route ,Link,Outlet} from "react-router-dom";
import React, { useState } from "react";
import "./Navigation.css"
const Navigation = () => {
  
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    console.log("toggled");
    setMenuVisible((prevMenuVisible) => !prevMenuVisible);
    console.log(menuVisible);
  };
  return (
    <div style={{ display: "flex", flexDirection: "row" }} className="menuDiv">
    <span class="menu-icon" onClick={toggleMenu}  style={
      { fontSize: "5rem"}} >☰</span>
    <nav className={`menu  ${menuVisible ? "show" : ""}`}>
  <ul>

      <li>
        <div>
      <Link to="./addRecurringTransfer">
      add Recurring Transfer
      </Link>
      </div>
    </li>
    <li>
      <div>
      <Link to="./recurringTransfer">Recurring Transfers</Link>
      </div>
    </li>
    <li>
      <div>
    <span class="material-symbols-outlined">credit_score</span>
    <Link to="./homeOperations">
       Recent operations
     </Link>
     </div>
    </li>
    <li>
      <div>
        <span class="material-symbols-outlined">
          receipt_long
        </span>
        <Link to="./rateReport">Rate Report</Link>
    </div>
    </li>
    <li>
    <div>
    <Link to="./oneTimeSend">
      One-Time Transfer
    </Link>
    </div>
    </li>
    <li>
    <div>
    <Link to="/" onClick={() => 
      localStorage.clear()
  }>
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