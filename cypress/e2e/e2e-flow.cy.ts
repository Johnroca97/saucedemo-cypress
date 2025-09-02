import LoginPage from '../pages/LoginPage';
import ProductsPage from '../pages/ProductsPage';
import CartPage from '../pages/CartPage';
import { USERS, PRODUCTS, CHECKOUT_INFO } from '../fixtures/users';
import CheckoutStepOnePage from '../pages/CheckoutStepOnePage';
import CheckoutStepTwoPage from '../pages/CheckoutStepTwoPage';
import CheckoutCompletePage from '../pages/CheckoutCompletePage';

describe('End-to-End Shopping Flow', () => {
    let loginPage: LoginPage;
    let productsPage: ProductsPage;
    let cartPage: CartPage;
    let checkoutStepOnePage: CheckoutStepOnePage;
    let checkoutStepTwoPage: CheckoutStepTwoPage;
    let checkoutCompletePage: CheckoutCompletePage;

    beforeEach(() => {
        loginPage = new LoginPage();
        productsPage = new ProductsPage();
        cartPage = new CartPage();
        checkoutStepOnePage = new CheckoutStepOnePage();
        checkoutStepTwoPage = new CheckoutStepTwoPage();
        checkoutCompletePage = new CheckoutCompletePage();
    });

    it('complete shopping flow: login, add products, checkout and complete order', () => {
        // Step 1: Login
        loginPage.goto();
        loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);

        // Verify login success
        cy.url().should('include', 'inventory');
        productsPage.waitForPageLoad();

        productsPage.getPageTitle().should('eq', 'Products');

        // Step 2: Add multiple products to cart
        const productsToAdd = [
            PRODUCTS.SAUCE_LABS_BACKPACK,
            PRODUCTS.SAUCE_LABS_BIKE_LIGHT,
            PRODUCTS.SAUCE_LABS_BOLT_TSHIRT
        ];

        productsPage.getCartItemCount().then(initialCartCount => {
            productsToAdd.forEach(product => {
                productsPage.addProductToCart(product);
            });

            productsPage.getCartItemCount().should('eq', initialCartCount + productsToAdd.length);

            // Step 3: Navigate to cart and verify items
            productsPage.goToCart();
            cy.url().should('include', 'cart');
            cartPage.waitForPageLoad();

            cartPage.getPageTitle().should('eq', 'Your Cart');

            cartPage.getCartItems().then(cartItems => {
                expect(cartItems.length).to.equal(productsToAdd.length);

                productsToAdd.forEach(product => {
                    expect(cartItems).to.include(product);
                    cartPage.isItemInCart(product).should('eq', true);
                });
            });

            // Step 4: Remove one item and verify
            const productToRemove = PRODUCTS.SAUCE_LABS_BIKE_LIGHT;
            cartPage.removeItem(productToRemove);

            cartPage.getCartItems().then(updatedCartItems => {
                expect(updatedCartItems.length).to.equal(productsToAdd.length - 1);
                expect(updatedCartItems).to.not.include(productToRemove);
            });

            cartPage.isItemInCart(productToRemove).should('eq', false);
            productsPage.getCartItemCount().should('eq', productsToAdd.length - 1);

            // Step 5: Navigate to Checkout Information
            cartPage.proceedToCheckout();
            checkoutStepOnePage.waitForPageLoad();

            checkoutStepOnePage.getPageTitle().should('eq', 'Checkout: Your Information');

            // Fill checkout information
            checkoutStepOnePage.fillCheckoutInformation(
                CHECKOUT_INFO.VALID.firstName,
                CHECKOUT_INFO.VALID.lastName,
                CHECKOUT_INFO.VALID.postalCode
            );
            checkoutStepOnePage.clickContinue();

            // Step 6: Verify Checkout Step Two
            checkoutStepTwoPage.waitForPageLoad();
            checkoutStepTwoPage.getPageTitle().should('eq', 'Checkout: Overview');

            // Validar que los productos correctos están en el summary
            checkoutStepTwoPage.getCartItems().then(summaryItems => {
                expect(summaryItems).to.include(PRODUCTS.SAUCE_LABS_BACKPACK);
                expect(summaryItems).to.include(PRODUCTS.SAUCE_LABS_BOLT_TSHIRT);
                expect(summaryItems).to.not.include(PRODUCTS.SAUCE_LABS_BIKE_LIGHT);
            });

            // Validar cálculo de totales
            checkoutStepTwoPage.calculateExpectedTotal().then(expectedTotal => {
                checkoutStepTwoPage.getTotalValue().should('eq', expectedTotal);
            });

            // Step 7: Finish checkout
            checkoutStepTwoPage.clickFinish();

            // Step 8: Verify Checkout Complete Page
            checkoutCompletePage.waitForPageLoad();
            checkoutCompletePage.getPageTitle().should('eq', 'Checkout: Complete!');

            checkoutCompletePage.isOrderCompleted().should('eq', true);
            checkoutCompletePage.isSuccessPage().should('eq', true);

            // Step 9: Navigate back home
            checkoutCompletePage.clickBackHome();
            cy.url().should('include', 'inventory');
        });
    });
});
