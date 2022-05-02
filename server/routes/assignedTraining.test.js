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

    test('Correctly handles error incorrect recipient id', async () => {
        const res = await request.get('/assignedTrainings/userData/123');
        expect(res.status).toBe(404);
    });

});