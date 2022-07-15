/// <reference types="Cypress" />

describe('Login page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('Redirects to the invite page after submitting valid login details', () => {
    cy.get('[name="email"]')
      .type('mgo@festivalpass.com', { delay: 100 })
      .should('have.value', 'mgo@festivalpass.com');

    cy.get('[name="password"]').type('546u@3OjoSE9').should('have.value', '546u@3OjoSE9');

    cy.get('form').submit();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/app/invite');
    });
  });

  it('Shows an error message after submitting invalid login details', () => {
    cy.get('[name="email"]').type('fake@email.com').should('have.value', 'fake@email.com');

    cy.get('[name="password"]').type('fakepassword').should('have.value', 'fakepassword');

    cy.get('form').submit();

    cy.get('#form-validation').should('contain', 'Unfortunately something went wrong.');
  });

  it('Autofills the email form field if the user entered it before on the landing page', () => {});
});

describe('Login page (coming from elsewere)', () => {
  it('Entering the email in the landing page and then going to the Autofills the email form field if the user entered it before on the landing page', () => {});
});
