/// <reference types="cypress" />

class LoginPage {
  private usernameInput: string;
  private passwordInput: string;
  private loginButton: string;
  private errorMessage: string;
  private loginLogo: string;

  constructor() {
    this.usernameInput = '[data-test="username"]';
    this.passwordInput = '[data-test="password"]';
    this.loginButton = '[data-test="login-button"]';
    this.errorMessage = '[data-test="error"]';
    this.loginLogo = '.login_logo';
  }

  goto() {
    cy.visit('https://www.saucedemo.com');
  }

  fillUsername(username: string) {
    cy.get(this.usernameInput).should('be.visible').clear().type(username);
  }

  fillPassword(password: string) {
    cy.get(this.passwordInput).should('be.visible').clear().type(password);
  }

  clickLogin() {
    cy.get(this.loginButton).click();
  }

  login(username: string, password: string) {
    this.fillUsername(username);
    this.fillPassword(password);
    this.clickLogin();
  }

  getErrorMessage(): Cypress.Chainable<string> {
    return cy.get(this.errorMessage).should('be.visible').invoke('text');
  }

  isErrorMessageVisible(): Cypress.Chainable<boolean> {
    return cy.get(this.errorMessage).should('be.visible').then(() => true);
  }

  isLoginFormVisible(): Cypress.Chainable<boolean> {
    return cy.get(this.loginLogo).should('be.visible').then(() => true);
  }

  getUsernameValue(): Cypress.Chainable<string> {
    return cy.get(this.usernameInput).invoke('val').then(val => val as string);
  }

  getPasswordValue(): Cypress.Chainable<string> {
    return cy.get(this.passwordInput).invoke('val').then(val => val as string);
  }

  clearForm() {
    cy.get(this.usernameInput).clear();
    cy.get(this.passwordInput).clear();
  }
}

export default LoginPage;
