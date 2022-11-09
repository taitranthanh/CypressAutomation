
class Login{

navigate(){
    cy.visit("https://www.w3schools.com/")
}

openLoginPage(){
    cy.get('#w3loginbtn').click();
}

openHomePage(){
    cy.getByData('home').click();
}

login(userName, passWord){
    cy.get("#modalusername").type(userName)
    cy.get("#current-password").type(passWord)
    cy.getByData("submit").click()
}

inputUsername(userName){
    cy.get("#modalusername").type(userName)
    return this
}

inputPassword(passWord){
    cy.get("#current-password").type(passWord)
    return this
}

clickLoginBtn(){
    cy.get('span:contains("Log in")').click()
    cy.wait(3000)
}

clickLogoutBtn(){
    cy.get('button:contains("Log out")').click()
    cy.wait(3000)
}

validateEmailIsEmptyErrorMessage(){
    cy.get('.EmailInput_email_error__IJxXf').should("have.text", "Please enter an email")
}

validateInvalidEmailErrorMessage(){
    cy.get('div:contains("Looks like you forgot something")').should("exist")
}

validatePasswordIsEmptyErrorMessage(){
    cy.wait(3000);
    cy.get('div:contains("Please enter your password.")').should("exist")
}

validateEmailDoesNotExistErrorMessage(){
    cy.wait(3000);
    cy.get('div:contains("A user with this email does not exist")').should("be.visible")
}


validateIncorrectUsernameAndPasswordErrorMessage(){
    cy.get('div:contains("Make sure you type your email and password correctly. Both your password and email are case-sensitive.")').should("exist")
}

clickAcceptCookie(){
    cy.get('#accept-choices').click()
}


}
export default Login