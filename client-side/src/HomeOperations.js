import {
  Link,
  useParams,
  useLocation,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
const start = "http://localhost:3000/";
export default function HomeOperations() {
  const location = useLocation();

  const [allOperations, setAllOperations] = useState([]);
  
  const [numOperations, setNumOperations] = useState(4);
  const params = useParams();

 

  const getOperations = async () => {
    console.log("in get operation");
    try {
      let branch="Branch A";
      let accountNum=1234567890;
      let res = await fetch(
        `${start}users/${accountNum}/${branch}/allOperations`
      );
      console.log(res.data);
      let userOperations = await res.json();
      setAllOperations(userOperations);
      return;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOperations();
  }, []);

  const addOperationsToDisplay = () => {
    if(allOperations.length > numOperations) {
      setNumOperations(prevNum => prevNum + 4);
    }
  };

  return (
    <div>
      {allOperations.length === 0? 'Loading...' :
        allOperations.slice(0, numOperations).map(operation => (
        <>
        <p>{operation.amount}</p>
        <p>{operation.date}</p>
        <p>{operation.receiver_account_number}</p>
        </>))}
      <p><Link onClick={addOperationsToDisplay} 
        style={{display: numOperations >= allOperations.length && 'none'}}>More operation...</Link></p>
    </div>
  );
}
