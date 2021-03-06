describe('Timesheet operations', function () {
    context('Timesheet tab', function () {
        before(function () {
            cy.clearFirebaseAuth()
            cy.visit('/login')
            cy.waitForReact(1000, '#root')
            cy.login(Cypress.env('member_username'), Cypress.env('member_password'))
        })

        it('Add new time entry', function () {
            //fill form
            //cy.contains('ion-button', 'Add Time').should('be.visible')
            //cy.contains('ion-button', 'Add Time').click()
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

        it('Edit time entry', function () {
            cy.contains('test timeentry 1').click()
            cy.react('TextField', { props: { name: 'title' } }).type('test timeentry 2')

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

            cy.react('TextArea', { props: { name: 'note' } }).type('test note 2')

            cy.get('form').submit()
        })

        it('Delete time entry', function () {
            cy.contains('test timeentry 1test timeentry 2').click()
            cy.contains('ion-button', 'Delete').should('be.visible')
            cy.contains('ion-button', 'Delete').click()
            cy.contains('button', 'Delete').should('be.visible')
            cy.contains('button', 'Delete').click()
        })
    })
})
