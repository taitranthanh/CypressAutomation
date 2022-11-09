require("cypress-xpath");

const ADD_TO_CART_BTN =
  "//div[@data-state='open']//button[@data-test-btn='add-to-cart']";
const CHECKOUT_BTN = "checkout";

class productPage {
  static mouseOverToOpenProductList() {
    cy.get(".css-cfchfe > .css-13dmto7").trigger("mouseover");
  }

  static selectProductName(productName) {
    cy.xpath(`//p[normalize-space()='${productName}']`).click({ force: true });
  }

  static selectProductSize(size) {
    cy.get[`input[value='${size}']`].click();
  }

  static selectProductQuantity(quantity) {
    cy.xpath(`//div[@data-state='open']//option[@value='${quantity}']`).click();
  }

  static clickAddToCartBtn() {
    cy.xpath(ADD_TO_CART_BTN).scrollIntoView().click();
  }

  static clickCheckOutBtn() {
    cy.getByDataTestId(CHECKOUT_BTN).click();
  }
}
export default productPage;
