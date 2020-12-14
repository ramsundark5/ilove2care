describe('Project operations', function () {
    context('Project tab', function () {
        before(function () {
            cy.clearFirebaseAuth()
            cy.visit('/login')
            cy.waitForReact(1000, '#root')
            cy.login(Cypress.env('admin_username'), Cypress.env('admin_password'))
        })

        it('Add new project', function () {
            //fill form
            cy.contains('ion-tab-button', 'Admin').click()
            cy.contains('ion-tab-button', 'Admin').arrow({
                text: 'Only Admin user can see this option',
                textSize: '5vh',
            })

            cy.contains('Projects').should('be.visible')

            cy.contains('Projects').click()
            cy.contains('ion-button', 'Add Project').should('be.visible')
            cy.contains('ion-button', 'Add Project').click()

            cy.react('TextField', { props: { name: 'name' } }).type('cypress test1')
            cy.get('ion-select').click()
            cy.contains('button', 'Active').click()
            cy.contains('button', 'OK').click()

            cy.get('#users').click()
            cy.get('#users').type('abc@ab.com{enter}')

            cy.react('DateField', { props: { name: 'start' } }).click()
            cy.contains('button', 'Done').should('be.visible')
            cy.contains('button', 'Done').click()
            cy.contains('button', 'Done').should('not.be.visible')
            cy.react('DateField', { props: { name: 'end' } }).click()
            cy.contains('button', 'Done').should('be.visible')
            cy.contains('button', 'Done').click()
            cy.react('TextArea', { props: { name: 'description' } }).type('test description 1')

            cy.get('form').submit()
        })

        it('Edit project', function () {
            cy.contains('cypress test1').click()
            cy.react('TextField', { props: { name: 'name' } }).type('cypress test2')
            cy.get('ion-select').click()
            cy.contains('button', 'Pending').click()
            cy.contains('button', 'OK').click()

            cy.get('#users').type('abcchanged@ab.com{enter}')
            cy.get('#users').type('1243changed@12.com{enter}')

            cy.react('DateField', { props: { name: 'start' } }).click()
            cy.contains('button', 'Done').should('be.visible')
            cy.contains('button', 'Done').click()
            cy.contains('button', 'Done').should('not.be.visible')
            cy.react('DateField', { props: { name: 'end' } }).click()
            cy.contains('button', 'Done').should('be.visible')
            cy.contains('button', 'Done').click()
            cy.react('TextArea', { props: { name: 'description' } }).type('test description 2')

            cy.get('form').submit()
        })

        it('Archive project', function () {
            cy.contains('cypress test1cypress test2').click()
            cy.contains('ion-button', 'Archive').should('be.visible')
            cy.contains('ion-button', 'Archive').click()
            cy.contains('button', 'Archive').should('be.visible')
            cy.contains('button', 'Archive').click()
        })
    })
})
