class MasterPage{

navigate(){
    cy.visit("https://www.booking.com/")
}

navigateToSigninPage(){
    cy.get('span:contains("Sign in")').first().click()
    cy.log("Navigate to sign in page")
}

navigateToRegisterPage(){
    cy.get('span:contains("Register")').should('be.visible').click()
    cy.log("Navigate to register page")
}

navigateToListYourPropertyPage(){
    cy.get('span:contains("List your property")').should('be.visible').click()
    cy.log("Navigate to List your property page")
}

inputEmail(email){
    cy.get("#username").should('be.visible').type(email)
    cy.log("Input value for email: "+email)

}

inputPassword(password){
    cy.get('input[placeholder="Please enter your password"').should('be.visible').type(password)
    cy.log("Input password success")
}

clickOnContinueWithEmailBtn(){
    cy.get('span:contains("Continue with email")').should('be.visible').click()
    cy.log("Clicked on continue with email button")
}

clickOnLoginBtn(){
    cy.get('button[type="submit"]').should('be.visible').click()
    cy.log("Click on LOGIN button success")
}

verifyEmptyEmailErrorMessage(){
    cy.get("#username-note").should('have.text', "Enter your email address")
}

verifyEmptyPasswordErrorMessage(){
    cy.get("span:contains('You can't leave this empty')").should('be.visible')
}

verifyEmailInvalidEmailErrorMessage(){
    cy.get("#username-note").should('have.text', "Make sure the email address you entered is correct. ")
}

clickOnTabMenu(tabName){
    cy.once('uncaught:exception', () => false);
    cy.get('span:contains('+tabName+')').should('be.visible').click()
    cy.log("Clicked on Tab name: "+ tabName)

}

clickAcceptCookieBtn(){
    cy.once('uncaught:exception', () => false);
    cy.get('#onetrust-accept-btn-handler').should("be.visible").click()
}


// Define for delete row on postgresDB
deletePersionID(id){
    cy.task("DATABASE", {
        dbConfig: Cypress.env("DB"),
        sql: `DELETE FROM persons WHERE id='${id}'`
      }).then((result) => {
        cy.log("Deleted user id "+id)
      });
}

verifyPersonIdIsDeleted(id){
    cy.task("DATABASE", {
        dbConfig: Cypress.env("DB"),
        sql: `
        SELECT * FROM persons WHERE id=${id}
        `
      }).then((result) => {
        expect(result.rows.length).to.equal(0)
        cy.log("Persion ID " +id + " is  deleted")
      });
}


}
export default MasterPage