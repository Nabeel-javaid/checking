describe('My First Test', () => {
    // beforeEach(() => {
    //   cy.enableWindowEthereum(); // Enable window.ethereum before visiting the page
    // });
  
    it('Visits the app', () => {
      // Your test code goes here
      cy.visit('/');
    });

    it('Visits the app', () => {
      cy.visit('/');
      cy.get('h1').should('be.visible');
    });
  });
  