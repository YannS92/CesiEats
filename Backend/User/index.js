const express = require("express");
var mysql = require('mysql2');
const userRouter = require("./routes/user");


const app = express();
const port = 7000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/user", userRouter); //Calls the routes


app.listen(port, () => {
  console.log("Express server listening on port : " + port);
});