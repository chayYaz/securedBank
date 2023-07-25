import {
  Link,
  useParams,
  useLocation,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
const start = "http://localhost:3001/";
export default function HomeOperations() {
  const location = useLocation();

  const [allOperations, setAllOperations] = useState([]);
  
  const [numOperations, setNumOperations] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [display, setDisplay] = useState(false);
  const params = useParams();

 

  const getOperations = async () => {
    console.log("in get operation");
    try {
      let branch="Branch A";
      let accountNum=1234567890;
      let res = await fetch(
        `${start}users/${accountNum}/${branch}/allOperations?page=${currentPage}&perPage=${4}`
      );
      console.log(res.data);
      let userOperations = await res.json();
      if(userOperations&& userOperations.length){
      setAllOperations(prev=>prev.concat(userOperations));
      return;}
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOperations();
    setDisplay(true)
  }, [currentPage]);

  const addOperationsToDisplay = () => {
    if(allOperations.length !=0) {
      setNumOperations(prevNum => prevNum + 4);
      setCurrentPage(prevNum => prevNum + 1);
    }
  };

  return (
    <div>
      {allOperations.length === 0 && display? 'Loading...' :
        allOperations.map(operation => (
        <>
        <p>{operation.amount}</p>
        <p>{operation.date}</p>
        <p>{operation.receiver_account_number}</p>
        </>))}
      <p><Link onClick={addOperationsToDisplay} 
         
        >More operation...</Link></p>
    </div>
  );
}
