
class CartPage {
  private pageTitle: string;
  private cartItems: string;
  private checkoutButton: string;
  private continueShoppingButton: string;
  private cartQuantityLabel: string;
  
  private getCartItemByName: (productName: string) => string;
  private getRemoveButtonLocator: (productName: string) => string;
  private getItemQuantityLocator: (productName: string) => string;
  private getItemPriceLocator: (productName: string) => string;

  constructor() {
    this.pageTitle = '.title';
    this.cartItems = '.cart_item';
    this.checkoutButton = '[data-test="checkout"]';
    this.continueShoppingButton = '[data-test="continue-shopping"]';
    this.cartQuantityLabel = '.cart_quantity_label';

    this.getCartItemByName = (productName: string) =>
      `[data-test="inventory-item-name"]:contains("${productName}")`;

    this.getRemoveButtonLocator = (productName: string) => {
      const buttonId = this.transformProductNameToButtonId(productName);
      return `[data-test="remove-${buttonId}"]`;
    };
    
    this.getItemQuantityLocator = (productName: string) => 
      `.cart_item:has([data-test="inventory_item_name"]:contains("${productName}")) .cart_quantity`;
    
    this.getItemPriceLocator = (productName: string) => 
      `.cart_item:has([data-test="inventory_item_name"]:contains("${productName}")) .inventory_item_price`;
  }

  private transformProductNameToButtonId(productName: string): string {
    return productName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/\./g, '')         
      .replace(/\(/g, '')          
      .replace(/\)/g, '')         
      .replace(/'/g, '')          
      .replace(/,/g, '')          
      .replace(/-+/g, '-')        
      .replace(/^-|-$/g, '');     
  }

  waitForPageLoad() {
    cy.get(this.pageTitle).should('be.visible');
  }

  removeItem(productName: string) {
    const removeButton = this.getRemoveButtonLocator(productName);
    cy.get(removeButton).should('be.visible').click();
  }

  continueShopping() {
    cy.get(this.continueShoppingButton).click();
  }

  proceedToCheckout() {
    cy.get(this.checkoutButton).click();
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

  getItemQuantity(productName: string): Cypress.Chainable<number> {
    const quantityElement = this.getItemQuantityLocator(productName);
    return cy.get(quantityElement).invoke('text').then(text => parseInt(text || '0'));
  }

  getItemPrice(productName: string): Cypress.Chainable<string> {
    const priceElement = this.getItemPriceLocator(productName);
    return cy.get(priceElement).invoke('text');
  }

  isItemInCart(productName: string): Cypress.Chainable<boolean> {
    const item = this.getCartItemByName(productName);
    return cy.get('body').then($body => {
      return cy.wrap($body.find(item).length > 0);
    });
  }

  isCartEmpty(): Cypress.Chainable<boolean> {
    return this.getCartItemCount().then(count => count === 0);
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

  isCheckoutButtonEnabled(): Cypress.Chainable<boolean> {
    return cy.get(this.checkoutButton).should('not.be.disabled').then(() => true);
  }

  isPageLoaded(): Cypress.Chainable<boolean> {
    return cy.get(this.pageTitle).should('be.visible').then(() => true);
  }
}

export default CartPage;
