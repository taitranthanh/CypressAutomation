class Tutorials{

inputValueToSearchTutorials(value){
cy.get('#search2').type(value)
return this
}

clickSearchTutorialBtn(){
    cy.get('#learntocode_searchbtn').click()
    cy.wait(3000)
}

clickTutorialNavBtn(){
    cy.get('#navbtn_tutorials').click()
}

verifyTutorialTitleIsDisplayed(){
    cy.get('b:contains("Tutorials")').should('exist')
}

clickOnTutorialsCourseName(courseName){
cy.contains(courseName).click()
}

}

export default Tutorials