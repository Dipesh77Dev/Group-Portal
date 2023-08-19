const mongoose = require('mongoose');

const url = process.env.Mongo_URI;

const connectDB = () => {
    try {
        mongoose.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        console.log(`Database Connection succesfully done...`);
    }
    catch (err) {
        console.log(`Connection failed to Database - ${err.message}`);
    }
}

module.exports = connectDB;

