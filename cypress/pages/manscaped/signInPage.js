
class signInPage {
  static inputEmail(email) {
    cy.xpath(`//*[@id='main']//*[@name='email']`).type(email);
  }

  static inutPassword(password) {
    cy.xpath(`//*[@id='main']//*[@name='password']`).type(password);
  }

  static verifyErrorMessageIsDisplayed(error) {
    cy.get(`p:contains['${error}']`).should("be.visble");
  }
}
export default signInPage;
