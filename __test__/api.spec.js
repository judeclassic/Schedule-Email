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
            id: '111111111111111',
            email:  'judexa24@gmail.com',
            name: 'Jude Classic',
            template: 'https://lovely-twilight-c0df91.netlify.app/email-11.html',
            position: 'software developer',
            time: '2m',
            subject: 'Update your profile'
        });

        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(true);
    });

    it('cancel schedule', async () => {
        const res = await request(app)
        .post('/v1/api/schedule/cancel')
        .send({
            id: '111111111111111',
        });

        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(true);
        expect(5).toEqual(5);
    })

})