import mainPage from "./pageObject/mainPage";

Cypress.Commands.add('amazon', (product) => {
    cy.visit('https://www.amazon.com');

    cy.get(mainPage.amazonImgHeader).should('be.visible', {timeout: 500});
    cy.get(mainPage.amazonSearchField).should('be.visible').type('iPhone Pro 15');
    cy.get(mainPage.amazonSearchButton).click();
    
    // Sorting by price: low to high
    cy.get(mainPage.amazonFilter).click();
    cy.get(mainPage.amazonFilterOption).click();
    
    cy.wait(5000); // Wait for sorting to complete

    let results = [];
    
    cy.get('.s-main-slot .s-result-item', { timeout: 10000 }).should('have.length.at.least', 3).each(($el, index) => {
        if (index < 3) { // Limit to the first 3 items
            const source = 'Amazon';
            const productName = Cypress.$($el).find('h2 .a-link-normal').text();
            const productPrice = Cypress.$($el).find('.a-price > .a-offscreen').first().text();
            const productLink = Cypress.$($el).find('h2 .a-link-normal').attr('href');
            
            if (productName && productPrice && productLink) {
                results.push({
                    source,
                    productName,
                    productPrice,
                    productLink: `https://www.amazon.com${productLink}`
                });
                
                // Log each product item immediately after retrieving
                cy.log(`Product from Amazon: ${productName} - ${productPrice} - ${source} - ${productLink}`);
            }
        }
    }).then(() => {
        // Save the results to a JSON file (resultsAmazon.json)
        cy.writeFile('cypress/fixtures/resultsAmazon.json', results);
    });
});

Cypress.Commands.add('ebay', (product) => {
    cy.visit('https://www.ebay.com');

    cy.get(mainPage.ebayImageheader).should('be.visible');
    cy.get(mainPage.ebaySearchField).should('be.visible').type('iPhone Pro 15');
    cy.get(mainPage.ebaySearchButton).click();

    // Validate the result
    cy.url().should('contain', 'iPhone+Pro+15');

    // Ordering the result with ascending based on the price
    cy.get(mainPage.ebayFilter).click();
    cy.contains(mainPage.ebayFilterOption, {timeout: 500}).click({ force: true });

    cy.url().should('contain', '_sop=15');
    cy.contains('Price + Shipping: lowest first').should('be.visible');

    let results = [];
    
    cy.get('.s-item', { timeout: 10000 }).should('have.length.at.least', 3).each(($el, index) => {
        if (index < 3) { // Limit to the first 3 items
            const source = 'eBay';
            const productName = Cypress.$($el).find('.s-item__title').text();
            const productPrice = Cypress.$($el).find('.s-item__price').text();
            const productLink = Cypress.$($el).find('.s-item__link').attr('href');
            
            if (productName && productPrice && productLink) {
                results.push({
                    source,
                    productName,
                    productPrice,
                    productLink
                });

                // Log each product item immediately after retrieving
                cy.log(`Product from eBay: ${productName} - ${productPrice} - ${source} - ${productLink}`);
            }
        }
    }).then(() => {
        // Save the results to a JSON file (resultsEbay.json)
        cy.writeFile('cypress/fixtures/resultsEbay.json', results);
    });
});
