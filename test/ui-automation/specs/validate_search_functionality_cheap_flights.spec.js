
import AllureReporter from '@wdio/allure-reporter';
import cheapFlightMain from '../../../utils/cheap-flight-main';


describe('Cheap Flights Search', () => {
    it('To verify the search origin and destination functionality in cheap flights', async function() {
        await cheapFlightMain.loginPage.launchApplication();
        await expect(await cheapFlightMain.isDisplayed(cheapFlightMain.loginPage.signInButton)).toBe(true);
        const expectedSignText = await cheapFlightMain.getData('signText');
        await expect(await cheapFlightMain.getText(cheapFlightMain.loginPage.signInButton)).toBe(expectedSignText);
        await cheapFlightMain.clearAndEnterValue(cheapFlightMain.searchPage.inputSearchBox, await cheapFlightMain.getData('originCity'));
        await cheapFlightMain.clearAndEnterValue(cheapFlightMain.searchPage.destinationSearchBox, await cheapFlightMain.getData('destinationCity'));
    })

    it('To verify selecting departure date and Return date functionality', async function() {
        const departureMonth = await cheapFlightMain.getData('departureDateAndMonth');
        console.log('Departure Month:', departureMonth);
        while (!(await cheapFlightMain.isDisplayed(cheapFlightMain.searchPage.departureMonthField(departureMonth)))) {
            await cheapFlightMain.clickElement(cheapFlightMain.searchPage.arrowNextButton);
        }
        await cheapFlightMain.clickElement(cheapFlightMain.searchPage.departureDateField(departureMonth, await cheapFlightMain.getData('departureDate')));
        
        const returnMonth = await cheapFlightMain.getData('returnDateAndMonth');
        console.log('Return Month:', returnMonth);
        while (!(await cheapFlightMain.isDisplayed(cheapFlightMain.searchPage.returnMonthField(returnMonth)))) {
            await cheapFlightMain.clickElement(cheapFlightMain.searchPage.arrowNextButton);
        }
        await cheapFlightMain.clickElement(cheapFlightMain.searchPage.returnDateField(returnMonth, await cheapFlightMain.getData('returnDate')));
       
        //select traveller type and num
        const travelersType = await cheapFlightMain.getData('travelersType');
        const numberOfTravelers = await cheapFlightMain.getData('numberOfTravelers');
        let currentTravelers = await cheapFlightMain.getText(cheapFlightMain.searchPage.exisitingTravellersField(travelersType));
        while (parseInt(currentTravelers) < parseInt(numberOfTravelers)) {
            await cheapFlightMain.clickElement(cheapFlightMain.searchPage.increamentTravellersButton(travelersType));
            currentTravelers = await cheapFlightMain.getText(cheapFlightMain.searchPage.exisitingTravellersField(travelersType));
        }
    })

    it('To verify search results page', async function() {
        await cheapFlightMain.clickElement(cheapFlightMain.searchPage.searchButton);
        const expectedTitle = await cheapFlightMain.getData('searchResultsPageTitle');
        await expect(await cheapFlightMain.getText(cheapFlightMain.searchPage.searchPageTitle)).toContain(expectedTitle);
        const searchResultsCount = await cheapFlightMain.searchPage.searchProducts.length;
        console.log('Number of search results:', searchResultsCount);
        await expect(searchResultsCount).toBeGreaterThan(0);
        await AllureReporter.addAttachment('Search Results Count', `Number of search results: ${searchResultsCount}`, 'text/plain');
})
})

