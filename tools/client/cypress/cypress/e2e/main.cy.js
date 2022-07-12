
describe('main', () => {
  it('main workflow: login, request api', () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    // login
    cy.visit('http://localhost:5000/');
    cy.contains("Client App");
    cy.contains("Sign in");
    cy.get("#username").type("dadior");
    cy.get("#password").type("password");
    cy.get("input[type='submit']").click();
    cy.contains("loaded token:");
    cy.contains("loaded user: dadior");
    cy.contains("loaded rpt:", { timeout: 1000 *20 });
    
    console.warn("request api");

    cy.pause();
    cy.contains("API:settings").click();
    cy.wait(1000*5);
    cy.pause();
    cy.contains("Logout").click();

    cy.contains("Sign in");
  })
})
