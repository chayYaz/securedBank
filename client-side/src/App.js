import React from "react";
import Home from "./Home";
import Info from "./HomePages/Info"
import NotFound from "./NotFound"
import NewSend from "./NewSend";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserRecurringTransfers from "./HomePages/UserRecurringTransfers";
import LoginPage from "./Login";

function App() {
  return (
    <div className="App">
        <Routes>
        <Route path="/" index element={<LoginPage />} />
          {/* 
          <Route path="/register" index element={<AdminLogin />} /> */}
          <Route path="/home" element={<Home />}>
            <Route path="info" element={<Info />} />
            <Route path="oneTimeSend" element={<NewSend addressToSend="http://localhost:3001/users/newSend"/>}/>
            <Route path="persistantSend" element={<UserRecurringTransfers/>}/>

            <Route path="addRecurringTransfer" element={<>
            <p>start</p>
            
            <NewSend addressToSend="http://localhost:3001/users/addRecuringTransfer"/>
            
            <p>end</p>
            </>}/>
            
            {/* <Route path="changePasswords" element={<ChangePassword />}/>
            <Route path="changeInfo" element={<ChangeInfo />}/>
            <Route path="transfers" element={<Withdraw/>}/>
            
            <Route path="quarterReport" element={<QuarterReport/>}/>
            <Route path="ownershipConfirmation" element={<ownershipConfirmation/>}/>
            <Route path="rateReport" element={<RateReport/>}/> */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
  );
}

export default App;
