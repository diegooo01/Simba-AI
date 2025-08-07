describe('Accesibilidad y navegación', () => {
  it('TC09 - Navegación por teclado', () => {
    cy.visit('http://localhost:9002');
    cy.get('body').tab().tab().tab(); 
    cy.focused().should('be.visible');
  });

  it('TC10 - Compatibilidad con lector de pantalla', () => {
    cy.visit('http://localhost:9002');
    cy.get('img').should('have.attr', 'alt');
    cy.get('button').each(($btn) => {
        if($btn.children('svg').length > 0 && $btn.text().trim().length === 0) {
            cy.wrap($btn).should('have.attr', 'aria-label');
        }
    })
  });
});
