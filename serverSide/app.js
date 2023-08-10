const express = require('express'); //It's used to create web servers and define routes.
const app = express(); // uses the express package to create the app instance.
const cron = require('node-cron');  // used for scheduling tasks to run at specific intervals using cron syntax
const operationsRoutes = require('./HomePages/serverHomeOperations');
const cors = require('cors'); //CORS allows to control which domains are permitted to access your application's resources.

// Configure the application to use JSON parsing and enable CORS
app.use(express.json());
app.use(cors());

// Import various route modules
const sendRoutes = require('./HomePages/serverNewSend')
const getAllRecurring = require('./HomePages/getAllRecurring');
const getSpecificUserRecurringTransfers = require('./HomePages/getSpecificUserRecurringTransfers')
const addSpecificUserRecurringTransfers = require('./HomePages/addNewRecurringTransfer')
const login= require('./loginPage')
const deleteRecurring= require('./HomePages/deleteRecurring')
const loginAdmin=require('./Admin/loginAdmin')
const { insertHourly } = require('./HourlyJob.js');
const managerOperations=require('./Admin/ManagerOperations')

// Configure routes for the application using the imported modules
app.use("/", operationsRoutes);
app.use("/", sendRoutes);
app.use("/", getAllRecurring);
app.use("/", getSpecificUserRecurringTransfers);
app.use("/", addSpecificUserRecurringTransfers);
app.use("/", login);
app.use("/", loginAdmin);
app.use("/", deleteRecurring);
app.use("/",managerOperations);

// Start the server and listen on port 3001
app.listen(3001, () => {
  console.log('Server started on port 3001.');
});

// Schedule a cron job to run the 'insertHourly' function every hour at minute 0
cron.schedule('0 * * * *', insertHourly); 