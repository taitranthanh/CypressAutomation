import { When, Then, Given, And } from "cypress-cucumber-preprocessor/steps";
import mainPage from "../../../pages/manscaped/mainPage";
import signInPage from "../../../pages/manscaped/signInPage";
import user from "../../../fixtures/users.json";

Given("User is open url {string}", function (url) {
  mainPage.navigate(url);
});
When("User is navigate to sign in page", () => {
  cy.getByDataId("nav-login-link").click();
});

When("User is input email and password", () => {
  signInPage.inputEmail(user.email);
  signInPage.inutPassword(user.password);
});

And("User is click sign in button", () => {
  signInPage.clickSignInBtn();
});

Then("Validate error message", () => {
  signInPage.verifyErrorMessageIsDisplayed(user.message);
});
