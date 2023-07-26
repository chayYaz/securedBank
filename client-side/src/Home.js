import logo from './logo.svg';
import './Home.css';

import Info from "./HomePages/Info"
import HomeOperations from "./HomeOperations"
import { BrowserRouter, Routes, Route ,Link,Outlet} from "react-router-dom";
import Navigation from './Navigation';
function Home() {



  return (
    <div className="App">
      <Navigation/>
      <Outlet />
      <HomeOperations/>
    </div>
  );
}

export default Home;