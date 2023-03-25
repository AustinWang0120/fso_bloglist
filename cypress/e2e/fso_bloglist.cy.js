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
        username: "test",
        password: "password"
      }
      cy.request("POST", `${Cypress.env("BACKEND")}/users`, rootUser)
      cy.visit("")
    })

    it("succeeds with correct credentials", function() {
      cy.contains("login").click()
      cy.get("#username").type("test")
      cy.get("#password").type("password")
      cy.get("#login-button").click()
      cy.contains("Hi, Superuser!")
    })

    it("fails with wrong credentials", function() {
      cy.contains("login").click()
      cy.get("#username").type("test")
      cy.get("#password").type("fake")
      cy.get("#login-button").click()
      cy.get("html").should("not.contain", "Hi, Superuser!")
    })

    describe("when logged in", function() {
      beforeEach(function() {
        cy.contains("login").click()
        cy.get("#username").type("test")
        cy.get("#password").type("password")
        cy.get("#login-button").click()
      })

      it("a blog can be created", function() {
        cy.contains("button", "new blog").click()
        cy.get("#input-title").type("a blog created by cypress")
        cy.get("#input-author").type("cypress")
        cy.get("#input-url").type("404.com")
        cy.get("#input-button").click()
        
      })
    })
  })
})
