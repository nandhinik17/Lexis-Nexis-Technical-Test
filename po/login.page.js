const { $ } = require('@wdio/globals');
class LoginPage  {
    get signInButton(){
        return $('//span[contains(text(),"Sign in")]/..');
    }
    get inputUsername() {
        return $('#username');
    }
    get inputPassword() {
        return $('#password');
    }
    get btnSubmit() {
        return $('button[type="submit"]');
    }
    async launchApplication(){
        await browser.url('/');
        await browser.maximizeWindow();
    }
}
module.exports = new LoginPage();
