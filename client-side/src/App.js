
import React from "react";
import Home from "./Home";
import Info from "./HomePages/Info"
import NotFound from "./NotFound"
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        {/* <Route path="/" index element={<Login />} />
        <Route path="/register" index element={<AdminLogin />} /> */}
        <Route path="/users/:username/home" element={<Home />}>
            <Route path="info" element={<Info />}/>
            {/* <Route path="changePasswords" element={<ChangePassword />}/>
            <Route path="changeInfo" element={<ChangeInfo />}/>
            <Route path="transfers" element={<Withdraw/>}/>
            <Route path="persistantSend" element={<PersistantSend/>}/>
            <Route path="oneTimeSend" element={<OneTimeSendSend/>}/>
            <Route path="quarterReport" element={<QuarterReport/>}/>
            <Route path="ownershipConfirmation" element={<ownershipConfirmation/>}/>
            <Route path="rateReport" element={<RateReport/>}/> */}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
