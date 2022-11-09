class mainPage {
  // Open URL
  static navigate(url) {
    cy.clearCookies();
    cy.viewport(1920, 1080);
    cy.visit(url, { timeout: 10000 });
    cy.getDataTestId('close-modal-button', { timeout: 10000 }).click();
  }
}
export default mainPage;
