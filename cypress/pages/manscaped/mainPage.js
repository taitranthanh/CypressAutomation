class mainPage {
  // Open URL
  static navigate(url) {
    cy.viewport(1920, 1080);
    cy.visit(url, { timeout: 100000 });
  }
}
export default mainPage;
