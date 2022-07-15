/// <reference types="Cypress" />

describe('Register page (direct visit)', () => {
  // beforeEach(() => {
  //   cy.visit('/register');
  // });
  // it('Redirects to the invite page after submitting valid login details', () => {
  //   cy.get('[name="email"]')
  //     .type('mgo@festivalpass.com', { delay: 100 })
  //     .should('have.value', 'mgo@festivalpass.com');
  //   cy.get('[name="password"]').type('546u@3OjoSE9').should('have.value', '546u@3OjoSE9');
  //   cy.get('form').submit();
  //   cy.location().should((loc) => {
  //     expect(loc.pathname).to.eq('/app/invite');
  //   });
  // });
  // it('Shows an error message after submitting invalid login details', () => {
  //   cy.get('[name="email"]').type('fake@email.com').should('have.value', 'fake@email.com');
  //   cy.get('[name="password"]').type('fakepassword').should('have.value', 'fakepassword');
  //   cy.get('form').submit();
  //   cy.get('#form-validation').should('contain', 'Unfortunately something went wrong.');
  // });
});

describe('Register page (coming from elsewere)', () => {
  it('Users coming from inbound campaign presignup form will have their email input filled in', () => {
    cy.visit('/inbound/WXzQ9srYmDM8FsWVKO6VF');

    cy.get('#plan-0').click().find('#checked').should('exist');

    cy.get('#inbound-presignup-form [name="email"]').type('test@email.com{enter}');

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/register');
    });

    cy.get('[name="email"]').should('have.value', 'test@email.com');
  });

  it('Users coming from inbound campaign presignup form without plans will have their email input filled in', () => {
    cy.visit('/inbound/NLBflP2nnn75S5CzqWorJ');

    cy.get('#inbound-presignup-form [name="email"]').type('test@email.com{enter}');

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/register');
    });

    cy.get('[name="email"]').should('have.value', 'test@email.com');
  });

  it('Users coming from outbound campaign presignup form will have their email input filled in', () => {
    cy.visit('/outbound/5PZlA1GhBKViEdrGYKTqj');

    cy.get('#outbound-presignup-form [name="email"]').type('test@email.com{enter}');

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/register');
    });

    cy.get('[name="email"]').should('have.value', 'test@email.com');
  });

  it('Users coming from a referral page will have their email input filled in', () => {
    cy.visit('/?ref=Maxime1898');

    cy.get('#referral-presignup-form [name="email"]').type('test@email.com{enter}');

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/register');
    });

    cy.get('[name="email"]').should('have.value', 'test@email.com');
  });
});
