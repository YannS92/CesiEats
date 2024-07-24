const express = require("express");
const mongoose = require('mongoose');
const orderRouter = require("./routes/orders");
const { connect } = require("./database/connect")

const app = express();
const port = 3000;

app.use(express.json());

connect(); //Connect to mongodb

app.use("/order", orderRouter); //Calls the routes

//Close the connection with MongoDB once the app is shutdown
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

app.listen(port, () => {
  console.log("Express server listening on port : " + port);
});
