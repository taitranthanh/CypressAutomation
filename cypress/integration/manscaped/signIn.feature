Feature: Validation Sign In Page
  @Testing1
  Scenario: Testing login function
    Given User is open url 'https://www.manscaped.com/login'
    When User is input email and password
    And User is click sign in button
    Then Validate error message