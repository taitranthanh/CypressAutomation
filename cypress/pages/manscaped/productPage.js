
require("cypress-xpath");

class productPage {
  static mouseOverToOpenProductList() {
    cy.get(".css-cfchfe > .css-13dmto7").trigger("mouseover");
  }

  static selectProductName(productName) {
    cy.xpath(`//p[normalize-space()='${productName}']`).click({ force: true });
  }
}
export default productPage;
