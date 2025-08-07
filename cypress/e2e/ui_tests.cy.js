describe('UI - Elementos visibles', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9002');
  });

  it('TC01 - Menú principal visible', () => {
    cy.contains('Reportes').should('be.visible');
    cy.contains('Canales de Ayuda').should('be.visible');
    cy.contains('Configuración').should('be.visible');
  });

  it('TC02 - Logo visible', () => {
    cy.get('img[alt="Simba Logo"]').should('be.visible');
  });

  it('TC03 - Navegar a Canales de Ayuda', () => {
    cy.contains('Canales de Ayuda').click();
    cy.url().should('include', '/help-channels');
  });
});
