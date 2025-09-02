
class CheckoutStepTwoPage {
  private pageTitle: string;
  private cartItems: string;
  private finishButton: string;
  private cancelButton: string;
  private paymentInformation: string;
  private shippingInformation: string;
  private itemTotal: string;
  private taxLabel: string;
  private totalLabel: string;
  private summaryInfo: string;

  private getItemByName: (productName: string) => string;
  private getItemPriceLocator: (productName: string) => string;
  private getItemQuantityLocator: (productName: string) => string;

  constructor() {
    this.pageTitle = '.title';
    this.cartItems = '.cart_item';
    this.finishButton = '[data-test="finish"]';
    this.cancelButton = '[data-test="cancel"]';
    this.paymentInformation = '[data-test="payment-info-value"]';
    this.shippingInformation = '[data-test="shipping-info-value"]';
    this.itemTotal = '.summary_subtotal_label';
    this.taxLabel = '.summary_tax_label';
    this.totalLabel = '.summary_total_label';
    this.summaryInfo = '.summary_info';

    this.getItemByName = (productName: string) => 
      `.cart_item:has([data-test="inventory_item_name"]:contains("${productName}"))`;
    
    this.getItemPriceLocator = (productName: string) => 
      `.cart_item:has([data-test="inventory_item_name"]:contains("${productName}")) .inventory_item_price`;
    
    this.getItemQuantityLocator = (productName: string) => 
      `.cart_item:has([data-test="inventory_item_name"]:contains("${productName}")) .cart_quantity`;
  }

  waitForPageLoad() {
    cy.get(this.pageTitle).should('be.visible');
    cy.get(this.summaryInfo).should('be.visible');
  }

  clickFinish() {
    cy.get(this.finishButton).should('be.visible').click();
  }

  clickCancel() {
    cy.get(this.cancelButton).click();
  }

  getPageTitle(): Cypress.Chainable<string> {
    return cy.get(this.pageTitle).invoke('text');
  }

  getCartItemCount(): Cypress.Chainable<number> {
    return cy.get(this.cartItems).then($elements => $elements.length);
  }

  getCartItems(): Cypress.Chainable<string[]> {
    return cy.get('.inventory_item_name').then($elements => {
      const items: string[] = [];
      $elements.each((_, el) => {
        const name = Cypress.$(el).text();
        if (name) items.push(name);
      });
      return items;
    });
  }

  getItemPrice(productName: string): Cypress.Chainable<string> {
    const priceElement = this.getItemPriceLocator(productName);
    return cy.get(priceElement).invoke('text');
  }

  getItemQuantity(productName: string): Cypress.Chainable<number> {
    const quantityElement = this.getItemQuantityLocator(productName);
    return cy.get(quantityElement).invoke('text').then(text => parseInt(text || '0'));
  }

  getPaymentInformation(): Cypress.Chainable<string> {
    return cy.get(this.paymentInformation).invoke('text');
  }

  getShippingInformation(): Cypress.Chainable<string> {
    return cy.get(this.shippingInformation).invoke('text');
  }

  getItemTotal(): Cypress.Chainable<string> {
    return cy.get(this.itemTotal).invoke('text');
  }

  getTax(): Cypress.Chainable<string> {
    return cy.get(this.taxLabel).invoke('text');
  }

  getTotalAmount(): Cypress.Chainable<string> {
    return cy.get(this.totalLabel).invoke('text');
  }

  getItemTotalValue(): Cypress.Chainable<number> {
    return this.getItemTotal().then(text => {
      const match = text.match(/\$(\d+\.\d{2})/);
      return match ? parseFloat(match[1]) : 0;
    });
  }

  getTaxValue(): Cypress.Chainable<number> {
    return this.getTax().then(text => {
      const match = text.match(/\$(\d+\.\d{2})/);
      return match ? parseFloat(match[1]) : 0;
    });
  }

  getTotalValue(): Cypress.Chainable<number> {
    return this.getTotalAmount().then(text => {
      const match = text.match(/\$(\d+\.\d{2})/);
      return match ? parseFloat(match[1]) : 0;
    });
  }

  getAllItemPrices(): Cypress.Chainable<string[]> {
    return cy.get('.cart_item .inventory_item_price').then($elements => {
      const prices: string[] = [];
      $elements.each((_, el) => {
        const price = Cypress.$(el).text();
        if (price) prices.push(price);
      });
      return prices;
    });
  }

  isItemInSummary(productName: string): Cypress.Chainable<boolean> {
    const item = this.getItemByName(productName);
    return cy.get('body').then($body => {
      return cy.wrap($body.find(item).length > 0);
    });
  }

  isFinishButtonEnabled(): Cypress.Chainable<boolean> {
    return cy.get(this.finishButton).should('not.be.disabled').then(() => true);
  }

  isPageLoaded(): Cypress.Chainable<boolean> {
    return cy.get(this.pageTitle).should('be.visible').then(() => {
      return cy.get(this.summaryInfo).should('be.visible').then(() => true);
    });
  }

  isSummaryComplete(): Cypress.Chainable<boolean> {
    return this.getCartItemCount().then(count => {
      const hasItems = count > 0;
      return cy.get(this.totalLabel).should('be.visible').then(() => {
        return cy.get(this.taxLabel).should('be.visible').then(() => {
          return cy.get(this.itemTotal).should('be.visible').then(() => {
            return hasItems && true && true && true;
          });
        });
      });
    });
  }

  calculateExpectedTotal(): Cypress.Chainable<number> {
    return this.getItemTotalValue().then(itemTotal => {
      return this.getTaxValue().then(tax => {
        return Math.round((itemTotal + tax) * 100) / 100;
      });
    });
  }
}

export default CheckoutStepTwoPage;
