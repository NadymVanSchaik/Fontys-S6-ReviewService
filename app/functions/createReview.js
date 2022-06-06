const Review = require('../models/Review')

function createReview(review){
    const newReview = new Review({
        title: review.title,
        description: review.description,
        rating: review.rating,
        date_added: Date.now(),
        user_id: review.user_id,
        game_id: review.game_id
    });
    return newReview
}
module.exports = createReview;