
import HomeOperations from "../HomePages/HomeOperations"
import { BrowserRouter, Routes, Route ,Link,Outlet} from "react-router-dom";
import Navigation from './Navigation';
function Home() {


  return (
    <div className="App">
      
      <Navigation/>
      <Outlet />
    </div>
  );
}

export default Home;