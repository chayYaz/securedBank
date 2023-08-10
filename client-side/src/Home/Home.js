
import { BrowserRouter, Routes, Route ,Link,Outlet} from "react-router-dom";
import Navigation from './Navigation';


// Functional component for rendering the Home page
function Home() {
  return (
    <div className="App">
      <Navigation/>
      <Outlet />
    </div>
  );
}

export default Home;