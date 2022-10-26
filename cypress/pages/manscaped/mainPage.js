
class mainPage {
  // Open URL
  static navigate(url) {
    cy.viewport(1920, 1080);
    cy.visit(url);
  }
}
export default mainPage;
