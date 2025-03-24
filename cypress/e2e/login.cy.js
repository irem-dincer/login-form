import { ErrorMessages } from "../../vite-project/src/Components/Login";


describe('Login Page', () => {
  describe('Error Messages', () => {
  it('name input throws error for 2 chars', () => {

    //Arrange
    cy.visit(' http://localhost:5174/') // change URL to match your dev URL

    //Act
    cy.get('[data-cy="name-input"]').type('ir');

    //Assert
    cy.contains(ErrorMessages.name);


  })

  it('Surname input throws error for 2 chars', () => {

    //Arrange
    cy.visit(' http://localhost:5174/') // change URL to match your dev URL

    //Act
    cy.get('[data-cy="surname-input"]').type('di');

    //Assert
    cy.contains(ErrorMessages.surname);


  })

  it('Email input throws error for irem@dincer.', () => {

    //Arrange
    cy.visit(' http://localhost:5174/') // change URL to match your dev URL

    //Act
    cy.get('[data-cy="email-input"]').type('irem@dincer.');

    //Assert
    cy.contains(ErrorMessages.email);


  })

  it('Password input throws error for 1234', () => {

    //Arrange
    cy.visit(' http://localhost:5174/') // change URL to match your dev URL

    //Act
    cy.get('[data-cy="password-input"]').type('1234');

    //Assert
    cy.contains(ErrorMessages.password);


  })

  
  it('Button is disabled unvalidated inputs', () => {

    //Arrange
    cy.visit(' http://localhost:5174/') // change URL to match your dev URL

    //Act
    cy.get('[data-cy="password-input"]').type('1234');

    //Assert
cy.get('[data-cy="submit-button"]').should('be.disabled');


  })
  
  



})

describe('Form inputs validated', () => {
  it('button enabled for validated inputs', () => {

    //Arrange
    cy.visit(' http://localhost:5174/') // change URL to match your dev URL

    //Act
    cy.get('[data-cy="name-input"]').type('irem');
    cy.get('[data-cy="surname-input"]').type('dincer');
    cy.get('[data-cy="email-input"]').type('irem.dincer02@gmail.com');
    cy.get('[data-cy="password-input"]').type('12345678iremA*');

    //Assert
    cy.get('[data-cy="submit-button"]').should('be.enabled');


  })

  it('submit form valitades inputs', () => {

    //Arrange
    cy.visit(' http://localhost:5174/') // change URL to match your dev URL

    //Act
    cy.get('[data-cy="name-input"]').type('irem');
    cy.get('[data-cy="surname-input"]').type('dincer');
    cy.get('[data-cy="email-input"]').type('irem.dincer02@gmail.com');
    cy.get('[data-cy="password-input"]').type('12345678iremA*');
    cy.get('[data-cy="submit-button"]').click();

    //Assert
    cy.get('[data-cy="result-message"]').should('be.visible');


  })




})



})

