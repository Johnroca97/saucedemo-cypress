
class CheckoutStepOnePage {
  private pageTitle: string;
  private firstNameInput: string;
  private lastNameInput: string;
  private postalCodeInput: string;
  private continueButton: string;
  private cancelButton: string;
  private errorMessage: string;

  constructor() {
    this.pageTitle = '.title';
    this.firstNameInput = '[data-test="firstName"]';
    this.lastNameInput = '[data-test="lastName"]';
    this.postalCodeInput = '[data-test="postalCode"]';
    this.continueButton = '[data-test="continue"]';
    this.cancelButton = '[data-test="cancel"]';
    this.errorMessage = '[data-test="error"]';
  }

  waitForPageLoad() {
    cy.get(this.pageTitle).should('be.visible');
    cy.get(this.firstNameInput).should('be.visible');
  }

  fillFirstName(firstName: string) {
    cy.get(this.firstNameInput).should('be.visible').clear().type(firstName);
  }

  fillLastName(lastName: string) {
    cy.get(this.lastNameInput).should('be.visible').clear().type(lastName);
  }

  fillPostalCode(postalCode: string) {
    cy.get(this.postalCodeInput).should('be.visible').clear().type(postalCode);
  }

  fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    this.fillFirstName(firstName);
    this.fillLastName(lastName);
    this.fillPostalCode(postalCode);
  }

  clickContinue() {
    cy.get(this.continueButton).click();
  }

  clickCancel() {
    cy.get(this.cancelButton).click();
  }

  clearForm() {
    cy.get(this.firstNameInput).clear();
    cy.get(this.lastNameInput).clear();
    cy.get(this.postalCodeInput).clear();
  }

  getPageTitle(): Cypress.Chainable<string> {
    return cy.get(this.pageTitle).invoke('text');
  }

  getFirstNameValue(): Cypress.Chainable<string> {
    return cy.get(this.firstNameInput).invoke('val').then(val => val as string);
  }

  getLastNameValue(): Cypress.Chainable<string> {
    return cy.get(this.lastNameInput).invoke('val').then(val => val as string);
  }

  getPostalCodeValue(): Cypress.Chainable<string> {
    return cy.get(this.postalCodeInput).invoke('val').then(val => val as string);
  }

  getErrorMessage(): Cypress.Chainable<string> {
    return cy.get(this.errorMessage).should('be.visible').invoke('text');
  }

  isErrorMessageVisible(): Cypress.Chainable<boolean> {
    return cy.get('body').then($body => {
      return cy.wrap($body.find(this.errorMessage).length > 0);
    });
  }

  isContinueButtonEnabled(): Cypress.Chainable<boolean> {
    return cy.get(this.continueButton).should('not.be.disabled').then(() => true);
  }

  isCancelButtonVisible(): Cypress.Chainable<boolean> {
    return cy.get(this.cancelButton).should('be.visible').then(() => true);
  }

  isPageLoaded(): Cypress.Chainable<boolean> {
    return cy.get(this.pageTitle).should('be.visible').then(() => {
      return cy.get(this.firstNameInput).should('be.visible').then(() => true);
    });
  }

  areAllFieldsEmpty(): Cypress.Chainable<boolean> {
    return this.getFirstNameValue().then(firstName => {
      return this.getLastNameValue().then(lastName => {
        return this.getPostalCodeValue().then(postalCode => {
          return firstName === '' && lastName === '' && postalCode === '';
        });
      });
    });
  }

  areAllFieldsFilled(): Cypress.Chainable<boolean> {
    return this.getFirstNameValue().then(firstName => {
      return this.getLastNameValue().then(lastName => {
        return this.getPostalCodeValue().then(postalCode => {
          return firstName !== '' && lastName !== '' && postalCode !== '';
        });
      });
    });
  }
}

export default CheckoutStepOnePage;
