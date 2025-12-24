
const request = require('supertest');
const envData = require('../../conf/apps-envs-urls.json');
const env = process.env.ENV || 'dev';
const apiBaseUrl = envData[env].api.url;
const apiHelper = require('./api-helper');
import AllureReporter from '@wdio/allure-reporter';
import apiMain from '../../utils/cheap-flight-main';
let bookingID = null;
describe('Booking App', () => {
    it('To verify the response payload of create booking api', async function () {
        const endpoint = await apiHelper.getEndpoint('createBooking');
        const payload = await apiMain.getData('createBooking');
        const response = await request(apiBaseUrl)
            .post(endpoint)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(payload);
        bookingID = response.body.bookingid;
        await expect(response.status).toBe(200);
        await expect(response.body).toBeDefined();
        await expect(response.body.bookingid).toBeDefined();
        await expect(response.body.booking).toBeDefined();
        await expect(response.body.booking.firstname).toBe(payload.firstname);
        await expect(response.body.booking.lastname).toBe(payload.lastname);
        await expect(response.body.booking.totalprice).toBe(payload.totalprice);
        await expect(response.body.booking.depositpaid).toBe(payload.depositpaid);
        await expect(response.body.booking.bookingdates.checkin).toBe(payload.bookingdates.checkin);
        await expect(response.body.booking.bookingdates.checkout).toBe(payload.bookingdates.checkout);
        await expect(response.body.booking.additionalneeds).toBe(payload.additionalneeds);
        await AllureReporter.addAttachment('Response Body', JSON.stringify(response.body, null, 2), 'application/json');

    })

    it('To verify the response payload of update booking api', async function () {
        const endpointBase = await apiHelper.getEndpoint('getBooking');
        if (!bookingID) throw new Error('bookingID is not set. Ensure create booking test ran and returned a bookingid.');
        const endpoint = `${endpointBase}${bookingID}`;
        const payload = await apiMain.getData('updateBooking');
        //api-chaining
        const authResp = await request(apiBaseUrl)
            .post('/auth')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({ username: 'admin', password: 'password123' });

        const token = authResp.body.token;
        const response = await request(apiBaseUrl)
            .put(endpoint)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Cookie', `token=${token}`)
            .send(payload);
        await expect(response.status).toBe(200);
        await expect(response.body).toBeDefined();
        await expect(response.body.firstname).toBe(payload.firstname);
        await expect(response.body.lastname).toBe(payload.lastname);
        await expect(response.body.totalprice).toBe(payload.totalprice);
        await expect(response.body.depositpaid).toBe(payload.depositpaid);
        await expect(response.body.bookingdates.checkin).toBe(payload.bookingdates.checkin);
        await expect(response.body.bookingdates.checkout).toBe(payload.bookingdates.checkout);
        await expect(response.body.additionalneeds).toBe(payload.additionalneeds);
        await AllureReporter.addAttachment('Response Body', JSON.stringify(response.body, null, 2), 'application/json');

    })
    it('To verify the response payload for get booking api', async function () {
        const endpoint = await apiHelper.getEndpoint('createBooking');
        const response = await request(apiBaseUrl)
            .get(endpoint)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
        await expect(response.status).toBe(200);
        await expect(response.body.length).toBeGreaterThan(0);
        response.body.forEach(booking => async () => {
            await expect(booking.bookingid).toBeDefined();
        });
        await AllureReporter.addAttachment('Response Body', JSON.stringify(response.body, null, 2), 'application/json');
    })

    it('To verify the response payload of update booking api', async function () {
        const endpointBase = await apiHelper.getEndpoint('getBooking');
        if (!bookingID) throw new Error('bookingID is not set. Ensure create booking test ran and returned a bookingid.');
        const endpoint = `${endpointBase}${bookingID}`;
        //api-chaining
        const authResp = await request(apiBaseUrl)
            .post('/auth')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({ username: 'admin', password: 'password123' });

        const token = authResp.body.token;
        const response = await request(apiBaseUrl)
            .delete(endpoint)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Cookie', `token=${token}`)
        await expect(response.status).toBe(201);
        await AllureReporter.addAttachment('Response Body', JSON.stringify(response.body, null, 2), 'application/json');
    })

})

