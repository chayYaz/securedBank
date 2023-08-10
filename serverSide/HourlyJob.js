const cron = require('node-cron'); // used for scheduling tasks to run at specific intervals using cron syntax
const axios = require('axios'); //provides a simple and elegant way to send HTTP requests and handle responses
const data=[]


// Function to call your insert code or the endpoint that triggers the insert
//perform the hourly task, such as inserting data into the operations table
const insertHourly = async () => {
  try {
    // Query the database to retrieve the rows from the recurring_transfers table
    const { data } = await axios.get('http://localhost:3001/recurringTransfers'); // Replace the URL with the correct endpoint to retrieve the recurring transfers data


    /* iterates over each item in the retrieved data array and attempts to 
    insert it into the 'http://localhost:3001/users/newSend' endpoint using the axios.post method.
    */
    for (const item of data) {
      try { 
        console.log("Inserting data:", item);
        // Insert the retrieved data into the 'users/newSend' endpoint
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
