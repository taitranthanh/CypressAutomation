import Login from "../pages/Login";
import Tutorials from "../pages/Tutorials";

describe("Cypress Automation Test for W3School", function () {
  const login = new Login();
  const tutorials = new Tutorials();

  beforeEach(function () {
    login.navigate();
    login.clickAcceptCookie();
  });

  context("Validation Login Fuctionality", function () {
    it("TC01: Verify could not login without username and password", function () {
      login.openLoginPage();
      login.clickLoginBtn();
      login.validateEmailIsEmptyErrorMessage();
    });

    it("TC02: Verify could not login with invalid emaill", function () {
      login.openLoginPage();
      login.inputUsername("testing");
      login.clickLoginBtn();
      login.validateInvalidEmailErrorMessage();
    });

    it("TC03: Verify could not login with password is empty", function () {
      login.openLoginPage();
      login.inputUsername("thanhtai@gmail.com");
      login.clickLoginBtn();
      login.validatePasswordIsEmptyErrorMessage();
    });

    it("TC04: Verify could not login with missing password", function () {
      login.openLoginPage();
      login.inputUsername("tthanhtaicntt@gmail.com");
      login.clickLoginBtn();
      login.validateIncorrectUsernameAndPasswordErrorMessage();
    });

    it("TC05: Verify could not login with incorrect username and password", function () {
      login.openLoginPage();
      login.inputUsername("tthanhtaicntt@gmail.com");
      login.inputPassword("123456");
      login.clickLoginBtn();
      login.validateIncorrectUsernameAndPasswordErrorMessage();
    });

    it("TC06: Verify able to login with correct user", function () {
      login.openLoginPage();
      login.inputUsername("tthanhtaicntt@gmail.com");
      login.inputPassword("12345678x@X");
      login.clickLoginBtn();
      cy.url().should("eq", "https://my-learning.w3schools.com/");
      login.clickLogoutBtn();
    });
  });

  context("Validation navigate to tutorials", function () {
    it("TC07: Verify search for CSS Selectors Reference from Nav bar", function () {
      tutorials.inputValueToSearchTutorials("CSS Selectors Reference");
      tutorials.clickSearchTutorialBtn();
      // Verify search result
      cy.get(".gs-webResult")
        .find("b")
        .eq("0")
        .contains("CSS Selectors Reference")
        .should("be.visible");
    });

    it("TC08: Verify navigate to HTML & CSS Course", function () {
      tutorials.clickTutorialNavBtn();
      tutorials.verifyTutorialTitleIsDisplayed();
      tutorials.clickOnTutorialsCourseName("Learn HTML");
      // Verify result
      cy.get("h2:contains('HTML Examples')").should("be.visible");
      cy.get("h2:contains('HTML Quiz Test')").should("be.visible");

      tutorials.clickTutorialNavBtn();
      tutorials.verifyTutorialTitleIsDisplayed();
      tutorials.clickOnTutorialsCourseName("Learn Colors");
      cy.get("h2:contains('Color Names')").should("be.visible");
      cy.get("h2:contains('CSS Color Values')").should("be.visible");
    });

    it("TC09: Verify navigate to Java Script Course", function () {
      tutorials.clickTutorialNavBtn();
      tutorials.verifyTutorialTitleIsDisplayed();
      tutorials.clickOnTutorialsCourseName("Learn JavaScript");
      // Verify result
      cy.get("h2:contains('Examples in Each Chapter')").should("be.visible");
      cy.get("h2:contains('Learn by Examples')").should("be.visible");

      tutorials.clickTutorialNavBtn();
      tutorials.verifyTutorialTitleIsDisplayed();
      tutorials.clickOnTutorialsCourseName("Learn AppML");
      cy.get("h2:contains('Introduction')").should("be.visible");
      cy.get("h2:contains('What is AppML?')").should("be.visible");

      tutorials.clickTutorialNavBtn();
      tutorials.verifyTutorialTitleIsDisplayed();
      tutorials.clickOnTutorialsCourseName("Learn React");
      cy.get("h1:contains('React Tutorial')").should("be.visible");
      cy.get("h2:contains('Learning by Examples')").should("be.visible");
      cy.get("h2:contains('React Quiz')").should("be.visible");
    });
  });
});

// Testing with Data-Driven

describe("Login with correct username and password", function () {
  const login = new Login();
  beforeEach(function () {
    login.navigate();
    login.clickAcceptCookie();
    cy.fixture('users.json').as('userDetails');
  });

  it("TC10: Login with correct username and password", function () {
    login.openLoginPage();
    login.inputUsername(this.userDetails.email);
    login.inputPassword(this.userDetails.password);
    login.clickLoginBtn();
    cy.wait(10000);
    cy.get('div:contains("My learning")').should('be.visible');
    login.clickLogoutBtn();
  });
});

describe("Login with incorrect username and password for multiple users", function () {
  const login = new Login();

  const testData = require("../fixtures/invaliduser.json");

  testData.forEach((data) => {
    describe("Dynamic Test Data", () => {
      beforeEach(function () {
        login.navigate();
        login.clickAcceptCookie();
        login.openLoginPage();
      });
      it(data.email, function () {
        login.inputUsername(data.email);
        login.inputPassword(data.password);
        login.clickLoginBtn();
        login.validateEmailDoesNotExistErrorMessage();
      });
    });
  });
});
