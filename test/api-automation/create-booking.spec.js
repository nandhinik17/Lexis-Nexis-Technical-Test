
const request = require('supertest');
const envData = require('../../conf/apps-envs-urls.json');
const env = process.env.ENV || 'dev';
const apiBaseUrl = envData[env].api.url;
const apiHelper = require('./api-helper');
import AllureReporter from '@wdio/allure-reporter';
import apiMain from '../../utils/cheap-flight-main';
const bookingID=null;
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

})

