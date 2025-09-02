import LoginPage from '../pages/LoginPage';
import ProductsPage from '../pages/ProductsPage';
import { USERS, ERROR_MESSAGES } from '../fixtures/users';

describe('Login Functionality', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;

  beforeEach(() => {
    loginPage = new LoginPage();
    productsPage = new ProductsPage();
    loginPage.goto();
  });

  it('should login successfully with valid credentials', () => {
    // Arrange & Act
    loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    
    // Assert 
    cy.url().should('include', 'inventory');
    productsPage.waitForPageLoad();
    
    productsPage.getPageTitle().should('eq', 'Products');
    
    productsPage.isPageLoaded().should('eq', true);
  });

  it('should show error message for locked out user', () => {
    // Arrange & Act
    loginPage.login(USERS.LOCKED_OUT.username, USERS.LOCKED_OUT.password);
    
    // Assert
    loginPage.isErrorMessageVisible().should('eq', true);
    
    loginPage.getErrorMessage().should('contain', ERROR_MESSAGES.LOCKED_OUT_USER);
    
    // Verificar que sigue en la página de login
    loginPage.isLoginFormVisible().should('eq', true);
  });

  it('should show error message for invalid credentials', () => {
    // Arrange & Act
    loginPage.login(USERS.INVALID.username, USERS.INVALID.password);
    
    // Assert
    loginPage.isErrorMessageVisible().should('eq', true);
    
    loginPage.getErrorMessage().should('contain', ERROR_MESSAGES.INVALID_CREDENTIALS);
  });

  it('should show error message when username is missing', () => {
    // Arrange & Act
    loginPage.fillPassword(USERS.STANDARD.password);
    loginPage.clickLogin();
    
    // Assert
    loginPage.getErrorMessage().should('contain', ERROR_MESSAGES.MISSING_USERNAME);
  });

  it('should show error message when password is missing', () => {
    // Arrange & Act
    loginPage.fillUsername(USERS.STANDARD.username);
    loginPage.clickLogin();
    
    // Assert
    loginPage.getErrorMessage().should('contain', ERROR_MESSAGES.MISSING_PASSWORD);
  });

  it('should clear form fields correctly', () => {
    // Arrange
    loginPage.fillUsername(USERS.STANDARD.username);
    loginPage.fillPassword(USERS.STANDARD.password);
    
    // Act
    loginPage.clearForm();
    
    // Assert
    loginPage.getUsernameValue().should('eq', '');
    loginPage.getPasswordValue().should('eq', '');
  });

  it('should maintain form state during interaction', () => {
    // Arrange & Act
    const testUsername = USERS.STANDARD.username;
    loginPage.fillUsername(testUsername);
    
    // Assert
    loginPage.getUsernameValue().should('eq', testUsername);
  });
});
