require("cypress-xpath");
class signInPage {
  static inputEmail(email) {
    cy.xpath(`//*[@id='main']//*[@name='email']`).type(email, {force:true});
  }

  static inutPassword(password) {
    cy.xpath(`//*[@id='main']//*[@name='password']`).type(password);
  }

  static clickSignInBtn() {
    cy.getDataTestId("signInButton").click();
  }
  static verifyErrorMessageIsDisplayed(error) {
    cy.get(`p:contains['${error}']`).should("be.visble");
  }
}
export default signInPage;
