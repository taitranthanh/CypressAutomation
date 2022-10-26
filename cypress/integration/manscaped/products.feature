Feature: Validation product page
  @Testing2
  Scenario: User is able to add product to cart
    Given User is open url 'https://www.manscaped.com/'
    When User is select product 'The Platinum Package 4.0'
    And User is select size M and quantity 2
    And User is click add to cart button
    Then Product is added to cart
    |productName|
    |The Platinum Package 4.0|
