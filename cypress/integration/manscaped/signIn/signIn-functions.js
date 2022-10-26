import { When, Then, Given, And } from "cypress-cucumber-preprocessor/steps";
import mainPage from "../../../pages/manscaped/mainPage";
import signInPage from "../../../pages/manscaped/signInPage";
import user from "../../../fixtures/example.json";

Given("User is open url {string}", function (url) {
  mainPage.navigate(url);
});
When("User is navigate to sign in page", () => {
  cy.getByDataId("nav-login-link").click();
});

And("User is input email and password", () => {
  signInPage.inputEmail(user.email);
  signInPage.inutPassword(user.password);
});

Then("Validate error message", () => {
  signInPage.verifyErrorMessageIsDisplayed(user.message);
});
