const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    review_id: {
        type: String,
        required: false
    },
    comment_id: {
        type: String,
        required: false
    },
    like_count: {
        type: Number,
        required: false
    },
    date_added: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Comment', CommentSchema)