import {Given, Then, When, And} from "cypress-cucumber-preprocessor/steps"
import MasterPage from "../../pages/booking/MasterPage"
import FlightsPage from "../../pages/booking/Flights/FlightsPage"


const masterPage = new MasterPage();
const flightsPage = new FlightsPage();

Given('Client is accessed to booking page', ()=>{
    masterPage.navigate();
    //masterPage.clickAcceptCookieBtn();
})

And('Client is navigated to login page', ()=>{
    masterPage.navigateToSigninPage();
})

And('Client is clicks continue with email button', ()=>{
    masterPage.clickOnContinueWithEmailBtn();
})

And('Client is selected one-way option', ()=> {
    flightsPage.selectOneWayOption();
})

And('Client is selected multi-city option', ()=>{
    flightsPage.selectMultiCityOption();
})

And('Client is navigated to flights page', ()=>{
    flightsPage.navigateToFightsPage();
    masterPage.clickAcceptCookieBtn();
})

And('Client is clicks on search flight button', ()=>{
    flightsPage.clickOnSearchFlightsBtn();
})

When('Client is input round-trip information for search', ()=>{
    flightsPage.selectAPlaceForWhereFrom("Noi Bai International Airport");
    flightsPage.selectAPlaceForWhereTo("Changi Airport");
    flightsPage.selectFlightStartDate("2022/10/23");
    flightsPage.selectFlightReturnDate("2022/11/08");
})

When('Client is input one-way information for search', (table)=>{
    table.hashes().forEach(row => {
        flightsPage.selectAPlaceForWhereFrom(row.placeFrom);
        flightsPage.selectAPlaceForWhereTo(row.placeTo);
        flightsPage.selectFlightStartDate(row.startDate);
    })
})

When('Client is clicks continue with email button', ()=> {
    masterPage.clickOnContinueWithEmailBtn()
})

When('Client input invalid email address', ()=>{
    masterPage.inputEmail("invalid email")
})

When('Client is clicks on search flight button', ()=>{
    flightsPage.clickOnSearchFlightsBtn();
})

Then('Email is empty error is shows', ()=> {
    masterPage.verifyEmptyEmailErrorMessage
})

Then('Invalid email error is shows', ()=> {
    masterPage.verifyEmailInvalidEmailErrorMessage();
})

Then('Select air port and date require error is show',()=>{
    flightsPage.verifySelectAirportAndDateRequireError();
})

Then('Round-trip searching information is shows', ()=>{
    flightsPage.verifySearchFlightResultIsDisplayed();
})

Then('One-way searching information is shows', ()=>{
    flightsPage.verifySearchFlightResultIsDisplayed();
})
