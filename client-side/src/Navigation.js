import { BrowserRouter, Routes, Route ,Link,Outlet} from "react-router-dom";
import React, { useState } from "react";
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
      <div >
      <span class="material-symbols-outlined">
shield_lock
</span>
    <select >
          <option disabled selected>Account managment</option>
          <option value="fruit"><Link to="info">Info</Link></option>

          <option value="vegetable"><Link to="changePasswords">Change Passwords</Link></option>

          <option value="meat"> <Link to="changeInfo">Change Info</Link></option>
    </select>
    </div>
    </li>
        
    
      <li>
    <div>
        <span class="material-symbols-outlined">credit_score</span>
    <select >
    <option disabled selected>
      
      Transfers </option>
      <option>
      <Link to="persistantSend">Recurring Transfer</Link>
      </option>
      <option><Link to="oneTimeSend">
       
        One-Time Transfer
      </Link>
      </option>
      <option><Link to="withdraws">
        One-Time Transfer
      </Link>
      </option>
      </select>
      </div>
    </li>
    <li>
      <div>
      
      <span class="material-symbols-outlined">
receipt_long
</span>
    <select>
        <option disabled selected>Reports and Approvals 
</option>

        <option><Link to="quarterReport">Quarter Report</Link></option>

        <option><Link to="ownershipConfirmation">Ownership Confirmation</Link></option>
        <option><Link to="rateReport">Rate Report</Link></option>
    </select>
    </div>
    </li>
    <li>
    <div>  
    <span class="material-symbols-outlined">
mail
</span>
<select>
    <option><Link to="rateReport">contact your banker</Link></option>
    <option><Link to="">all messages</Link></option>
    <option><Link to="">send new message</Link></option>
    
    </select>
    </div>
    </li>
  </ul>
</nav>
</div>
  );
};
export default Navigation