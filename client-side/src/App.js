import React from "react";
import Home from "./Home/Home";
import NotFound from "./NotFound"
import NewSend from "./HomePages/NewSend";
import RateReport from "./HomePages/RateReport";
import {  Routes, Route } from "react-router-dom";
import UserRecurringTransfers from "./HomePages/UserRecurringTransfers";
import LoginPage from "./Login/Login";
import HomeAdministor from "./Admin/HomeAdministor";
import LoginAdministor from "./Admin/LoginAdministor"
//import AddNewCustomer from "./AddNewCustomer"
import HomeOperations from "./HomePages/HomeOperations";
function App() {
  return (
    <div className="App">
        <Routes>
        <Route path="/" index element={<LoginPage />} />
        <Route path="/loginAdministor" element={<LoginAdministor/>} />
        <Route path="/homeAdministor" element={<HomeAdministor/>} />
          

          <Route path="/home" element={<Home />}>
            <Route path="oneTimeSend" element={<NewSend addressToSend="http://localhost:3001/users/newSend" title="One Time Money Transfer To Diffrent Account " audio="/newtransfer.mp3"/>}/>
            <Route path="recurringTransfer" element={<UserRecurringTransfers/>}/>
            <Route path="rateReport" element={<RateReport/>}/>
            <Route path="addRecurringTransfer" element={<>

            <NewSend addressToSend="http://localhost:3001/users/addRecuringTransfer" title="Add a recurring Transfer of Money" audio="/addrecurring.mp3"/>
            </>}/>
            <Route path="homeOperations" element={<HomeOperations/>}/>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
  );
}

export default App;
