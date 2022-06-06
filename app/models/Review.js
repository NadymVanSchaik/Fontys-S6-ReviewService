const mongoose = require('mongoose')

const ReviewSchema = mongoose.Schema({
    title: String,
    description: String,
    rating: Number,
    date_added: Date,
    user_id: String,
    game_id: String,
})

module.exports = mongoose.model('Review', ReviewSchema)