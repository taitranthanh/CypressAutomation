@API
Feature: API testing

    @test1
    Scenario: Test connectibity
        When Client is sends GET API to check test connectibity
        Then API is shows 200 status code

    @test2
    Scenario: Check server time
        When Client is sends GET API to check server time
        Then API is shows 200 status code
        And API results is shows server time

    @test3
    Scenario: Could not get TRADE with invalid symbol
        When Client is sends GET trade API with invalid symbol
        Then API is shows 400 status code
        And Response message is shows invalid symbol
        And API status message is shows Bad Request

    @test4
    Scenario: Verify user is able to get Trade information for valid symbol
        When Client is sends GET trade API with valid symbol
        Then API is shows 200 status code

    @test5
    Scenario: Verify user could not create a user
        When Client is sends POST API to create a user
        Then API is shows 401 status code
        And API response message is invalid token
    
    @test6
    Scenario: Verify user could not send PAI request without authentication
        When Client is sends POST API without authentication
        Then API is shows 400 status code
        And API response message is invalid token
        And API status message is shows Bad Request

    @test7
    Scenario: Verify user could not send PAI request with invalid authentication
        When Client is sends POST API with invalid authentication
        Then API is shows 403 status code
        And Response message is show provided API key is not correct

    @test8
    Scenario: Verify user is able to get wallet address
        When Client is sends GET API to get wallet address
        Then API is shows 200 status code
        And Wallet address is shows correctly

    @test9
    Scenario: Verify user is able to get invalid asset
        When Client is sends GET API to get asset
        Then API is shows 200 status code

    @test10
    Scenario: Verify user is able to hash message
        When Client is sends POST API to hash
        Then API is shows 200 status code

    @test11
    Scenario: Verify user is able to get wallet balance
        When Client is sends POST API to get wallet balance
        Then API is shows 200 status code
        And Wallet balance is showing correctly