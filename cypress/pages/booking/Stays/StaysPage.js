class StaysPage {
    clickOnSearchBtn() {
    
      cy.get("span.js-sb-submit-text ").click();
      cy.log("Clicked on search stays button");
    }
  
    verifyStaysPageTitleIsDisplayed() {
      cy.getByDataTestId("herobanner-title1")
        .contains("Find your next stay")
        .should("be.visible");
      cy.getByDataTestId("herobanner-subtitile")
        .contains("Search deals on hotels, homes, and much more...")
        .should("be.visible");
    }
  
    selectDestination(value) {
      cy.get("#ss").clear();
      cy.get("#ss").type(value);
      cy.wait(3000);
      cy.get(".search_hl_name").contains(value).eq("0").click();
      cy.log("Selected destination: " + value);
    }
  
    // Validation message error
  
    verifySearchWithoutDestinationErrorMessage() {
      cy.get("div.fe_banner__message").should(
        "have.text",
        " \nError: \nEnter a destination to start searching.\n "
      );
    }
  
    // Using for select today for search Stays
    selectTodayOnCalendar() {
      const dayjs = require("dayjs");
      const today = dayjs().format("DD MMMM YYYY");
      cy.get('span[aria-label="' + today + '"]')
        .click();
      cy.log("Selected date: " + today + " on calendar");
    }
  
    // Only accept YYYY-MM-DD or YYYY/MM/DD
    selectDateOnCalendar(date) {
      const dayjs = require("dayjs");
      const dateFormat = dayjs(date).format("DD MMMM YYYY");
      cy.get('span[aria-label="' + dateFormat + '"]')
        .click();
      cy.log("Selected date: " + dateFormat + " on calendar");
    }
  
    //Select NUmber of Adults
    selectNumberOfAdults(numberAudults) {
      cy.get("#xp__guests__toggle").click();
      cy.wait(3000);
      cy.get('span[data-bui-ref="input-stepper-value"]')
        .first()
        .then(($text) => {
          let currentNumber = parseInt($text.text());
          cy.log("Current of audults: " + currentNumber);
  
          while (currentNumber != numberAudults) {
            if (currentNumber > numberAudults) {
              cy.log(currentNumber);
              cy.get('button[aria-label="Decrease number of Adults"]')
                .click();
              currentNumber = currentNumber - 1;
            } else {
              cy.get('button[aria-label="Increase number of Adults"]')
                .click();
              currentNumber = currentNumber + 1;
            }
            cy.log("Current of audults right now: " + currentNumber);
          }
        });
    }
  
    //Select NUmber of Chilren
    selectNumberOfChildren(numberChilds) {
      cy.get("#xp__guests__toggle").click();
      cy.wait(3000);
      cy.get('span[data-bui-ref="input-stepper-value"]')
        .eq("1")
        .then(($text) => {
          let currentNumber = parseInt($text.text());
          cy.log("Current of Children: " + currentNumber);
  
          while (currentNumber != numberChilds) {
            if (currentNumber > numberChilds) {
              cy.log(currentNumber);
              cy.get('button[aria-label="Decrease number of Children"]')
                .click();
              currentNumber = currentNumber - 1;
            } else {
              cy.get('button[aria-label="Increase number of Children"]')
                .click();
              currentNumber = currentNumber + 1;
            }
            cy.log("Current of children right now: " + currentNumber);
          }
        });
    }
  
    //select Age for all chilren
    selectAgeForAllChildrens(age) {
      cy.get('span[data-bui-ref="input-stepper-value"]')
        .eq("1")
        .then(($text) => {
          let currentNumber = parseInt($text.text());
          cy.log("Current of Children: " + currentNumber);
  
          for (let index = 0; index < currentNumber; index++) {
            cy.get('select[name="age"]:eq('+index+')')
              .select(age)
              .should("have.value", age);
            cy.log("Selected " + age + " age for child #" + index + 1);
          }
        });
    }
  
    //Select NUmber of Rooms
    selectNumberOfRooms(numberRooms) {
      cy.get("#xp__guests__toggle").click();
      cy.wait(3000);
      cy.get('span[data-bui-ref="input-stepper-value"]')
        .last()
        .then(($text) => {
          let currentNumber = parseInt($text.text());
          cy.log("Current of Children: " + currentNumber);
          while (currentNumber != numberRooms) {
            if (currentNumber > numberRooms) {
              cy.log(currentNumber);
              cy.get('button[aria-label="Decrease number of Rooms"]')
                .click();
              currentNumber = currentNumber - 1;
            } else {
              cy.get('button[aria-label="Increase number of Rooms"]')
                .click();
              currentNumber = currentNumber + 1;
            }
            cy.log("Current of room right now: " + currentNumber);
          }
        });
    }
  }
  export default StaysPage;
  