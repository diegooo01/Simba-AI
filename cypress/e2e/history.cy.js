describe('Historial de conversaciones', () => {
    beforeEach(() => {
        cy.visit('http://localhost:9002');
    });

  it('TC07 - Registrar chat en historial (visual)', () => {
    cy.contains('Chats Anteriores').should('be.visible');
    cy.contains('Conversación sobre ansiedad').should('be.visible');
  });

  it('TC08 - Acceder a charla anterior (visual)', () => {
    cy.contains('Charla de la semana pasada').click();
    cy.url().should('eq', 'http://localhost:9002/');
  });
});
