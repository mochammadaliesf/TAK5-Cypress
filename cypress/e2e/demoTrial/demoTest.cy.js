// Go to Tricentis we
describe('Open the url target', () => {
    beforeEach(() => {
        cy.visit('https://demowebshop.tricentis.com/login')
    })

    // Validation if can reach the login page
    it('Display login header', () => {
        // Initiate the title text
        const titleLogin = 'Returning Customer'

        // Validate to compare the content
        cy.get('.returning-wrapper > .title > strong', )
            .should('have.text', titleLogin)
    })

    // Validation if can reach the login page
    it('The URL should same ', () => {
        // Initiate the login URL
        const loginUrl = 'https://demowebshop.tricentis.com/login'

        // Validate the page URL
        cy.url().should('eq', loginUrl);    
    })
})