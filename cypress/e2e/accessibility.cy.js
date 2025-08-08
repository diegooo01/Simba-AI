describe('Accesibilidad y navegación', () => {
  it('TC09 - Navegación por teclado', () => {
    cy.visit('http://localhost:9002');
    // We just check if we can tab through elements, the focus should be visible by default browser behavior
    cy.get('body').tab().tab().tab(); 
    cy.focused().should('be.visible');
  });

  it('TC10 - Compatibilidad con lector de pantalla', () => {
    cy.visit('http://localhost:9002');
    // Check that images have alt text
    cy.get('img').should('have.attr', 'alt');
    
    // Check that icon-only buttons have an aria-label
    cy.get('button').each(($btn) => {
        // If a button has an svg and no text, it should have an aria-label
        if($btn.children('svg').length > 0 && $btn.text().trim().length === 0) {
            cy.wrap($btn).should('have.attr', 'aria-label');
        }
    })
  });
});
