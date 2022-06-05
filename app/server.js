const express = require('express');
const cors = require('cors');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
const mongoose = require('mongoose')
require('dotenv/config')

const config = {
    name: 'review-service',
    port: 3001,
    host: '0.0.0.0',
};

const app = express();
app.listen(config.port, () => {console.log("Server started and listing on ${config.port}")});
const logger = log({ console: true, file: false, label: config.name });


app.use(cors());
app.use(ExpressAPILogMiddleware(logger, { request: true }));

//Import
const reviewRoute = require('./routes/reviews');
app.use('/reviews', reviewRoute);

const commentRoute = require('./routes/comments');
app.use('/comments', commentRoute);


//Routes
app.get('/', (req, res) => {
    res.send('we are on home');
})


//Connect to DB
//Connect to DB
mongoose.connect(process.env.DB_CONNECTION) 
.then(() =>{
    console.log("connected to DB");
})
.catch(err => {
    console.log(err)
})