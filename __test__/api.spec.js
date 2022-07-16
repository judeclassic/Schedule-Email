const request = require('supertest');
const {app, server} = require('../index');

describe('Checking Endpoints Of API', () => {

     afterEach(async () => {
         app.disable();
         server.close();
     })

    it('schedule an email', async () => {
        const res = await request(app)
        .post('/v1/api/schedule/set')
        .send({
            email: 'judexa24@gmail.com',
            id: '1234454545t',
            name: 'Jude Classic',
            position: 'Software Enginer',
            time: '2s',
            subject: 'start a class now',
            template: 'acceptance'
        });

        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(true);
    });

    it('cancel schedule', async () => {
        const res = await request(app)
        .post('/v1/api/schedule/cancel')
        .send({
            id: '1234454545t',
        });

        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(true);
        expect(5).toEqual(5);
    })

})