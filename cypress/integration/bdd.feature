Feature: Validation for login functionality

    Scenario: 'Verify could not login without username and password'
        Given User access to W3Schoool page
        When User access to login page
        And User is clicks to login button
        Then Email is empty error is shows

    Scenario: 'Verify could not login with invalid emaill'
        Given User access to W3Schoool page
        When User access to login page
        And User is input invalid emaill
        And User is clicks to login button
        Then Invalid email error is shows

    Scenario: "Verify could not login with password is empty"
        Given User access to W3Schoool page
        When User access to login page
        And User is input username only
        And User is clicks to login button
        Then Password is require error is shows
