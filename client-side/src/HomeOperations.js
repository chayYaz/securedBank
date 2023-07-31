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
  
  //const [numOperations, setNumOperations] = useState(4);
  const [typeOfSort, setTypeOfSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [display, setDisplay] = useState(false);
  const params = useParams();

 

  const getOperations = async (howToSort) => {
    console.log("in get operation");
    let branch=localStorage.getItem("branch");
    let accountNum=localStorage.getItem("account_number");
    switch(howToSort){
    case "senderOperations":
      try {

        let res = await fetch(
          `${start}users/${accountNum}/${branch}/senderOperations?page=${currentPage}&perPage=${4}`
        );
        console.log(res.data);
        let userOperations = await res.json();
        if(userOperations&& userOperations.length){
        setAllOperations(prev=>prev.concat(userOperations));
        return;}
      } catch (err) {
        console.log(err);
      } 
    break;
    default:try {

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
    }}
  };

  useEffect(() => {
    getOperations(typeOfSort);
    setDisplay(true)
  }, [currentPage]);

  const addOperationsToDisplay = () => {
    if(allOperations.length !=0) {
      //setNumOperations(prevNum => prevNum + 4);
      setCurrentPage(prevNum => prevNum + 1);
    }
  };

  return (
    <div>
      {allOperations.length === 0 && display? 'Loading...' :
        allOperations.map((operation,idx) => (
        <>
        <p>{idx}</p>
        <p>sender: {operation.receiver_account_number}</p>
        <p>{operation.amount}</p>
        <p>{operation.date}</p>
        <p>reciever: {operation.receiver_account_number}</p>
        </>))}
      <p><Link onClick={addOperationsToDisplay} 
         
        >More operation...</Link></p>
        <p><Link onClick={()=>{
          setTypeOfSort("senderOperations")
          setCurrentPage(1);
          setAllOperations([])
          getOperations("senderOperations");
        }} 
         
         >the transferes i sent</Link></p>
          <p><Link onClick={()=>{
          setTypeOfSort("")
          setCurrentPage(1);
          setAllOperations([])
          getOperations("");
        }} 
         
         >all transfers</Link></p>
    </div>
  );
}
