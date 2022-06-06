const createComment = require('../functions/createComment')

test('test create and save review', () => {
    const newComment = createComment({
        description: "description",
        date_added: Date.now(),
        user_id: "1",
        review_id: "1",
        comment_id: "1"
    })
    expect(newComment.description).toBe("description");
    expect(newComment.comment_id).toBe("1");
    expect(newComment.user_id).toBe("1");
    expect(newComment.review_id).toBe("1");
});