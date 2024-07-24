const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

const cors = require('cors');
const corsOptions = { origin: "http://localhost:2000"};
app.use(cors());

require('dotenv').config();

const orderRouter = require('./routes/orderProxy');
const articleRouter = require('./routes/articleProxy');
const menuRouter = require('./routes/menuProxy');
const restaurantRouter = require('./routes/restaurantProxy');
const userRouter = require('./routes/userProxy');

require('./routes/auth')(app);
require('./routes/authUser')(app);

const db = require("./models");
const Role = db.role;

//Test Initialisation, will delete EVERYTHING
/*db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Db');
    initial();
  });*/

db.sequelize.sync();

const PORT = process.env.PORT || 2000;



app.use('/article', articleRouter);
app.use('/menu', menuRouter);
app.use('/order', orderRouter);
app.use('/restaurant', restaurantRouter);
app.use('/user', userRouter);


app.listen(PORT, () => {
    console.log(`API is running on ${PORT}`);
});


//For testing purpose, in order to put the roles in the table
function initial() {
    Role.create({
      id: 1,
      name: "user"
    });
    Role.create({
      id: 2,
      name: "restaurant"
    });
    Role.create({
      id: 3,
      name: "admin"
    });
    Role.create({
        id: 4,
        name: "delivery"
    });
}