const express = require('express');
const router = express.Router();
const Review = require('../models/Review')
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var jsonParser = bodyParser.json();

router.get('/all', (req, res) => {
    res.send('get all reviews');
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


module.exports = router;