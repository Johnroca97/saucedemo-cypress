import LoginPage from '../pages/LoginPage';
import ProductsPage from '../pages/ProductsPage';
import { USERS, PRODUCTS, SORT_OPTIONS } from '../fixtures/users';

describe('Products Page Functionality', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;

  beforeEach(() => {
    loginPage = new LoginPage();
    productsPage = new ProductsPage();
    loginPage.goto();
    loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    productsPage.waitForPageLoad();
  });

  it('should display all products correctly', () => {
    // Act
    productsPage.getAllProductNames().then(productNames => {
      productsPage.getAllProductPrices().then(productPrices => {
        // Assert
        expect(productNames.length).to.be.greaterThan(0);
        expect(productPrices.length).to.be.greaterThan(0);
        expect(productNames.length).to.equal(productPrices.length);
        
        // Verificar que productos específicos están presentes
        expect(productNames).to.include(PRODUCTS.SAUCE_LABS_BACKPACK);
        expect(productNames).to.include(PRODUCTS.SAUCE_LABS_BIKE_LIGHT);
      });
    });
  });

  it('should add product to cart successfully', () => {
    // Arrange
    const productName = PRODUCTS.SAUCE_LABS_BACKPACK;
    
    productsPage.getCartItemCount().then(initialCartCount => {
      // Act
      productsPage.addProductToCart(productName);
      
      // Assert
      productsPage.getCartItemCount().should('eq', initialCartCount + 1);
      
      productsPage.isProductInCart(productName).should('eq', true);
    });
  });

  it('should remove product from cart successfully', () => {
    // Arrange - Primero agregar un producto
    const productName = PRODUCTS.SAUCE_LABS_BACKPACK;
    productsPage.addProductToCart(productName);
    
    productsPage.getCartItemCount().then(cartCountAfterAdd => {
      // Act
      productsPage.removeProductFromCart(productName);
      
      // Assert
      productsPage.getCartItemCount().should('eq', cartCountAfterAdd - 1);
      
      productsPage.isProductInCart(productName).should('eq', false);
    });
  });

  it('should add multiple products to cart', () => {
    // Arrange
    const products = [
      PRODUCTS.SAUCE_LABS_BACKPACK,
      PRODUCTS.SAUCE_LABS_BIKE_LIGHT,
      PRODUCTS.SAUCE_LABS_BOLT_TSHIRT
    ];
    
    productsPage.getCartItemCount().then(initialCartCount => {
      // Act
      products.forEach(product => {
        productsPage.addProductToCart(product);
      });
      
      // Assert
      productsPage.getCartItemCount().should('eq', initialCartCount + products.length);
      
      // Verificar que todos los productos están en el carrito
      products.forEach(product => {
        productsPage.isProductInCart(product).should('eq', true);
      });
    });
  });
});
