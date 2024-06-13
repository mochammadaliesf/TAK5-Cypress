import mainPage from "../../support/pageObject/mainPage"

describe('Scrap e-commerce item', () => {
    // Declare array variable to store the result

    // Scrapping product item from Amazon
    it('Search the product item from Amazon', () => {
        cy.amazon()
    })

    // Scrapping product item from Ebay
    it('Search the product item from Ebay', () => {
        cy.ebay()
    })

})