import logo from './logo.svg';
import './App.css';
import Info from "./HomePages/Info"
import { BrowserRouter, Routes, Route ,Link,Outlet} from "react-router-dom";
function Home() {

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="info">Info</Link>
        </li>
        <li>
          <Link to="changePasswords">Change Passwords</Link>
        </li>
        <li>
          <Link to="changeInfo">Change Info</Link>
        </li>
        <li>
          <Link to="transfers">Transfers</Link>
        </li>
        <li>
          <Link to="persistantSend">Persistent Send</Link>
        </li>
        <li>
          <Link to="oneTimeSend">One-Time Send</Link>
        </li>
        <li>
          <Link to="quarterReport">Quarter Report</Link>
        </li>
        <li>
          <Link to="ownershipConfirmation">Ownership Confirmation</Link>
        </li>
        <li>
          <Link to="rateReport">Rate Report</Link>
        </li>
      </ul>
    </nav>
  );
};


  return (
    <div className="App">
      <Navigation/>
      <Outlet />
    </div>
  );
}

export default Home;