const dotenv = require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoute = require('./routes/userRoute');
const errrorHandler = require('./middlewares/errorMiddleware');
const cookieParser = require('cookie-parser');

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.get('/', function (req, res) {
    // Cookies that have not been signed
    console.log('Cookies: ', req.cookies)

    // Cookies that have been signed
    console.log('Signed Cookies: ', req.signedCookies)
})

//route middleware
app.use('/user', userRoute);

//routes
// app.get('/', (req, res) => {
//     res.send('Get request');
// })

// error Middleware
app.use(errrorHandler);

//Connect to DB and start server
const PORT = process.env.PORT || 3000;

mongoose
    .connect(process.env.MONGO_URI)
    .then( app.listen(PORT, () => {
            console.log(`Server runing on ${PORT}`);
        })
    )
    .catch((err) => {
        console.log(err);
    })   