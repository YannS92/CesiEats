const mongoose = require('mongoose');

//Connection url to mongodb cluster
const url = 'mongodb+srv://UserPWD:UserPWD@projetlogicieldb.yn1cvxh.mongodb.net/CESIEATS?retryWrites=true';

//Connection to the cluster
async function connect() {
    try {
        await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        console.log("Connection successful");
    } catch (error) {
        console.log("Connection failed", error);
        process.exit(-1);
    }
}

module.exports = { connect, mongoose };
