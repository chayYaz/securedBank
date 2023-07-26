// app.js
const express = require('express');
const app = express();
const operationsRoutes = require('./serverHomeOperations');
const cors = require('cors');
app.use(express.json());
app.use(cors());
const sendRoutes = require('./serverNewSend')
// Use the loginRoutes for the root route '/'

app.use("/", operationsRoutes);
app.use("/", sendRoutes);
// Start the server
app.listen(3001, () => {
  console.log('Server started on port 3001.');
});