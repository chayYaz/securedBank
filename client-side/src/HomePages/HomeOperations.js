import './HomeOperations.css';
import {Link, useParams, useLocation,} from "react-router-dom";
import React, { useState, useEffect } from "react";
import sendAuthorizedFetch from '../sendAuthorizedFetch';
import Cookies from "js-cookie"
const start = "http://localhost:3001/";// API base URL

export default function HomeOperations() {
  const [account_number, setAccount_number] = useState([]); 
  const [branch, setBranch] = useState([]); 
  const [allOperations, setAllOperations] = useState([]);
  const [userOperations, setUserOperations] = useState([]);
  const [sortingCriteria, setSortingCriteria] = useState("all_operations"); // to  track of the selected sorting criterion
  // const account_number = localStorage.getItem("account_number");
  // const branch=localStorage.getItem("branch");
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [clientNameAndMoney, setClientNameAndMoney] = useState([]);
  const [nameAndMoneyFlag , setNameAndMoneyFlag] = useState(false);
  
  const [loadMoreVisible, setLoadMoreVisible] = useState(true);
  const initialLoadCount = 5; // Number of operations to load initially
  const loadCountIncrement = 7; // Number of additional operations to load on each "Load More" click

  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");
    setAccount_number(jwtToken.account_number)
    setBranch(jwtToken.branch)
    getOperations();
    getClientNameAndMoney();
  }, []);

  // Function to handle "Load More" button click
  const handleLoadMore = () => {
    const currentLength = userOperations.length;
    const remainingOperations = allOperations.slice(currentLength, currentLength + loadCountIncrement);
    setUserOperations((prevUserOperations) => prevUserOperations.concat(remainingOperations));
    setLoadMoreVisible(allOperations.length > currentLength + loadCountIncrement);
  };

   // Function to fetch user operations
  const getOperations = async () => {
    console.log("in get operation");
    try {
      const response = await sendAuthorizedFetch(`http://localhost:3001/users/allOperations`);
     
      let user_Operations = response
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
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // Function to handle sorting criteria change
  const handleSortingChange = (event) => {
    // the function is created to update the sortingCriteria state when the select value changes
    setSortingCriteria(event.target.value);
  };

  // The function return a sorted copy of the allOperations array based on the selected sorting criteria
  const sortUserOperations = () => {
    let sortedOperations = [...allOperations];

    switch(sortingCriteria) {
      case "all_operations":
        sortedOperations.sort((a, b) => b.date - a.date);
        break; 
      case "Cash":
        sortedOperations = allOperations.filter((operation) => operation.way_of_payment === "Cash");
        break;    
      case "Online_Transfer":
        sortedOperations = allOperations.filter((operation) => operation.way_of_payment === "Online Transfer");
        break;
      case "Credit_Card":
        sortedOperations = allOperations.filter((operation) => operation.way_of_payment === "Credit Card");
        break;
      case "to_account":
        sortedOperations = allOperations.filter((operation) => operation.receiver_account_number === account_number && operation.receiver_branch === branch); // will return Transfers to my account
        break;   
      case "from_account":
        // will return Transfers from my account
        sortedOperations = allOperations.filter((operation) => operation.sender_account_number === account_number && operation.sender_branch === branch); 
        break;
      case  "all_operations_descending":
        sortedOperations.sort((a, b) => a.date - b.date);// will return all operations in descending order
        break;
      default: // case "all_operations":
        sortedOperations.sort((a, b) => b.date - a.date);   
    }
    sortedOperations = sortedOperations.slice(0,  userOperations.length);
    return sortedOperations;
  };

  // Sorted user operations based on sorting criteria
  const sortedUserOperations =sortUserOperations();

  // Function to toggle operation details visibility
  const handleToggleDetails = (operation) => {
    setSelectedOperation((prevSelected) => (prevSelected === operation ? null : operation));
  };
  
  // Function to fetch client name and money data
  const getClientNameAndMoney = async () => {
    console.log("in getClientNameAndMoney");
    try {
      const url = `http://localhost:3001/users/userNameAndMoney`;
      const body = {}; // You can customize the request body if needed
      const data= await sendAuthorizedFetch(url, body);
      setClientNameAndMoney(data);
      setNameAndMoneyFlag(true);
      console.log("data is: " ,data);
     console.log(data[0].money ,data[0].name);
    } catch (error) {
      console.log("Error:", error);
    }
  };

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
            <table className="operations_list_user">
            <tbody>
              {sortedUserOperations.map((operation, index) => (
                <tr key={index} className="operation_item">
                  <td className="operation_details">
                    {/* operations Title */}
                    <p className="operationTitle" fontWeight="bold">
                      {operation.way_of_payment}
                    </p>
                    </td>
                   <td className='operation_details'>
                    {/* Display only the date without the time portion */}
                    <p id="dateDisplay">
                      {new Date(operation.date).toLocaleDateString()}
                  
                    </p>
                    </td>
                    <td className='operation_details'>
                    
                    {operation.receiver_account_number !== account_number && (
                      <p>reciever: {operation.receiver_account_number}</p>
                    )}
                    {operation.sender_account_number !== account_number && (
                      <p>sender: {operation.sender_account_number}</p>
                    )}
                  </td> 
                  <td className={operation.receiver_account_number === account_number ? "greenText operation_details" : "redText operation_details"}>
                    <p>{operation.receiver_account_number === account_number ? "+" : "-"}{operation.amount}</p>
                  </td> 
                  <td className="operation_details">
                    {/* Show additional details when the operation is selected */}
                    {selectedOperation === operation && (
                      <>
                        {/* Display additional details */}
                        <p> reason: {operation.reason}</p>
                      </>
                    )}
                    {/* Show the "More details" link */}
                    <p>
                      <Link className="moreLinks" onClick={() => handleToggleDetails(operation)}>
                        {selectedOperation === operation ? "Less details" : "More details"}
                      </Link>
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
            
          ) : (
            <p className="loading_message">Loading...</p>
          )}
        </div>
      </div>

        {/* Custom messages for empty  selcted option*/}
        {sortingCriteria === "all_operations" && sortedUserOperations.length === 0 && (
          <p>There is no operation to show.</p>
        )}
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
         {sortingCriteria === "all_operations_descending" && sortedUserOperations.length === 0 && (
          <p>There is no operation to show.</p>
        )}

        {/* Show the "More operation..." link */}
        {loadMoreVisible && !(
          (sortingCriteria === "all_operations" && sortedUserOperations.length === 0) ||
          (sortingCriteria === "Cash" && sortedUserOperations.length === 0) ||
          (sortingCriteria === "Online_Transfer" && sortedUserOperations.length === 0) ||
          (sortingCriteria === "Credit_Card" && sortedUserOperations.length === 0) ||
          (sortingCriteria === "to_account" && sortedUserOperations.length === 0) ||
          (sortingCriteria === "from_account" && sortedUserOperations.length === 0) ||
          (sortingCriteria === "all_operations_descending" && sortedUserOperations.length === 0) 
        )&&(
          <p>
            <Link id="moreOperation" className="moreLinks" onClick={handleLoadMore}>More operation...</Link>
          </p>
        )}
    </div>
  </>
  );
}

