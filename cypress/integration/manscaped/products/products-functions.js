import { When, Given, And, Then } from "cypress-cucumber-preprocessor/steps";
import mainPage from "../../pages/manscaped/mainPage";
import productPage from "../../../pages/manscaped/productPage";

Given("User is open main page", () => {
  mainPage.navigate();
});

When("User is select product {productName}", function (productName) {
  productPage.selectProductName(productName);
});

And("User is select size {size} and quantity {quantity}", function (
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
