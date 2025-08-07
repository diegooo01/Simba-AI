describe('Performance en red y múltiples sesiones', () => {
  it('TC15 - Muestra indicador de carga', () => {
    cy.visit('http://localhost:9002');
    cy.get('textarea').type('¿Estás ahí?{enter}');
    cy.get('[class*="animate-spin"]').should('be.visible');
  });
});
