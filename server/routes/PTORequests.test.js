const app = require('../server');
const supertest = require('supertest');
const PTORequests = require('../models/PTOREQUEST');
const request = supertest(app);

describe('GET PTO request testing', () => {

    test('Gets correct type of task', async () => {
        const res = await request.get('/PTORequests');
        expect(res.body[0].type).toBe('PTORequests');
    });

    test('Gets request by recipient id', async () => {
        const res = await request.get('/PTORequests/userData/625f267aa6aeb39ee40b7aa8');
        expect(res.body.incoming[0].recipient_id).toBe('625f267aa6aeb39ee40b7aa8');
    });

    test('GET correctly handles error incorrect recipient id', async () => {
        const res = await request.get('/PTORequests/userData/123');
        expect(res.status).toBe(404);
    });
});

describe('POST PTO requests testing', () => {
    test('POST correctly posts requests', async () => {
        const res = await request.post('/PTORequests')
            .send({
                type: "PTORequests",
                status: "pending",
                recipient: "Joe Burrow",
                recipient_id: "625f267aa6aeb39ee40b7aa8",
                sender: "Hans Barton",
                sender_id: "623a56e8418b176bfe0c87b6",
                recipient_comments: null,
                sender_comments: "Hi, complete this training please",
                sender_favorited: false,
                recipient_favorited: false,
                pto_start: "2022-05-06",
                pto_end: "2022-05-13"
            });
        expect(res.body.type).toBe("PTORequests");
        expect(res.body.status).toBe("pending");
        expect(res.body.recipient).toBe("Joe Burrow");
        expect(res.body.recipient_id).toBe("625f267aa6aeb39ee40b7aa8");
        expect(res.body.sender).toBe("Hans Barton");
        expect(res.body.sender_id).toBe("623a56e8418b176bfe0c87b6");
        expect(res.body.pto_start).toBe("2022-05-06");
        expect(res.body.pto_end).toBe("2022-05-13");
        expect(res.status).toBe(200);
    });


    test('POST correctly handles error when posting invalid request', async () => {
        const res = await request.post('/PTORequests') 
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

describe('PUT PTO requests testing', () => {
    test('PUT updates correct reqiuests', async () => {
        const res = await request.put('/PTORequests/6272079072f180231a71bd31')
            .send({
                type: "PTORequests",
                status: "inProgress",
                recipient: "Joe Burrow",
                recipient_id: "625f267aa6aeb39ee40b7aa8",
                due_date: "2022-05-06",
                sender: "Hans Barton",
                sender_id: "623a56e8418b176bfe0c87b6",
                recipient_comments: null,
                sender_comments: "Hi, complete this training please",
                sender_favorited: false,
                recipient_favorited: false,
                pto_start: "2022-05-06",
                pto_end: "2022-05-13"
            });
        expect(res.body.type).toBe("PTORequests");
        expect(res.body.status).toBe("inProgress");
        expect(res.body.recipient).toBe("Joe Burrow");
        expect(res.body.recipient_id).toBe("625f267aa6aeb39ee40b7aa8");
        expect(res.body.sender).toBe("Hans Barton");
        expect(res.body.sender_id).toBe("623a56e8418b176bfe0c87b6");
        expect(res.body.pto_start).toBe("2022-05-06");
        expect(res.body.pto_end).toBe("2022-05-13");
        expect(res.status).toBe(200);
    });


    test('PUT correctly handles error when updating invalid PTO request', async () => {
        const res = await request.put('/PTORequests/6272079072f180231a71bd31') 
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
