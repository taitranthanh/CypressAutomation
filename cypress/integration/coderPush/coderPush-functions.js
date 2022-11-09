import {When, And, Given, Then} from "cypress-cucumber-preprocessor/steps"
import coderPushPage from "../../pages/coderPush/coderPushPage"

const coderPush = new coderPushPage();

Given ('User is access to coderPush website', ()=>{
    coderPush.openCoderPushWebsite();
})

When('User is click on {string} menu', (title)=>{
    coderPush.clickToOpenMainMenu();
    coderPush.clickOnWhoWeAreMenu();
})

Then('Who we are page information is displayed', ()=>{
    coderPush.verifyWhoWeAreTitleIsDisplayed();
})