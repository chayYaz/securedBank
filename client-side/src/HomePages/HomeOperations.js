import './HomeOperations.css';
import {Link, useParams, useLocation,} from "react-router-dom";
import React, { useState, useEffect } from "react";
const start = "http://localhost:3001/";

export default function HomeOperations() {

  const [allOperations, setAllOperations] = useState([]);
  const [userOperations, setUserOperations] = useState([]);
  const [sortingCriteria, setSortingCriteria] = useState("all_operations"); // to  track of the selected sorting criterion
  const account_number = localStorage.getItem("account_number");
  const branch=localStorage.getItem("branch");
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [clientNameAndMoney, setClientNameAndMoney] = useState([]);
  const [nameAndMoneyFlag , setNameAndMoneyFlag] = useState(false);
  
  const [loadMoreVisible, setLoadMoreVisible] = useState(true);
  const initialLoadCount = 5; // Number of photos to load initially
  const loadCountIncrement = 7; // Number of additional photos to load on each "Load More" click

  useEffect(() => {
    getOperations();
    getClientNameAndMoney();
  }, []);

/*   const addOperationsToDisplay = () => {
    if(allOperations.length !== 0) {
      //setNumOperations(prevNum => prevNum + 4);
      setCurrentPage(prevNum => prevNum + 1);
    }
  }; */

  const handleLoadMore = () => {
    const currentLength = userOperations.length;
    const remainingOperations = allOperations.slice(currentLength, currentLength + loadCountIncrement);
    setUserOperations((prevUserOperations) => prevUserOperations.concat(remainingOperations));
    setLoadMoreVisible(allOperations.length > currentLength + loadCountIncrement);
  };

  const getOperations = async () => {
    console.log("in get operation");

    try {
      let response = await fetch(
        `${start}users/${account_number}/${branch}/allOperations`
      );
      if (!response.ok) {
        throw new Error("Request failed");
      }  
      let user_Operations = await response.json();
      // Format dates without the time
      //go throw every operation Date and make it present with only a date without a the time
      user_Operations = user_Operations.map((operation) => {
        return {
          ...operation,
          date: new Date(operation.date)
        };
      });
      setAllOperations(user_Operations);
      console.log(user_Operations);
      setUserOperations(user_Operations.slice(0, initialLoadCount));
      setLoadMoreVisible(user_Operations.length > initialLoadCount);
     // getAmount();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleSortingChange = (event) => {
    // the function is created to update the sortingCriteria state when the select value changes
    setSortingCriteria(event.target.value);
  };

  const sortUserOperations = () => {
    // the function return a sorted copy of the userTodos array based on the selected sorting criteria
    let sortedOperations = [...userOperations];

    switch(sortingCriteria) {
      case "all_operations":
        sortedOperations.sort((a, b) => b.date - a.date);
        break; 
      case "Cash":
        sortedOperations = userOperations.filter((operation) => operation.way_of_payment === "Cash");
        break;    
      case "Online_Transfer":
        sortedOperations = userOperations.filter((operation) => operation.way_of_payment === "Online Transfer");
        break;
      case "Credit_Card":
        sortedOperations = userOperations.filter((operation) => operation.way_of_payment === "Credit_Card");
        break;
      case "to_account":
        sortedOperations = userOperations.filter((operation) => operation.receiver_account_number === account_number ); // will return Transfers to my account
        break;   
      case "from_account":
        // will return Transfers from my account
        sortedOperations = userOperations.filter((operation) => operation.sender_account_number === account_number &&  operation.plus_minus === "minus" ); 
        break;
      case  "all_operations_descending":
        sortedOperations.sort((a, b) => a.date - b.date);// will return all operations in descending order
        break;
      default: // case "all_operations":
        sortedOperations.sort((a, b) => b.date - a.date);   
    }
    return sortedOperations;
  };

  const sortedUserOperations = sortUserOperations();

  const handleToggleDetails = (operation) => {
    setSelectedOperation((prevSelected) => (prevSelected === operation ? null : operation));
  };
  
  const getClientNameAndMoney = async () => {
    console.log("in getClientNameAndMoney");

    try {
      let response = await fetch(
        `${start}users/${account_number}/${branch}/userNameAndMoney`
      );
      if (!response.ok) {
        throw new Error("Request failed");
      }  
      let data = await response.json();
      setClientNameAndMoney(data);
      setNameAndMoneyFlag(true);
      console.log("data is: " ,data);
     // console.log(clientNameAndMoney[0].money ,clientNameAndMoney[0].name);
    } catch (error) {
      console.log("Error:", error);
    }
  };

/* 
  const getAmount = () => {
    //  let latestAmount = 0;
  
    // allOperations.forEach((operation) => {
    //   if(operation.sender_account_number === account_number && operation.sender_branch === branch ) {
    //     latestAmount -= operation.amount;
    //   } else {
    //     if ( operation.receiver_account_number === account_number && operation.receiver_branch === branch){
    //       latestAmount += operation.amount;
    //     }
    //   }
    // });
  
    // setMoneyAmount(latestAmount);

    allOperations.sort((a, b) => b.date - a.date);  
    setMoneyAmount(allOperations[0].amount); 
  };*/

  return (
    <>
      <div className="operations_container">
        {nameAndMoneyFlag && (
          <>
            <h1 className="amountMoney_header" >Amount of money for now: {clientNameAndMoney[0].money}</h1>
            <h6 className="operations_header">{clientNameAndMoney[0].name}'s Accounts Payable:</h6>
          </>
        )}

        {/* Main container with flex layout */}
        <div className="main_container">
          {/* Left section with select_section */}
          <div className="left_section">
            {/* the select tags */}
            <div className="select_section">
              <div className="sorting_section">
                <label htmlFor="sortingCriteria">Sort by:</label>
                <select
                  id="sortingCriteria"
                  value={sortingCriteria}
                  onChange={handleSortingChange}
                >
                  <option value="/" />
                  <option value="all_operations">All operations</option>
                  <option value="Cash">Cash</option>
                  <option value="Online_Transfer">Online Transfer</option>
                  <option value="Credit_Card">Credit Card</option>
                  <option value="to_account">Transfers to my account</option>
                  <option value="from_account">Transfers from my account</option>
                  <option value="all_operations_descending">All operations in descending order</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right section with operations_list_user */}
          <div className="right_section">
          {/* print the all operations list */}
          {userOperations.length > 0 ? (
              <ol className="operations_list_user">
              {sortedUserOperations.map((operation, index) => (
                <li className="operation_item" key={index}>
                  {/* operations Title */}
                  <p className="operationTitle"><bold>{operation.way_of_payment}</bold></p>
                  {/* Display only the date without the time portion*/}
                  <p>{new Date(operation.date).toLocaleDateString()}</p>
                  <br></br><br></br><br></br><br></br>
                  {/* Conditional rendering of reciever based on account_number */}
                  {operation.receiver_account_number !== account_number && (
                    <p>reciever: {operation.receiver_account_number}</p>
                  )}
                  {operation.sender_account_number !== account_number && (
                    <p>sender: {operation.sender_account_number}</p>
                  )}
                  {/* Add inline styles based on the condition */}
                  <div style={{ color: operation.plus_minus === "plus" ? "green" : "red" }}>
                   <p>{operation.plus_minus === "plus" ? "+" : "-"}{operation.amount}</p> 
                  </div>
                  {/* Show additional details when the operation is selected */}
                  {selectedOperation === operation && (
                    <>
                      {/* Display additional details */}
                      <p> reason: {operation.reason}</p>
                    </>
                  )}
                  {/* Show the "More details" link */}
                  <p>
                    <Link onClick={() => handleToggleDetails(operation)}>
                      {selectedOperation === operation ? "Less details" : "More details"}
                    </Link>
                  </p>
                </li>
              ))}
            </ol>  
          ) : (
            <p className="loading_message">Loading...</p>
          )}
        </div>
      </div>

        {/* Custom messages for empty  selcted option*/}
        {sortingCriteria === "Cash" && sortedUserOperations.length === 0 && (
          <p>There is no Cash to show.</p>
        )}
        {sortingCriteria === "Online_Transfer" && sortedUserOperations.length === 0 && (
          <p>There is no Online Transfer to show.</p>
        )}
        {sortingCriteria === "Credit_Card" && sortedUserOperations.length === 0 && (
          <p>There is no Credit Card to show.</p>
        )}
        {sortingCriteria === "to_account" && sortedUserOperations.length === 0 && (
          <p>There is no Online Transfer to show.</p>
        )}
        {sortingCriteria === "from_account" && sortedUserOperations.length === 0 && (
          <p>There is no Online Transfer to show.</p>
        )}

        {/* Show the "More operation..." link */}
        {loadMoreVisible && !(
          (sortingCriteria === "Cash" && sortedUserOperations.length === 0) ||
          (sortingCriteria === "Online_Transfer" && sortedUserOperations.length === 0) ||
          (sortingCriteria === "Credit_Card" && sortedUserOperations.length === 0) ||
          (sortingCriteria === "to_account" && sortedUserOperations.length === 0) ||
          (sortingCriteria === "from_account" && sortedUserOperations.length === 0)
        )&&(
          <p>
            <Link onClick={handleLoadMore}>More operation...</Link>
          </p>
        )}
    </div>
  </>
  );
}

