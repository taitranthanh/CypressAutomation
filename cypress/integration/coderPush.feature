Feature: Validation
    @Test
    Scenario: Checking Who we are page
        Given User is access to coderPush website
        When User is click on 'Who we are' menu
        Then Who we are page information is displayed