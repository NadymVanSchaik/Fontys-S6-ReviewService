const Comment = require('../models/Comment')

function createComment(comment) {
    const newComment = new Comment({
        description: comment.description,
        date_added: Date.now(),
        user_id: comment.user_id,
        review_id: comment.review_id,
        comment_id: comment.comment_id
    });
    return newComment
}
module.exports = createComment;