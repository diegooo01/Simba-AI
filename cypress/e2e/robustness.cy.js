describe('Robustez del sistema', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9002');
  });

  it('TC12 - Emojis múltiples', () => {
    cy.get('textarea').type('😭😭😭😭😭{enter}');
    cy.get('.max-w-md').last().should('not.be.empty');
  });

  it('TC13 - Texto muy largo', () => {
    const longText = 'a'.repeat(1000);
    cy.get('textarea').type(`${longText}{enter}`);
    cy.get('.max-w-md').last().should('not.be.empty');
  });
});
