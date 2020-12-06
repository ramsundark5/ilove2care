describe('Timesheet operations as volunteer', function () {
    context('Unauthorized', function () {
        it('is redirected on visit to /dashboard when no session', function () {
            // we must have a valid session cookie to be logged
            // in else we are redirected to /unauthorized
            cy.visit('/tabs/timesheet')
            cy.get('h3').should('contain', 'You are not logged in and cannot access this page')
            cy.url().should('include', 'unauthorized')
        })

        it('is redirected using cy.request', function () {
            // instead of visiting the page above we can test this by issuing
            // a cy.request, checking the status code and redirectedToUrl property.

            // See docs for cy.request: https://on.cypress.io/api/request

            // the 'redirectedToUrl' property is a special Cypress property under the hood
            // that normalizes the url the browser would normally follow during a redirect
            cy.request({
                url: '/dashboard',
                followRedirect: false, // turn off following redirects automatically
            }).then((resp) => {
                // should have status code 302
                expect(resp.status).to.eq(302)

                // when we turn off following redirects Cypress will also send us
                // a 'redirectedToUrl' property with the fully qualified URL that we
                // were redirected to.
                expect(resp.redirectedToUrl).to.eq('http://localhost:3000/login')
            })
        })
    })

    context('HTML form submission', function () {
        beforeEach(function () {
            cy.visit('/login')
        })

        it('displays errors on login', function () {
            // incorrect username on purpose
            cy.get('input[name=username]').type('jane.lae')
            cy.get('input[name=password]').type('password123{enter}')

            // we should have visible errors now
            cy.get('p.error')
                .should('be.visible')
                .and('contain', 'Username and/or password is incorrect')

            // and still be on the same URL
            cy.url().should('include', '/login')
        })

        it('redirects to /dashboard on success', function () {
            cy.get('input[name=username]').type(username)
            cy.get('input[name=password]').type(password)
            cy.get('form').submit()

            // we should be redirected to /dashboard
            cy.url().should('include', '/dashboard')
            cy.get('h1').should('contain', 'jane.lane')

            // and our cookie should be set to 'cypress-session-cookie'
            cy.getCookie('cypress-session-cookie').should('exist')
        })
    })

    context('Reusable "login" custom command', function () {
        beforeEach(function () {
            // login before each test
            cy.login('cypresstest1@gmail.com', 'abcd1234')
        })

        it('can visit /timesheet', function () {
            cy.visit('/tabs/timesheet')
            cy.get('h1').should('contain', 'jane.lane')
        })

        it('cannot visit /admin', function () {
            // or another protected page
            cy.visit('/users')
            cy.get('h1').should('contain', 'Users')
        })
    })
})
