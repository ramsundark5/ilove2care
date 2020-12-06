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
    const email = emailInput || 'cypresstest1@gmail.com'
    const password = passwordInput || 'abcd1234'

    const log = Cypress.Log.command({
        name: 'login',
        message: [email, password],
        consoleProps: function () {
            return {
                email: email,
                password: password,
            }
        },
    })

    cy.visit('/login', { log: false })
        .contains('Log In', { log: false })
        .get('#email', { log: false })
        .type(email, { log: false })
        .get('#password', { log: false })
        .type(password, { log: false })
        .get('button', { log: false })
        .click({ log: false }) //this should submit the form

    cy.get('h1', { log: false })
        .contains('Dashboard', { log: false }) //we should be on the dashboard now
        .url({ log: false })
        .should('match', /dashboard/, { log: false })
        .then(function () {
            log.snapshot().end()
        })
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
