import MasterPage from "../MasterPage";
import dayjs from "dayjs";
import { eq } from "cypress/types/lodash";

class FlightsPage {
  masterPage = new MasterPage();

  navigateToFightsPage() {
    this.masterPage.clickOnTabMenu("Flights");
    cy.wait(3000);
  }

  verifyFlightsPageTitleIsDisplayed() {
    cy.contains("Compare and book flights with ease").should("be.visible");
  }

  selectRoundTripOption() {
    cy.getByDataTestId("searchbox_controller_trip_type_ROUNDTRIP")
      .click();
    cy.log("Clicked on round-trip");
  }

  selectOneWayOption() {
    cy.getByDataTestId("searchbox_controller_trip_type_ONEWAY")
      .click();
    cy.log("Clicked on One-way");
  }

  selectMultiCityOption() {
    cy.getByDataTestId("searchbox_controller_trip_type_MULTISTOP")
      .click();
    cy.log("Clicked on Multi-City");
  }

  clickOnSearchFlightsBtn() {
    cy.once("uncaught:exception", () => false);
    cy.getByDataTestId("searchbox_submit").click();
    cy.log("Clicked on search flights button");
    
  }

  verifySelectAirportAndDateRequireError() {
    cy.contains("Select airports and dates").should("be.visible");
  }

  // select a place for where from
  selectAPlaceForWhereFrom(whereFrom) {
    cy.getByDataTestId("searchbox_origin").click();
    cy.getByDataTestId("searchbox_origin_input")
      .type("{backspace}")
      .type(whereFrom);
    cy.get("span:contains(" + whereFrom + ")")
      .click();
    cy.log("Selected where from: " + whereFrom);
    cy.wait(3000);
  }

  // select a place for where to
  selectAPlaceForWhereTo(whereTo) {
    //cy.getByDataTestId('searchbox_destination').click()
    cy.getByDataTestId("searchbox_destination_input").type(whereTo);
    cy.get("span:contains(" + whereTo + ")")
      .click();
    cy.log("Selected where to: " + whereTo);
    cy.wait(3000);
  }

  // Using for select today for search Stays
  selectTodayOnCalendar() {
    const dayjs = require("dayjs");
    const today = dayjs().format("D MMMM YYYY");
    cy.getByDataTestId("searchbox_date_picker_desktop_calendar")
      .eq("0")
      .click();
    cy.get('span[aria-label="' + today + '"]')
      .click();
    cy.log("Selected date: " + today + " on calendar");
    cy.wait(3000);
  }

  selectFutureDateFromToday(numberOfDate) {
    let futureDate = dayjs().add(numberOfDate, "day");
    const dateFormat = dayjs(futureDate).format("D MMMM YYYY");
    //cy.getByDataTestId('searchbox_date_picker_desktop_calendar').eq('1').click();
    cy.get('span[aria-label="' + dateFormat + '"]')
      .click();
    cy.log("Selected feature date: " + dateFormat + " on calendar");
  }

  // Select Start Date // Only accept YYYY-MM-DD or YYYY/MM/DD
  selectFlightStartDate(startDate) {
    const dayjs = require("dayjs");
    const dateFormat = dayjs(startDate).format("D MMMM YYYY");
    cy.getByDataTestId("searchbox_date_picker_desktop_calendar")
      .eq("0")
      .click();
    cy.get('span[aria-label="' + dateFormat + '"]')
      .click();
    cy.log("Selected start date: " + dateFormat + " on calendar");
    cy.wait(3000);
  }

  // Select Return Date // Only accept YYYY-MM-DD or YYYY/MM/DD
  selectFlightReturnDate(returnDate) {
    const dayjs = require("dayjs");
    const dateFormat = dayjs(returnDate).format("D MMMM YYYY");
    //cy.getByDataTestId('searchbox_date_picker_desktop_calendar').eq('1').click();
    cy.get('span[aria-label="' + dateFormat + '"]')
      .click();
    cy.log("Selected return date: " + returnDate + " on calendar");
    cy.wait(3000);
  }

  verifySearchFlightResultIsDisplayed() {
    cy.once("uncaught:exception", () => false);
    cy.getByDataTestId("searchresults_list", { timeout: 10000 }).should("be.visible");
  }

  clickAddAFlight() {
    cy.get('div:contains("Add a flight")').click();
    cy.log("Clicked on add a flight");
  }

  // Using for multi-city
  selectPlaceForAllWhereFrom(places) {
    cy.getByDataTestId("searchbox_origin").then(($ele) => {
      length = $ele.length;
      cy.log("Lenght is " + length);
      for (let index = 0; index < length; index++) {
        cy.getByDataTestId("searchbox_origin").eq(index).click();
        cy.getByDataTestId("searchbox_origin_input")
          .type("{backspace}")
          .type(places[index]);
        cy.get("span:contains(" + places[index] + ")")
          .click();
        cy.log("Selected where from: " + places[index]);
        cy.wait(3000);
      }
    });
  }

  selectPlaceForAllWhereTo(places) {
    cy.getByDataTestId("searchbox_destination").then(($ele) => {
      length = $ele.length;
      cy.log("Lenght is " + length);
      for (let index = 0; index < length; index++) {
        cy.getByDataTestId("searchbox_destination").eq(index).click();
        cy.wait(2000);
        cy.getByDataTestId("searchbox_destination_input").type(places[index]);
        cy.getByDataTestId("autocomplete_result")
          .find("span:contains(" + places[index] + ")")
          .click();
        cy.log("Selected where to: " + places[index]);
      }
    });
  }

  // Select Start Date // Only accept YYYY-MM-DD or YYYY/MM/DD
  selectFlightDateForMultiCity(dates) {
    cy.getByDataTestId("searchbox_date_picker_desktop_calendar").then(
      ($ele) => {
        length = $ele.length;
        cy.log("Lenght is " + length);
        for (let index = 0; index < length; index++) {
          const dayjs = require("dayjs");
          const dateFormat = dayjs(dates[index]).format("D MMMM YYYY");
          cy.getByDataTestId("searchbox_date_picker_desktop_calendar")
            .eq(index)
            .click();
          cy.get('span[aria-label="' + dateFormat + '"]')
            .and("not.contain", "disabled")
            .click();
          cy.log("Selected date: " + dateFormat + " on calendar");
          cy.wait(3000);
        }
      }
    );
  }

  //Select Flight purpose: Economy/Bussiness/Premium economy
  selectFlightPurpose(purpose) {
    cy.get("select").select(purpose);
    cy.log("Selected flight purpose is: " + purpose);
  }

  // Select Audult number for flight

  selectNumberOfAdults(numberAudults) {
    cy.getByDataTestId("input_occupancy_desktop_passengers_trigger").click();
    cy.get("div.css-1uzx2ul")
      .first()
      .then(($text) => {
        let currentNumber = parseInt($text.text());
        cy.log("Current of audults: " + currentNumber);

        while (currentNumber != numberAudults) {
          if (currentNumber > numberAudults) {
            cy.log(currentNumber);
            cy.getByDataTestId("input_occupancy_modal_adults_decrease")
              .click();
            currentNumber = currentNumber - 1;
          } else {
            cy.getByDataTestId("input_occupancy_modal_adults_increase")
              .click();
            currentNumber = currentNumber + 1;
          }
          cy.log("Current of audults right now: " + currentNumber);
        }
      });
  }

  //Select NUmber of Chilren
  selectNumberOfChildren(numberChilds) {
    cy.getByDataTestId("input_occupancy_desktop_passengers_trigger").click();
    cy.get("div.css-1uzx2ul")
      .last()
      .then(($text) => {
        let currentNumber = parseInt($text.text());
        cy.log("Current of Children: " + currentNumber);

        while (currentNumber != numberChilds) {
          if (currentNumber > numberChilds) {
            cy.log(currentNumber);
            cy.getByDataTestId("input_occupancy_modal_children_decrease").then(
              ($button) => {
                if ($button.is(":visible")) {
                  $button.click();
                } else {
                  cy.getByDataTestId(
                    "input_occupancy_desktop_passengers_trigger"
                  ).click();
                  $button.click();
                }
              }
            );
            currentNumber = currentNumber - 1;
          } else {
            cy.getByDataTestId("input_occupancy_modal_children_increase").then(
              ($button) => {
                if ($button.is(":visible")) {
                  $button.click();
                } else {
                  cy.getByDataTestId(
                    "input_occupancy_desktop_passengers_trigger"
                  ).click();
                  $button.click();
                }
              }
            );
            currentNumber = currentNumber + 1;
          }
        }
      });
  }

  //select Age for all chilren
  selectAgeForAllChildrens(age) {
    cy.get("div.css-1uzx2ul")
      .last()
      .then(($text) => {
        let currentNumber = parseInt($text.text());
        cy.getByDataTestId(
          "input_occupancy_desktop_passengers_trigger"
        ).click();
        for (let index = 0; index < currentNumber; index++) {
          cy.wait(3000);
          cy.get('select[name="children"]:eq('+index+')')
            .select(age + 1)
            .should("have.value", age);
          cy.log("Selected " + age + " age for child #" + index + 1);
        }
      });
  }
}

export default FlightsPage;
