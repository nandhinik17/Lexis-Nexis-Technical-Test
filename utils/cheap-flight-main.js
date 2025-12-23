
const loginPage = require('../po/login.page');
const testDataHelper = require('./testData-helper');
const searchPage = require('../po/search.page');

class CheapFlightUtils {
    constructor() {
        this.loginPage = loginPage;
        this.searchPage = searchPage;
    }

    getData(key) {
        const title = global && global.__CURRENT_TEST_TITLE__;
        return testDataHelper.getData(key, title);
    }

    async isDisplayed(element) {
        try {
            await element.waitForDisplayed({ timeout: 10000, timeoutMsg: 'Element not displayed after 10s' });
            return element.isDisplayed();
        } catch (error) {
            return false;
        }

    }
    async getText(element) {
        await element.waitForDisplayed({ timeout: 20000, timeoutMsg: 'Element not displayed after 20s' });
        if (await element.getText() === null) {
            throw new Error('Element text is null');
        }
        return element.getText();
    }

    async clearAndEnterValue(element, value) {
        await element.waitForDisplayed({ timeout: 20000, timeoutMsg: 'Element not displayed after 20s' });
        await element.click();
        await browser.keys('Backspace');
        await browser.keys(value);
        await browser.pause(5000);
        await browser.keys('Enter');
    }

    async clickElement(element) {
        await element.waitForDisplayed({ timeout: 20000, timeoutMsg: 'Element not displayed after 20s' });
        await element.waitForClickable({ timeout: 20000, timeoutMsg: 'Element not clickable after 20s' });
        await element.click();
    }


}

const instance = new CheapFlightUtils();
module.exports = instance;
module.exports.default = instance;


