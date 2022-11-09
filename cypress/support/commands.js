/// <reference types="cypress" />

Cypress.Commands.add("getData", (selector) => {
    return cy.get(`[data-test=${selector}]`)
  })

  Cypress.Commands.add("getDataTestId", (selector) => {
    return cy.get(`[data-testid=${selector}]`)
  })
  