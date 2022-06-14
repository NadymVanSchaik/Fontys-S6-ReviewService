const express = require('express');
const router = express.Router();
const Review = require('../models/Review')
const app = express();
const bodyParser = require('body-parser');
const createReview = require('../functions/createReview');


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var jsonParser = bodyParser.json();

var amqplib = require('amqplib/callback_api');
const amqpUrl = process.env.AMQP_URL;

//Get all reviews
router.get('/all', async (req, res) => {
    try{
        const reviews = await Review.find();
        res.json(reviews);
    } catch(err) {
        res.json({message: err})
    }
});

async function receiveMessage() {
    queueName = "getAllGames"
    console.log("queueName", queueName)
    console.log("AMQP url: ", amqpUrl)

    amqplib.connect(amqpUrl, async function(error0, connection) {
        console.log("start connecting")
        if (error0) {
            console.log("error0", error0)
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }
            channel.assertQueue(queueName, {
                durable: false
            });

            channel.prefetch(1)

            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queueName);
            channel.consume(queueName, function reply(msg) {
                console.log(msg.content.toString())
                console.log("GOT MESSAGE")
                console.log(Date.now());
                console.log(msg)
                if (JSON.parse(msg.content.toString()).value == "getAllGames" &&
                        JSON.parse(msg.content.toString()).id == "server-command") {
                    console.log(msg)
                    console.log(" [x] Received %s", msg.content.toString());
                    console.log("correlation id: ",msg.properties.correlationId)
                    console.log("reply to: ", msg.properties.replyTo)
                    console.log("I AM CURRENTLY PARSING MAGIC")
                    
                    var r = Math.random().toString()
                    r = JSON.stringify({ value: r, id:"games-response" })

                    console.log(" Sending back ", r)
                    console.log(Date.now());

                    channel.sendToQueue(JSON.parse(msg.content.toString()).replyTo, 
                        Buffer.from(r.toString()), {
                        correlationId: msg.properties.correlationId
                    });

                    channel.ack(msg);
                }
            });
        });
    })
}

//Get review by its ID
router.get('/getById/:id', async (req, res, next) => {
    try{
        const review = await Review.findById(req.params.id).exec();
        res.json(review)
    } catch(err){
        res.json({message: err});
    }
});

//Get reviews from user
router.get('/user/:id', async (req, res, next) => {
    try{
        const reviewsFromUser = await Review.find({user_id: req.params.id}).exec();
        res.json(reviewsFromUser)
    } catch(err){
        res.json({message: err});
    }
});

//Get reviews from game
router.get('/game/:id', async (req, res, next) => {
    try{
        const reviewsFromGame = await Review.find({game_id: req.params.id}).exec();
        res.json(reviewsFromGame)
    } catch(err){
        res.json({message: err});
    }
});
  
//Post a review
router.post('/', jsonParser, (req, res) => {
    createReview(req.body).save()
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.json({message: err})
    })
})

//Delete a review
router.delete('/:id', async (req, res) => {
    try {
        const removedReview = await Review.remove({_id: req.params.id});
        res.json(removedReview)
    } catch(err) {
        res.json({message: err})
    }
})

// Update a review
router.patch('/:id', jsonParser, async (req, res) => {
    try {
        const updatedReview = await Review.updateOne(
            {_id: req.params.id},
            {$set: {
                title: req.body.title,
                description: req.body.description,
                rating: req.body.rating,
            }}
        );
        res.json(updatedReview)
    } catch(err) {
        console.log(err)
        res.json({message: err})
    }
})

receiveMessage();
module.exports = router;
