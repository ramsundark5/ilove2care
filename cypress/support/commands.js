// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (emailInput, passwordInput) => {
    const email = emailInput || 'membertest@gmail.com'
    const password = passwordInput || 'abcd1234'
    cy.get('.firebaseui-idp-password').click()
    cy.get('#ui-sign-in-email-input').type('membertest@gmail.com')
    cy.get('.firebaseui-id-submit').click()
    cy.get('#ui-sign-in-password-input').type('abcd1234')
    cy.get('.firebaseui-id-submit').click()
})

Cypress.Commands.add(
    'clearFirebaseAuth',
    () =>
        new Cypress.Promise(async (resolve) => {
            const req = indexedDB.deleteDatabase('firebaseLocalStorageDb')
            req.onsuccess = function () {
                resolve()
            }
        })
)
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
