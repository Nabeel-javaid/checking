describe('My First Test', () => {
    beforeEach(() => {
      cy.on('uncaught:exception', (err, runnable) => {
        return false
      })
    });
  
    it('Visits the app', () => {
      // Your test code goes here
      cy.visit('/');
    });

    it('Visits the app', () => {
      cy.visit('/');
      cy.get('h1').should('be.visible');
    });
  });
  