const testData = require('../testData.json');

function getData(key, title){
    let itTitle = title || (this && (this.currentTest && this.currentTest.title || this.test && this.test.title));
    const testSuites = testData.testSuites;
    let currentTest;

    // support two shapes: { testSuites: { title:..., tests: [...] } } or
    // { testSuites: [ { title, tests: [...] }, ... ] }
    if (Array.isArray(testSuites)) {
        // if title provided, find the test by title across suites
        if (itTitle) {
            for (const suite of testSuites) {
                const tests = suite && suite.tests;
                if (!Array.isArray(tests)) continue;
                currentTest = tests.find(t => t.title === itTitle);
                if (currentTest) break;
            }
        } else {
            // no title provided: find the first test that contains the requested key in its testData
            for (const suite of testSuites) {
                const tests = suite && suite.tests;
                if (!Array.isArray(tests)) continue;
                for (const t of tests) {
                    const td0 = t && t.testData && t.testData[0];
                    if (td0 && Object.prototype.hasOwnProperty.call(td0, key)) {
                        currentTest = t;
                        break;
                    }
                }
                if (currentTest) break;
            }
        }
    } else if (testSuites && testSuites.tests) {
        const tests = testSuites.tests;
        currentTest = tests.find(test => test.title === itTitle);
    }
    if (!currentTest) return undefined;
    return currentTest.testData && currentTest.testData[0] && currentTest.testData[0][key];
}

function getDataForTitle(title, key){
    return getData(key, title);
}

module.exports = { getData, getDataForTitle };