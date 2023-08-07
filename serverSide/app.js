// app.js
const express = require('express');
const app = express();
const cron = require('node-cron');
const operationsRoutes = require('./HomePages/serverHomeOperations');
const cors = require('cors');
app.use(express.json());
app.use(cors());
const sendRoutes = require('./HomePages/serverNewSend')
const getRightRecurring = require('./HomePages/getRightRecurring');
const getSpecificUserRecurringTransfers = require('./HomePages/getSpecificUserRecurringTransfers')
const addSpecificUserRecurringTransfers = require('./HomePages/addNewRecurringTransfer')
const login= require('./loginPage')
const deleteRecurring= require('./HomePages/deleteRecurring')
const loginAdmin=require('./Admin/loginAdmin')
const { insertHourly } = require('./HourlyJob.js');
const managerOperations=require('./Admin/ManagerOperations')
// Use the loginRoutes for the root route '/'

app.use("/", operationsRoutes);
app.use("/", sendRoutes);
app.use("/", getRightRecurring);
app.use("/", getSpecificUserRecurringTransfers);
app.use("/", addSpecificUserRecurringTransfers);
app.use("/", login);
app.use("/", loginAdmin);
app.use("/", deleteRecurring);
app.use("/",managerOperations);

// Start the server
app.listen(3001, () => {
  console.log('Server started on port 3001.');
});
cron.schedule('0 * * * *', insertHourly); 