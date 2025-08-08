describe('Historial de conversaciones', () => {
    beforeEach(() => {
        cy.visit('http://localhost:9002');
        // Clear local storage before each test to ensure a clean state
        cy.clearLocalStorage();
        cy.visit('http://localhost:9002'); // Re-visit to apply clean state
    });

  it('TC07 - Registrar chat en historial', () => {
    cy.get('textarea').type('Este es mi primer mensaje para el historial{enter}');
    // Wait for AI response
    cy.get('.max-w-md', { timeout: 20000 }).should('have.length.gte', 3);

    // Create a new chat, which should save the previous one
    cy.get('button[aria-label="Nuevo chat"]').click();

    // The old chat should now appear in the "Chats Anteriores" list
    cy.contains('Este es mi primer mensaje').should('be.visible');
  });

  it('TC08 - Acceder a charla anterior', () => {
    // Start first chat
    cy.get('textarea').type('Hola, este es el chat 1{enter}');
    cy.get('.max-w-md', { timeout: 20000 }).should('have.length.gte', 3);
    
    // Start a new chat
    cy.get('button[aria-label="Nuevo chat"]').click();
    cy.get('textarea').type('Este es el nuevo chat 2{enter}');
    cy.get('.max-w-md', { timeout: 20000 }).should('have.length.gte', 3);
    
    // Click on the first chat in the history
    cy.contains('Hola, este es el chat 1').click();
    
    // The content of the first chat should be visible again
    cy.contains('Hola, este es el chat 1').should('be.visible');
    // Check for the initial assistant message in that chat
    cy.contains('¡Hola! Soy Simba, tu compañero de apoyo emocional. ¿Cómo te sientes hoy?').should('be.visible');
  });
});
