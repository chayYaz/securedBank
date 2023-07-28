const cron = require('node-cron');
const axios = require('axios');
const data=[]

//  = [
//   {
//     sender_account_number: "1234567890",
//     sender_branch: "Branch A",
//     receiver_account_number: "2345678901",
//     receiver_branch: "Branch B",
//     amount: 200,
//     reason: "Reason 1",
//   },
//   {
//     sender_account_number: "9012345678",
//     sender_branch: "Branch C",
//     receiver_account_number: "8901234567",
//     receiver_branch: "Branch B",
//     amount: 300,
//     reason: "Reason 2",
//   },
//   // Add more objects here...
// ];
// Function to call your insert code or the endpoint that triggers the insert
const insertHourly = async () => {
  try {
    // Your code to perform the hourly task, such as inserting data into the operations table
    // ...

    // Query the database to retrieve the rows from the recurring_transfers table
    const { data } = await axios.get('http://localhost:3001/recurringTransfers'); // Replace the URL with the correct endpoint to retrieve the recurring transfers data

    for (const item of data) {
      try {
        console.log("Inserting data:", item);
        await axios.post('http://localhost:3001/users/newSend', item);
        console.log("Data inserted successfully!");
      } catch (error) {
        console.error("Error inserting data:", error.message);
      }
    }

    console.log('Hourly job executed.');
  } catch (error) {
    console.error('Error executing hourly job:', error.message);
  }
};



// (async () => {
//   try {
//     // Your insert code or API call to the insert endpoint
//     const { data } = await axios.get('http://localhost:3001/recurringTransfers');
//     for (const item of data) {
//       // Your insert code or API call to the insert endpoint
//       // Example: await axios.post('http://localhost:3001/users/newSend', item);
//       try{
//       console.log("Inserting data:", item);
//       await axios.post('http://localhost:3001/users/newSend', item);
//         console.log("Data inserted successfully!");
//       }catch (error) {
//         console.error("Error inserting data:", error.message);
//       }
//     }
//     console.log('Hourly job executed.');
//   } catch (error) {
//     console.error('Error executing hourly job:', error.message);
//   }
// })();

// Schedule the job to run every hour
// cron.schedule('0 * * * *', insertHourly); // '0 * * * *' means every hour at minute 0
//for insert monthly do cron.schedule('0 0 1 * *', insertMonthly); name of func does not matter

module.exports = { insertHourly };
