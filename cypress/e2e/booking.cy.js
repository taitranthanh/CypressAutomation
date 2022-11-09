import MasterPage from "../pages/booking/MasterPage";
import StaysPage from "../pages/booking/Stays/StaysPage";
import FlightsPage from "../pages/booking/Flights/FlightsPage";

describe("Validation Login Functionality", function () {
  const masterPage = new MasterPage();
  beforeEach(function () {
    masterPage.navigate();
    masterPage.navigateToSigninPage();
  });

  it("TC01: Verify could not login with email is empty", function () {
    masterPage.clickOnContinueWithEmailBtn();
    masterPage.verifyEmptyEmailErrorMessage();
  });

  it("TC02: Verify could not login with email is invalid", function () {
    masterPage.inputEmail("testing");
    masterPage.clickOnContinueWithEmailBtn();
    masterPage.verifyEmailInvalidEmailErrorMessage();
  });
});

describe("Validation booking for stays", function () {
  const masterPage = new MasterPage();
  const staysPage = new StaysPage();

  beforeEach(function () {
    masterPage.navigate();
    masterPage.clickOnTabMenu("Stays");
    masterPage.clickAcceptCookieBtn();
  });

  context("Validation for stay searching", function () {
    it("TC03: Verify could not search stays/hotel without provide any value", function () {
      staysPage.clickOnSearchBtn();
      staysPage.verifySearchWithoutDestinationErrorMessage();
    });

    it("TC04: Verify is able to search stays/hotel", function () {
      staysPage.selectDestination("Singapore");
      staysPage.selectTodayOnCalendar();
      staysPage.selectDateOnCalendar("2022/09/18");
      staysPage.selectNumberOfAdults(5);
      staysPage.selectNumberOfChildren(3);
      staysPage.selectAgeForAllChildrens("8");
      staysPage.selectNumberOfRooms(3);
      staysPage.clickOnSearchBtn();
    });
  });
});

describe("Validation booking for Flights", function () {
  const masterPage = new MasterPage();
  const flightsPage = new FlightsPage();

  beforeEach(function () {
    masterPage.navigate();
    masterPage.clickOnTabMenu("Flights");
    masterPage.clickAcceptCookieBtn();
  });

  it("TC05: Verify could not search fights with default value", function () {
    // Verify for round-trip
    flightsPage.clickOnSearchFlightsBtn();
    flightsPage.verifySelectAirportAndDateRequireError();

    // Verify for one-way
    flightsPage.selectOneWayOption();
    flightsPage.clickOnSearchFlightsBtn();
    flightsPage.verifySelectAirportAndDateRequireError();

    // Verify for multi-city
    flightsPage.selectMultiCityOption();
    flightsPage.clickOnSearchFlightsBtn();
    flightsPage.verifySelectAirportAndDateRequireError();
  });

  it("TC06: Verify able to search fights for round-trip", function () {
    flightsPage.selectRoundTripOption();
    flightsPage.selectAPlaceForWhereFrom("Noi Bai International Airport");
    flightsPage.selectAPlaceForWhereTo("Changi Airport");
    flightsPage.selectFlightStartDate("2022/10/23");
    flightsPage.selectFlightReturnDate("2022/11/08");
    flightsPage.clickOnSearchFlightsBtn();
    flightsPage.verifySearchFlightResultIsDisplayed();
  });

  it("TC07: Verify able to search fights for one-way", function () {
    flightsPage.selectOneWayOption();
    flightsPage.selectAPlaceForWhereFrom("Noi Bai International Airport");
    flightsPage.selectAPlaceForWhereTo("Changi Airport");
    flightsPage.selectFlightStartDate("2022/10/18");
    flightsPage.clickOnSearchFlightsBtn();
    flightsPage.verifySearchFlightResultIsDisplayed();
  });

  it("TC08: Verify able to search fights for multi-city", function () {
    let placesFrom = ["Noi Bai International Airport", "Changi Airport"];
    let placesTo = ["Changi Airport", "Dubai International Airport"];
    let dates = ["2022/10/10", "2022/11/11"];
    flightsPage.selectMultiCityOption();
    flightsPage.selectPlaceForAllWhereFrom(placesFrom);
    flightsPage.selectPlaceForAllWhereTo(placesTo);
    flightsPage.selectFlightDateForMultiCity(dates);
    flightsPage.selectFlightPurpose("Premium economy");
    flightsPage.selectNumberOfAdults(3);
    flightsPage.selectNumberOfChildren(2);
    flightsPage.selectAgeForAllChildrens(7);
    flightsPage.clickOnSearchFlightsBtn();
    flightsPage.verifySearchFlightResultIsDisplayed();
  });

});

