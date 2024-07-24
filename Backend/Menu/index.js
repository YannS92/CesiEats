const express = require("express");
const mongoose = require('mongoose');
const menuRouter = require("./routes/menu");
const { connect } = require("./database/menu")

const app = express();
const port = 5000;

app.use(express.json());
connect(); //Connect to mongodb

app.use("/menu", menuRouter); //Calls the routes

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