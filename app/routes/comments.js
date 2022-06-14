const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment')
const app = express();
const bodyParser = require('body-parser');
const createComment = require('../functions/createComment');


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var jsonParser = bodyParser.json();

//Get all comments 
router.get('/all', async (req, res) => {
    try{
        const comments = await Comment.find();
        res.json(comments);
    } catch(err) {
        res.json({message: err})
    }
});

//Get comments from review
router.get('/review/:id', async (req, res) => {
    try{
        const commentsFromReview = await Comment.find({"review_id": req.params.id}).exec();
        res.json(commentsFromReview)
    } catch(err){
        res.json({message: err});
    }
});

//Get comment by its ID
router.get('/getById/:id', async (req, res, next) => {
    try{
        const comment = await Comment.findById(req.params.id).exec();
        res.json(comment)
    } catch(err){
        res.json({message: err});
    }
});

//Delete a comment
router.delete('/:id', async (req, res) => {
    try {
        const removedComment = await Comment.remove({_id: req.params.id});
        res.json(removedComment)
    } catch(err) {
        res.json({message: err})
    }
})

// Update a comments
router.patch('/:id', jsonParser, async (req, res) => {
    try {
        const updatedComment = await Comment.updateOne(
            {_id: req.params.id},
            {$set: {
                description: req.body.description,
            }}
        );
        res.json(updatedComment)
    } catch(err) {
        res.json({message: err})
    }
})

//Post a comment
router.post('/', jsonParser, (req, res) => {
    createComment(req.body).save()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json({message: err})
        })
})

//Like a comment
router.patch('/like/:id', jsonParser, async (req, res) => {
    try {
        const updatedComment = await Comment.updateOne(
            {_id: req.params.id},
            {$set: {
                like_count: req.body.like_count,
            }}
        );
        res.json(updatedComment)
    } catch(err) {
        res.json({message: err})
    }
})

//Get all sub-comments
router.get('/subComments/:id', async (req, res) => {
    try{
        const comment = await Comment.find({comment_id: req.params.id}).exec();
        res.json(comment)
    } catch(err){
        console.log(err)
        res.json({message: err});
    }
});

module.exports = router;