Feature: Testing manscaped
  @Testing1
  Scenario: Testing login function
    Given User is open main page 'https://www.manscaped.com/'
    When User is navigate to sign in page
    And User is input email and password
    Then Validate error message
  @Testing2
  Scenario: User is able to add product to cart
    Given User is open main page
    When User is select product to add
    And User is select size and quantity
    Then Product is added to cart
