describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the header with logo and navigation", () => {
    cy.get("header").should("be.visible");
    cy.get("header").contains("EasyRealEstate").should("be.visible");
    cy.get("header").contains("Proprietà").should("be.visible");
    cy.get("header").contains("Ricerca").should("be.visible");
  });

  it("should display the hero section with search form", () => {
    cy.get("section").contains("Trova la tua casa dei sogni").should("be.visible");
    cy.get("input[placeholder=\"Villa, appartamento, casa...\"]").should("be.visible");
    cy.get("button").contains("Cerca Proprietà").should("be.visible");
  });

  it("should display property cards", () => {
    cy.get("#properties").should("be.visible");
    cy.get(".group").should("have.length.at.least", 1); // At least one property card
  });

  it("should allow opening and closing the mobile menu", () => {
    cy.viewport("iphone-x");
    cy.get("header button").first().click(); // Open menu
    cy.get("nav").contains("Proprietà").should("be.visible");
    cy.get("header button").first().click(); // Close menu
    cy.get("nav").contains("Proprietà").should("not.be.visible");
  });

  it("should display the cookie banner and allow accepting all cookies", () => {
    cy.get(".fixed.bottom-0").should("be.visible");
    cy.get("button").contains("Accetta tutto").click();
    cy.get(".fixed.bottom-0").should("not.exist");
  });
});
});
