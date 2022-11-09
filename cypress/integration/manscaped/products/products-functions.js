import { When, Given, And, Then } from "cypress-cucumber-preprocessor/steps";
import mainPage from "../../../pages/manscaped/mainPage";
import productPage from "../../../pages/manscaped/productPage";

Given('User is open url {string}', function(url){
  mainPage.navigate(url);
});

When("User is select product {string}", function (productName) {
  productPage.selectProductName(productName);
});

And("User is select size {string} and quantity {string}", function (
  size,
  quantity
) {
  productPage.selectProductSize(size);
  productPage.selectProductQuantity(quantity);
});

And("User is click add to cart button", () => {
  productPage.clickAddToCartBtn();
});

Then("Product is added to cart", (table) => {
  cy.get('contains("JUST ADDED TO YOUR CART")').should("be.visible");
  table.hashes().forEach((row) => {
    cy.get("h3").contains(`${row.productName}`);
  });
  //validation product on cart
});

When("User is select set product", (table) => {
  table.hashes().forEach((row) => {
    productPage.mouseOverToOpenProductList();
    productPage.selectProductName(row.productName);
  });
});

And("User is select quantity {string}", function (quantity) {
  productPage.selectProductQuantity(quantity);
});

Then("Product {string} is added to cart", function (productName) {
  cy.get('contains("JUST ADDED TO YOUR CART")').should("be.visible");
  cy.get("h3").contains(`${productName}`);
});
