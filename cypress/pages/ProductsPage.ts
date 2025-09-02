
class ProductsPage {
  private pageTitle: string;
  private productsContainer: string;
  private sortDropdown: string;
  private cartIcon: string;
  private cartBadge: string;
  private menuButton: string;
  private logoutLink: string;

  private getProductByName: (productName: string) => string;
  private getAddToCartButtonLocator: (productName: string) => string;
  private getRemoveButtonLocator: (productName: string) => string;
  private getProductPriceLocator: (productName: string) => string;

  constructor() {
    this.pageTitle = '.title';
    this.productsContainer = '.inventory_container';
    this.sortDropdown = '[data-test="product_sort_container"]';
    this.cartIcon = '.shopping_cart_link';
    this.cartBadge = '.shopping_cart_badge';
    this.menuButton = '#react-burger-menu-btn';
    this.logoutLink = '#logout_sidebar_link';

    this.getProductByName = (productName: string) => 
      `[data-test="inventory_item_name"]:contains("${productName}")`;
    
    this.getAddToCartButtonLocator = (productName: string) => 
      `[data-test="add-to-cart-${productName.toLowerCase().replace(/\s+/g, '-')}"]`;
    
    this.getRemoveButtonLocator = (productName: string) => 
      `[data-test="remove-${productName.toLowerCase().replace(/\s+/g, '-')}"]`;
    
    this.getProductPriceLocator = (productName: string) => 
      `.inventory_item:has([data-test="inventory_item_name"]:contains("${productName}")) .inventory_item_price`;
  }

  waitForPageLoad() {
    cy.get(this.pageTitle).should('be.visible');
    cy.get(this.productsContainer).should('be.visible');
  }

  addProductToCart(productName: string) {
    const addButton = this.getAddToCartButtonLocator(productName);
    cy.get(addButton).should('be.visible').click();
  }

  removeProductFromCart(productName: string) {
    const removeButton = this.getRemoveButtonLocator(productName);
    cy.get(removeButton).should('be.visible').click();
  }

  clickProduct(productName: string) {
    const product = this.getProductByName(productName);
    cy.get(product).should('be.visible').click();
  }

  sortProducts(sortOption: string) {
    cy.get(this.sortDropdown).should('be.visible').select(sortOption);
  }

  goToCart() {
    cy.get(this.cartIcon).click();
  }

  logout() {
    cy.get(this.menuButton).click();
    cy.get(this.logoutLink).should('be.visible').click();
  }

  getPageTitle(): Cypress.Chainable<string> {
    return cy.get(this.pageTitle).invoke('text');
  }

  getCartItemCount(): Cypress.Chainable<number> {
    return cy.get('body').then($body => {
      if ($body.find(this.cartBadge).length > 0) {
        return cy.get(this.cartBadge).invoke('text').then(text => parseInt(text || '0'));
      } else {
        return cy.wrap(0);
      }
    });
  }

  getProductPriceText(productName: string): Cypress.Chainable<string> {
    const priceElement = this.getProductPriceLocator(productName);
    return cy.get(priceElement).invoke('text');
  }

  isProductInCart(productName: string): Cypress.Chainable<boolean> {
    const removeButton = this.getRemoveButtonLocator(productName);
    return cy.get('body').then($body => {
      return cy.wrap($body.find(removeButton).length > 0);
    });
  }

  getAllProductNames(): Cypress.Chainable<string[]> {
    return cy.get('.inventory_item_name').then($elements => {
      const names: string[] = [];
      $elements.each((_, el) => {
        const name = Cypress.$(el).text();
        if (name) names.push(name);
      });
      return names;
    });
  }

  getAllProductPrices(): Cypress.Chainable<string[]> {
    return cy.get('.inventory_item_price').then($elements => {
      const prices: string[] = [];
      $elements.each((_, el) => {
        const price = Cypress.$(el).text();
        if (price) prices.push(price);
      });
      return prices;
    });
  }

  getCurrentSortOption(): Cypress.Chainable<string> {
    return cy.get(this.sortDropdown).invoke('val').then(val => val as string);
  }

  isPageLoaded(): Cypress.Chainable<boolean> {
    return cy.get(this.pageTitle).should('be.visible').then(() => {
      return cy.get(this.productsContainer).should('be.visible').then(() => true);
    });
  }
}

export default ProductsPage;
