import { When, Given, And, Then } from "cypress-cucumber-preprocessor/steps";
import mainPage from "../../../pages/manscaped/mainPage";
import productPage from "../../../pages/manscaped/productPage";
import user from "../../../fixtures/example.json";
import signInPage from "../../../pages/manscaped/signInPage";

Given("User is open main page {string}", function(url){
  mainPage.navigate(url);
});

When("User is select product to add", function (productName) {
  productPage.selectProductName(productName);
});

And("User is select size and quantity", function (size, quantity) {
  //select size and quantity
});

Then("Product is added to cart", () => {
  //validation product on cart
});

When("User is navigate to sign in page", () => {
  cy.get
  cy.getByDataId("nav-login-link").click();
});

And("User is input email and password", () => {
  signInPage.inputEmail(user.email);
  signInPage.inutPassword(user.password);
});

Then("Validate error message", () => {
  signInPage.verifyErrorMessageIsDisplayed(user.message);
});
