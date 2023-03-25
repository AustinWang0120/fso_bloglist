describe("Blog app", function() {
  beforeEach(function() {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`)
    cy.visit("")
  })

  it("login form is shown", function() {
    cy.contains("login").click()
  })

  describe("login", function() {
    beforeEach(function() {
      const rootUser = {
        name: "Superuser",
        username: "root",
        password: "password"
      }
      cy.request("POST", `${Cypress.env("BACKEND")}/users`, rootUser)
      cy.visit("")
    })

    it("succeeds with correct credentials", function() {
      cy.contains("login").click()
      cy.get("#username").type("root")
      cy.get("#password").type("password")
      cy.get("#login-button").click()
      cy.contains("Hi, Superuser!")
    })

    it("fails with wrong credentials", function() {
      cy.contains("login").click()
      cy.get("#username").type("root")
      cy.get("#password").type("fake")
      cy.get("#login-button").click()
      cy.get("html").should("not.contain", "Hi, Superuser!")
    })
  })
})
