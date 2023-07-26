import logo from './logo.svg';
import './Home.css';

import Info from "./HomePages/Info"
import HomeOperations from "./HomeOperations"
import { BrowserRouter, Routes, Route ,Link,Outlet} from "react-router-dom";
function Home() {

const Navigation = () => {
  return (
    <nav className="menu">
  <ul>
    <li>
      
    </li>
    <li>
      <details>
        <summary>Account managment</summary>
        <Link to="info">Info</Link>
        <Link to="changePasswords">Change Passwords</Link>
        <Link to="changeInfo">Change Info</Link>
      </details>
    </li>
    <details >
        <summary>Transfers</summary>
    {/* <li>
      <Link to="transfers">Transfers</Link>
    </li> */}
      <Link to="persistantSend">Recurring Transfer</Link>
      <Link to="oneTimeSend">
        <span className="material-symbols-outlined">credit_score</span>
        One-Time Transfer
      </Link>
      <Link to="withdraws">
        One-Time Transfer
      </Link>
    </details>
    <details>
        <summary>Reports and Approvals</summary>

      <Link to="quarterReport">Quarter Report</Link>

      <Link to="ownershipConfirmation">Ownership Confirmation</Link>
      <Link to="rateReport">Rate Report</Link>
    </details>
  </ul>
</nav>

  );
};


  return (
    <div className="App">
      <Navigation/>
      <Outlet />
      <HomeOperations/>
    </div>
  );
}

export default Home;