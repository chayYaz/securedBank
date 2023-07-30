// app.js
const express = require('express');
const app = express();
const cron = require('node-cron');
const operationsRoutes = require('./serverHomeOperations');
const cors = require('cors');
app.use(express.json());
app.use(cors());
const sendRoutes = require('./serverNewSend')
const getRightRecurring = require('./getRightRecurring');
const getSpecificUserRecurringTransfers = require('./getSpecificUserRecurringTransfers')
const addSpecificUserRecurringTransfers = require('./addNewRecurringTransfer')
const login= require('./loginPage')
const deleteRecurring= require('./deleteRecurring')
const { insertHourly } = require('./HourlyJob.js');
// Use the loginRoutes for the root route '/'

app.use("/", operationsRoutes);
app.use("/", sendRoutes);
app.use("/", getRightRecurring);
app.use("/", getSpecificUserRecurringTransfers);
app.use("/", addSpecificUserRecurringTransfers);
app.use("/", login);
app.use("/", deleteRecurring);
// Start the server
app.listen(3001, () => {
  console.log('Server started on port 3001.');
});
cron.schedule('0 * * * *', insertHourly); 