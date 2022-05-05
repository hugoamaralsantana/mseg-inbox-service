const app = require('../server');
const supertest = require('supertest');
const PerformanceReview = require('../models/PERFORMANCEREVIEW');
const request = supertest(app);

describe('GET PerformanceReview testing', () => {

    test('Gets correct type of task', async () => {
        const res = await request.get('/PerformanceReview');
        expect(res.body[0].type).toBe('PerformanceReview');
    });

    test('Gets review by recipient id', async () => {
        const res = await request.get('/PerformanceReview/userData/625f267aa6aeb39ee40b7aa8');
        expect(res.body.incoming[0].recipient_id).toBe('625f267aa6aeb39ee40b7aa8');
    });

    test('GET correctly handles error incorrect recipient id', async () => {
        const res = await request.get('/PerformanceReview/userData/123');
        expect(res.status).toBe(404);
    });
});

describe('POST PerformanceReview testing', () => {
    test('POST correctly posts reviews', async () => {
        const res = await request.post('/PerformanceReview')
            .send({
                type: "PerformanceReview",
                status: "pending",
                recipient: "Joe Burrow",
                recipient_id: "625f267aa6aeb39ee40b7aa8",
                sender: "Hans Barton",
                sender_id: "623a56e8418b176bfe0c87b6",
                recipient_comments: null,
                sender_comments: "Hi, complete this training please",
                sender_favorited: false,
                recipient_favorited: false,
            });
        expect(res.body.type).toBe("PerformanceReview");
        expect(res.body.status).toBe("pending");
        expect(res.body.recipient).toBe("Joe Burrow");
        expect(res.body.recipient_id).toBe("625f267aa6aeb39ee40b7aa8");
        expect(res.body.sender).toBe("Hans Barton");
        expect(res.body.sender_id).toBe("623a56e8418b176bfe0c87b6");
        expect(res.status).toBe(200);
    });


    test('POST correctly handles error when posting invalid review', async () => {
        const res = await request.post('/PerformanceReview') 
            .send({
                type: "assignedTrainings",
                recipient: "John Cena",
                recipient_id: "youcantseeme123",
                sender: "Randy Orton",
                sender_id: "rko",
            });
        expect(res.status).toBe(422);
    });
});

describe('PUT PTO review testing', () => {
    test('PUT updates correct reviews', async () => {
        const res = await request.put('/PerformanceReview/6272079072f180231a71bd31')
            .send({
                type: "PerformanceReview",
                status: "inProgress",
                recipient: "Joe Burrow",
                recipient_id: "625f267aa6aeb39ee40b7aa8",
                sender: "Hans Barton",
                sender_id: "623a56e8418b176bfe0c87b6",
                due_date: "2022-05-06",
                recipient_comments: null,
                sender_comments: "Hi, complete this training please",
                sender_favorited: false,
                recipient_favorited: false,
                growth_score: 5,
                growth_comments: "grow up",
                kindness_score: 5,
                kindness_comments: "Be kind",
                delivery_score: 5,
                delivery_comments: "so bad",
            });
        expect(res.body.type).toBe("PerformanceReview");
        expect(res.body.status).toBe("inProgress");
        expect(res.body.recipient).toBe("Joe Burrow");
        expect(res.body.recipient_id).toBe("625f267aa6aeb39ee40b7aa8");
        expect(res.body.sender).toBe("Hans Barton");
        expect(res.body.sender_id).toBe("623a56e8418b176bfe0c87b6");
        expect(res.body.growth_score).toBe(5);
        expect(res.body.growth_comments).toBe("grow up");
        expect(res.body.kindness_score).toBe(5);
        expect(res.body.kindness_comments).toBe("Be kind")
        expect(res.body.delivery_score).toBe(5);
        expect(res.body.delivery_comments).toBe("so bad")
        expect(res.status).toBe(200);
    });


    test('PUT correctly handles error when updating invalid PerformanceReview', async () => {
        const res = await request.put('/PerformanceReview/6272079072f180231a71bd31') 
            .send({
                type: "assignedTrainings",
                status: "done",
                recipient: "John Cena",
                recipient_id: "youcantseeme123",
                sender: "Randy Orton",
                sender_id: "rko",
            });
        expect(res.status).toBe(422);
    });
});
