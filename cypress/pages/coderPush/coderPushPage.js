require ("cypress-xpath")

let openMainMenuBtn = "//div[@class='hamburger-react' and @aria-expanded='false']";
let closeMainMenuBtn = "//div[@class='hamburger-react' and @aria-expanded='true']";

class coderPushPage{

openCoderPushWebsite(){
    cy.visit("https://www.coderpush.com/", {timeout: 10000});
    cy.viewport(1920,1080);
    cy.title().should('eq', 'CoderPush - scale your team. nail your dream.');
}

clickToOpenMainMenu(){
    cy.xpath(openMainMenuBtn).click().then( ()=>{
        cy.xpath(closeMainMenuBtn).should('be.visible');
        cy.log("Main menu is opened");
    })
}

clickToCloseMainMenu(){
    cy.xpath(closeMainMenuBtn).click().then( ()=>{
        cy.xpath(openMainMenuBtn).should('be.visible');
        cy.log("Main menu is closed");
    })
}

clickOnMenuTitle(title){
    cy.get("a:contains("+title+")").click();
    cy.log("Menu title "+title+ " is clicked");
}

clickOnWhoWeAreMenu(){
    cy.get('a:contains("Who we are")').click({waitForAnimations:true}).then(()=>{
        cy.url().should('equal','https://www.coderpush.com/#whoweare');
    })
}


verifyWhoWeAreTitleIsDisplayed(){
    cy.wait(10000);
    cy.get('h1', {waitForAnimations:true}).should('be.visible');
    cy.get('#whoweare').find('h1').should('have.text', "Who we are");
}

}
export default coderPushPage;