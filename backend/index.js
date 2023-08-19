// import packages =>
const express = require('express');
const cors = require('cors');


// import files =>
require('dotenv').config();
const connectDB = require('./db_config/db');
const authRouter = require('./routes/authRoute');
const authenticateToken = require('./middleware/verifyToken');

// use above package as variables =>

const app = express();

const port = process.env.PORT;


// Middleware =>
app.use(express.json());
app.use(cors());



// Test Api =>
app.get('/test', authenticateToken, (req, res, next) => {
    res.send("Testing");
});



// Actual Apis =>
app.use("/api/auth", authRouter);


// Listening to server =>

/*
// connectDB();
app.listen( (req, res) => {
    connectDB();
    console.log(`Listening on Port - ${port}`);
});
*/

const startServer = async () => {
    try {
        connectDB();
        app.listen(port, () => {
            console.log(`Listening on Port/Server is running on port - ${port}`);
        })
    }
    catch (error) {
        console.log("error =>", error);
    }
}
startServer();




// const PORT = 5000;
// app.listen( PORT, () => console.log(`App is running on - ${PORT}`));
// const port = process.env.PORT || 5000;


/*
const verifyJWT = (req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_KEY, function (err, decode) {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
}
*/