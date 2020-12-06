describe('Timesheet operations as volunteer', function () {
    context('HTML form submission', function () {
        beforeEach(function () {
            cy.clearFirebaseAuth()
            cy.visit('/login')
            cy.waitForReact(1000, '#root')
        })

        it('displays errors on login', function () {
            //login
            cy.get('.firebaseui-idp-password').click()
            cy.get('#ui-sign-in-email-input').type('membertest@gmail.com')
            cy.get('.firebaseui-id-submit').click()
            cy.get('#ui-sign-in-password-input').type('abcd1234')
            cy.get('.firebaseui-id-submit').click()

            //fill form
            cy.get('ion-button').click()
            cy.react('TextField', { props: { name: 'title' } }).type('test timeentry 1')
            cy.get('ion-select').click()
            cy.get('.alert-radio-icon').click()
            cy.contains('button', 'OK').click()
            cy.react('DateField', { props: { name: 'start' } }).click()
            cy.contains('button', 'Done').should('be.visible')
            cy.contains('button', 'Done').click()
            cy.contains('button', 'Done').should('not.be.visible')
            cy.react('DateField', { props: { name: 'end' } }).click()
            cy.contains('button', 'Done').should('be.visible')
            cy.contains('button', 'Done').click()
            cy.react('TextArea', { props: { name: 'note' } }).type('test note 1')

            cy.get('form').submit()
        })
    })
})
