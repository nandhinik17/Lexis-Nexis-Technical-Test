class SearchPage {
  get inputSearchBox() {
    return $('//div[contains(@aria-label,"Flight origin input")]//following::input[@aria-label="Origin location"]/.');
  }

  get destinationSearchBox() {
    return $('//div[contains(@aria-label,"Flight destination input")]//*[@aria-label="Destination location"]/.');
  }

  get removeIcon(){
    return $('//div[contains(@aria-label,"Remove value")]');
  }
  get navigationMenu(){
    return $('//div[@aria-label="Close main navigation"]');
  }
  get arrowNextButton(){
    return $('//div[contains(@aria-label,"Next month")]');
  }
  get searchButton(){
    return $('//span[contains(text(),"Search")]');
  }
  get searchPageTitle(){
    return $('//h1[contains(text(),"Explore")]');
  }
  get searchProducts(){
    return $$('//div[contains(@class,"RJ1k RJ1k-mod-products")]');
  }
  exisitingTravellersField(travelersType){
    return $(`//span[contains(text(), '${travelersType}')]//following-sibling::div//input`);
  }
  increamentTravellersButton(travelersType){
    return $(`//span[contains(text(),'${travelersType}')]//following-sibling::div//button[@aria-label="Increment"]`);
  }
  //xpath for dynamic month and date, based on test Data input
  departureMonthField(month) {
    return $(`(//table[@aria-multiselectable="true"])[1]//caption[contains(text(),'${month}')]`);
  }
  departureDateField(month,date) {
    return $(`(//table[@aria-multiselectable="true"])[1]//caption[contains(text(),'${month}')]//following-sibling::tbody//div[contains(normalize-space(),'${date}')]`);
  }
  returnMonthField(month) {
    return $(`(//table[@aria-multiselectable="true"])[2]//caption[contains(text(),'${month}')]`);
  }
  returnDateField(month,date) {
    return $(`(//table[@aria-multiselectable="true"])[2]//caption[contains(text(),'${month}')]//following-sibling::tbody//div[contains(normalize-space(),'${date}')]`);
  }

}
module.exports = new SearchPage();