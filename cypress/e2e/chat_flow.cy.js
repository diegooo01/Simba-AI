describe('Flujo de conversación', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9002');
  });

  it('TC04 - Iniciar conversación', () => {
    cy.get('textarea').type('Hola{enter}');
    cy.contains('¡Hola! Soy Simba, tu compañero de apoyo emocional. ¿Cómo te sientes hoy?').should('exist');
  });

  it('TC05 - Expresar emoción negativa', () => {
    cy.get('textarea').type('Me siento triste{enter}');
    // This will depend on the AI's response, making it more flexible
    cy.get('.max-w-md').last().should('not.be.empty');
  });

  it('TC06 - Enviar entrada vacía', () => {
    const initialMessageCount = cy.get('.max-w-md');
    cy.get('textarea').type(' {enter}');
    cy.get('.max-w-md').should('have.length.at.most', 3);
  });
});
