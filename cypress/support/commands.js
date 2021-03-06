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
    const email = emailInput || Cypress.env('member_username')
    const password = passwordInput || Cypress.env('member_password')
    cy.get('.firebaseui-idp-password').click()
    cy.get('#ui-sign-in-email-input').type(email)
    cy.get('.firebaseui-id-submit').should('be.visible')
    cy.get('.firebaseui-id-submit').click()
    cy.get('#ui-sign-in-password-input').type(password)
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

Cypress.Commands.add('swipeLeft', (ref) => {
    ref.trigger('mousedown', { position: 'right' })
        .trigger('mousemove', { clientX: 100, clientY: 275 })
        .trigger('mouseup', { force: true })
})

Cypress.Commands.add('swipeRight', (ref) => {
    ref.trigger('mousedown', { position: 'left' })
        .trigger('mousemove', { clientX: 300, clientY: 275 })
        .trigger('mouseup', { force: true })
})
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
