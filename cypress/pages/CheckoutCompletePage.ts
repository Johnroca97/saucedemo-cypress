
class CheckoutCompletePage {
  private pageTitle: string;
  private completeHeader: string;
  private completeText: string;
  private completeImage: string;
  private backHomeButton: string;
  private checkoutCompleteContainer: string;

  constructor() {
    this.pageTitle = '.title';
    this.completeHeader = '[data-test="complete-header"]';
    this.completeText = '[data-test="complete-text"]';
    this.completeImage = '[data-test="pony-express"]';
    this.backHomeButton = '[data-test="back-to-products"]';
    this.checkoutCompleteContainer = '.checkout_complete_container';
  }

  waitForPageLoad() {
    cy.wait(1000);
    cy.get(this.pageTitle).should('be.visible');
    cy.get(this.completeHeader).should('be.visible');
  }

  clickBackHome() {
    cy.get(this.backHomeButton).should('be.visible').click();
  }

  getPageTitle(): Cypress.Chainable<string> {
    return cy.get(this.pageTitle).invoke('text');
  }

  getCompleteHeader(): Cypress.Chainable<string> {
    return cy.get(this.completeHeader).invoke('text');
  }

  getCompleteText(): Cypress.Chainable<string> {
    return cy.get(this.completeText).invoke('text');
  }

  isCompleteImageVisible(): Cypress.Chainable<boolean> {
    return cy.get(this.completeImage).should('be.visible').then(() => true);
  }

  isBackHomeButtonVisible(): Cypress.Chainable<boolean> {
    return cy.get(this.backHomeButton).should('be.visible').then(() => true);
  }

  isBackHomeButtonEnabled(): Cypress.Chainable<boolean> {
    return cy.get(this.backHomeButton).should('not.be.disabled').then(() => true);
  }

  isPageLoaded(): Cypress.Chainable<boolean> {
    return cy.get(this.pageTitle).should('be.visible').then(() => {
      return cy.get(this.completeHeader).should('be.visible').then(() => {
        return cy.get(this.checkoutCompleteContainer).should('be.visible').then(() => true);
      });
    });
  }

  isOrderCompleted(): Cypress.Chainable<boolean> {
    return this.getCompleteHeader().then(header => {
      return this.getCompleteText().then(text => {
        return this.isCompleteImageVisible().then(imageVisible => {
          return header.includes('Thank you') || 
                 header.includes('complete') || 
                 text.includes('dispatched') ||
                 imageVisible;
        });
      });
    });
  }

  getCompletePageUrl(): Cypress.Chainable<string> {
    return cy.url();
  }

  isSuccessPage(): Cypress.Chainable<boolean> {
    return this.getCompletePageUrl().then(url => url.includes('checkout-complete'));
  }
}

export default CheckoutCompletePage;
