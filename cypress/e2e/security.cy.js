describe('Seguridad y privacidad', () => {
  it('TC16 - Acceso al historial sin contexto (visual)', () => {
    cy.visit('http://localhost:9002');
    cy.contains('Chats Anteriores').should('exist');
  });

  it('TC17 - No guardar info sensible en localStorage', () => {
    cy.visit('http://localhost:9002');
    cy.get('textarea').type('Me siento muy mal hoy{enter}');
    cy.window().then((win) => {
      const storageKeys = Object.keys(win.localStorage);
      const sensitiveKeys = storageKeys.filter(key => /emotion|message|chat/i.test(key));
      expect(sensitiveKeys.length).to.equal(0);
    });
  });
});
