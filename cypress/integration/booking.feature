Feature: Booking Page

    Background:
    Given Client is accessed to booking page

    @Test1
    Scenario: TC01: Verify could not login with email is empty
        And Client is navigated to login page
        When Client is clicks continue with email button
        Then Email is empty error is shows

    @Test2
    Scenario: TC02: Verify could not login with email is invalid
        And Client is navigated to login page
        When Client input invalid email address
        And Client is clicks continue with email button
        Then Invalid email error is shows

    @Test3
    Scenario: TC03: Verify could not search fights with default value for round trip
        And Client is navigated to flights page
        When Client is clicks on search flight button
        Then Select air port and date require error is show

    @Test4
    Scenario: TC04: Verify could not search fights with default value for one-way
        And Client is navigated to flights page
        And Client is selected one-way option
        When Client is clicks on search flight button
        Then Select air port and date require error is show

    @Test5
    Scenario: TC05: Verify could not search fights with default value for multi-city
        And Client is navigated to flights page
        And Client is selected multi-city option
        When Client is clicks on search flight button
        Then Select air port and date require error is show

    @Test6
    Scenario: TC06: Verify able to search fights for round-trip
        And Client is navigated to flights page
        When Client is input round-trip information for search
        And Client is clicks on search flight button
        Then Round-trip searching information is shows

    @Test7
    Scenario: TC07: Verify able to search fights for one-way
        And Client is navigated to flights page
        And Client is selected one-way option
        When Client is input one-way information for search
        |placeFrom|placeTo|startDate|
        |Noi Bai International Airport|Changi Airport|2022/10/18|
        And Client is clicks on search flight button
        Then One-way searching information is shows