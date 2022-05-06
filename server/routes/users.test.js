const app = require('../server');
const supertest = require('supertest');
const request = supertest(app);

describe('GET users tests', () => {

    test('Gets particular user by user id', async () => {
        const res = await request.get('/users/6269b3cc0a12d2fd36579b1e');
        expect(res.body._id).toBe('6269b3cc0a12d2fd36579b1e');
    });

    test('GET correctly handles error incorrect id', async () => {
        const res = await request.get('/users/123');
        expect(res.status).toBe(404);
    });
});

describe('POST users testing', () => {
    test('POST correctly adds user', async () => {
        const res = await request.post('/users')
            .send({
                user_type:"Employee",
                password:"ILoveTesting",
                first_name:"Midnight",
                last_name:"LastDay",
                email:"Midnight_LastDay@atlastechnology.com",
                company_id:"6267230829c9494013400be1",
                manager_id:null,
                company_name:"Atlas Technology",
                position_title:"Software Engineer II",
                start_date:"2001-04-29T05:00:00.000Z",
                createdAt:"2022-05-27T21:21:16.520Z",
                updatedAt:"2022-05-27T21:21:16.520Z",
            });
        expect(res.body.user_type).toBe("Employee");
        expect(res.body.first_name).toBe("Midnight");
        expect(res.body.last_name).toBe("LastDay");
        expect(res.body.company_id).toBe("6267230829c9494013400be1");
        expect(res.body.manager_id).toBe(null);
        expect(res.body.position_title).toBe("Software Engineer II");
        expect(res.status).toBe(200);
    });

 });


describe('PUT user testing', () => {
    test('PUT updates correct user', async () => {

        const res = await request.post('/users')
            .send({
                user_type:"Employee",
                password:"ILoveTesting",
                first_name:"Middlenight",
                last_name:"LastDay",
                email:"Midnight_LastDay@atlastechnology.com",
                company_id:"6267230829c9494013400be1",
                manager_id:null,
                company_name:"Atlas Technology",
                position_title:"Software Engineer II",
                start_date:"2001-04-29T05:00:00.000Z",
                createdAt:"2022-05-27T21:21:16.520Z",
                updatedAt:"2022-05-27T21:21:16.520Z",
            });
        expect(res.body.user_type).toBe("Employee");
        expect(res.body.first_name).toBe("Middlenight");
        expect(res.body.last_name).toBe("LastDay");
        expect(res.body.company_id).toBe("6267230829c9494013400be1");
        expect(res.body.manager_id).toBe(null);
        expect(res.body.position_title).toBe("Software Engineer II");
        expect(res.status).toBe(200);
    });

});