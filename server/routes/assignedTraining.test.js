const app = require('../server');
const supertest = require('supertest');
const AssignedTraining = require('../models/ASSIGNEDTRAINING');
const request = supertest(app);

describe('GET assigned trainings testing', () => {

    test('Gets correct type of task', async () => {
        const res = await request.get('/assignedTrainings');
        expect(res.body[0].type).toBe('assignedTraining');
    });

    test('Gets training by recipient id', async () => {
        const res = await request.get('/assignedTrainings/userData/625f267aa6aeb39ee40b7aa8');
        expect(res.body.incoming[0].recipient_id).toBe('625f267aa6aeb39ee40b7aa8');
    });

    test('GET correctly handles error incorrect recipient id', async () => {
        const res = await request.get('/assignedTrainings/userData/123');
        expect(res.status).toBe(404);
    });
});

describe('POST assigned trainings testing', () => {
    test('POST correctly posts training', async () => {
        const res = await request.post('/assignedTrainings')
            .send({
                type: "assignedTraining",
                status: "pending",
                recipient: "Joe Burrow",
                recipient_id: "625f267aa6aeb39ee40b7aa8",
                sender: "Hans Barton",
                sender_id: "623a56e8418b176bfe0c87b6",
                due_date: "2022-05-06",
                recipient_comments: null,
                sender_comments: "Hi, complete this training please",
                training: "https://www.google.com/",
                is_completed: false,
                sender_favorited: false,
                recipient_favorited: false
            });
        expect(res.body.type).toBe("assignedTraining");
        expect(res.body.status).toBe("pending");
        expect(res.body.recipient).toBe("Joe Burrow");
        expect(res.body.recipient_id).toBe("625f267aa6aeb39ee40b7aa8");
        expect(res.body.sender).toBe("Hans Barton");
        expect(res.body.sender_id).toBe("623a56e8418b176bfe0c87b6");
        expect(res.body.training).toBe("https://www.google.com/");
        expect(res.status).toBe(200);
    });


    test('POST correctly handles error when posting invalid assigned training', async () => {
        const res = await request.post('/assignedTrainings') 
            .send({
                type: "PTORequests",
                recipient: "John Cena",
                recipient_id: "youcantseeme123",
                sender: "Randy Orton",
                sender_id: "rko",
            });
        expect(res.status).toBe(422);
    });
});

describe('PUT assigned trainings testing', () => {
    test('PUT updates correct training', async () => {
        const res = await request.put('/assignedTrainings/6272079072f180231a71bd31')
            .send({
                type: "assignedTraining",
                status: "inProgress",
                recipient: "Joe Burrow",
                recipient_id: "625f267aa6aeb39ee40b7aa8",
                sender: "Hans Barton",
                sender_id: "623a56e8418b176bfe0c87b6",
                due_date: "2022-05-06",
                recipient_comments: null,
                sender_comments: "Hi, complete this training please",
                training: "https://www.google.com/",
                is_completed: false,
                sender_favorited: false,
                recipient_favorited: false
            });
        expect(res.body.type).toBe("assignedTraining");
        expect(res.body.status).toBe("inProgress");
        expect(res.body.recipient).toBe("Joe Burrow");
        expect(res.body.recipient_id).toBe("625f267aa6aeb39ee40b7aa8");
        expect(res.body.sender).toBe("Hans Barton");
        expect(res.body.sender_id).toBe("623a56e8418b176bfe0c87b6");
        expect(res.body.training).toBe("https://www.google.com/");
        expect(res.status).toBe(200);
    });


    test('PUT correctly handles error when updating invalid assigned training', async () => {
        const res = await request.put('/assignedTrainings/6272079072f180231a71bd31') 
            .send({
                type: "PTORequests",
                status: "done",
                recipient: "John Cena",
                recipient_id: "youcantseeme123",
                sender: "Randy Orton",
                sender_id: "rko",
            });
        expect(res.status).toBe(422);
    });
});
