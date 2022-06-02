const express = require('express');
const router = express.Router();
const Review = require('../models/Review')
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var jsonParser = bodyParser.json();

//Get all reviews
router.get('/all', async (req, res) => {
    try{
        const reviews = await Review.find();
        res.json(reviews);
    } catch(err) {
        res.json({message: err})
    }
});

//Get review by its ID
router.get('/:id', async (req, res, next) => {
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
router.get('/user/:id', async (req, res, next) => {
    try{
        const reviewsFromGame = await Review.find({game_id: req.params.id}).exec();
        res.json(reviewsFromGame)
    } catch(err){
        res.json({message: err});
    }
});
  
//Post a review
router.post('/', jsonParser, (req, res) => {
    console.log(req.body);
    const review = new Review({
        title: req.body.title,
        description: req.body.description,
        rating: req.body.rating,
        date_added: Date.now(),
        user_id: req.body.user_id,
        game_id: req.body.game_id
    });
    game.save()
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
router.patch('/:id', async (req, res) => {
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
        res.json({message: err})
    }
})
module.exports = router;