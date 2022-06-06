const createReview = require('../functions/createReview')

test('test create and save review', () => {
    const newReview = createReview({
        title: "title",
        description: "description",
        rating: 1,
        date_added: Date.now(),
        user_id: "1",
        game_id: "1"
    })
    expect(newReview.title).toBe("title");
    expect(newReview.description).toBe("description");
    expect(newReview.rating).toBe(1);
    expect(newReview.user_id).toBe("1");
    expect(newReview.game_id).toBe("1");
});