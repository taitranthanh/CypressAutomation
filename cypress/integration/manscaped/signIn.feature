Feature: Validation Sign In Page
  @Testing1
  Scenario: Testing login function
    Given User is open url 'https://www.manscaped.com/login'
    When User is navigate to sign in page
    And User is input email and password
    Then Validate error message