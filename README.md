# SauceDemo Cypress TypeScript Automation

This project contains automated tests for **SauceDemo** using **Cypress 15.0.0 with TypeScript**. It follows the Page Object Model pattern and provides comprehensive E2E testing coverage for the SauceDemo e-commerce application.

## 🚀 Features

- ✅ **Cypress 15.0.0** - Latest version with performance improvements
- ✅ **TypeScript** - Full type safety and IntelliSense support
- ✅ **Page Object Model** - Clean, maintainable test architecture
- ✅ **Comprehensive Test Coverage** - Login, products, cart, and checkout flows
- ✅ **CI/CD Ready** - GitHub Actions integration
- ✅ **Cross-browser Testing** - Chrome, Firefox, and Edge support

## 📂 Project Structure

```
saucedemo-cypress/
├── cypress/
│   ├── e2e/                    # End-to-end test specifications
│   │   ├── login.cy.ts         # Login functionality tests
│   │   ├── products.cy.ts      # Product page tests
│   │   └── e2e-flow.cy.ts      # Complete shopping flow test
│   ├── fixtures/               # Test data and mock files
│   │   └── users.ts            # User credentials and test data
│   ├── pages/                  # Page Object Model classes
│   │   ├── LoginPage.ts        # Login page interactions
│   │   ├── ProductsPage.ts     # Products page interactions
│   │   ├── CartPage.ts         # Shopping cart interactions
│   │   ├── CheckoutStepOnePage.ts    # Checkout information form
│   │   ├── CheckoutStepTwoPage.ts    # Order review and totals
│   │   └── CheckoutCompletePage.ts   # Order confirmation
│   └── support/                # Cypress support files
│       ├── commands.ts         # Custom commands
│       ├── component.ts        # Component testing support
│       └── e2e.ts             # Global configurations
├── .github/workflows/
│   └── cypress.yml            # CI/CD pipeline configuration
├── cypress.config.ts          # Cypress configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Project dependencies and scripts
├── .gitignore               # Git ignore rules
└── README.md                # Project documentation
```

## 🛠️ Prerequisites

- **Node.js** (LTS version recommended)
- **npm** or **yarn**
- **Git**

## 📦 Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd saucedemo-cypress
```

2. **Install dependencies:**
```bash
npm install
```

3. **Verify Cypress installation:**
```bash
npx cypress verify
```

## 🚀 Running Tests

### Interactive Mode (Cypress Test Runner)
```bash
npm run test:open
# or
npx cypress open
```

### Headless Mode (Command Line)
```bash
npm run test:run
# or
npx cypress run
```

### Browser-Specific Execution
```bash
npm run test:chrome    # Run tests in Chrome
npm run test:firefox   # Run tests in Firefox
npm run test:edge      # Run tests in Edge
```

### Headed Mode (See Browser Window)
```bash
npm run test:headed
```

### Run Specific Test File
```bash
npm run test:spec cypress/e2e/login.cy.ts
```

## 🧪 Test Suites

### 1. **Login Tests** (`login.cy.ts`)
Tests user authentication functionality:
- ✅ Successful login with valid credentials
- ✅ Error handling for locked out users
- ✅ Invalid credentials validation
- ✅ Missing username/password validation
- ✅ Form field clearing and state management

### 2. **Products Tests** (`products.cy.ts`)
Tests product catalog functionality:
- ✅ Product display and information
- ✅ Add products to shopping cart
- ✅ Remove products from cart
- ✅ Multiple product selection
- ✅ Cart counter updates

### 3. **E2E Shopping Flow** (`e2e-flow.cy.ts`)
Complete end-to-end shopping experience:
- ✅ User login → Product selection → Cart management
- ✅ Checkout process with form validation
- ✅ Order total calculations and tax verification
- ✅ Order completion and confirmation
- ✅ Navigation flow validation

## 🏗️ Architecture

### Page Object Model Implementation
Each page is represented by a TypeScript class that encapsulates:
- **Locators**: Element selectors (both static and dynamic)
- **Actions**: User interactions (clicks, typing, navigation)
- **Getters**: Data retrieval methods
- **Validation**: Element state checking

```typescript
class LoginPage {
  private usernameInput: string;
  private passwordInput: string;
  
  constructor() {
    this.usernameInput = '[data-test="username"]';
    this.passwordInput = '[data-test="password"]';
  }
  
  login(username: string, password: string) {
    cy.get(this.usernameInput).type(username);
    cy.get(this.passwordInput).type(password);
    cy.get(this.loginButton).click();
  }
}
```

### Test Data Management
Centralized test data in `fixtures/users.ts`:
```typescript
export const USERS = {
  STANDARD: { username: 'standard_user', password: 'secret_sauce' },
  LOCKED_OUT: { username: 'locked_out_user', password: 'secret_sauce' }
};
```

## 🔧 Configuration

### Cypress Configuration (`cypress.config.ts`)
- **Base URL**: https://www.saucedemo.com
- **Viewport**: 1280x720
- **Timeouts**: Optimized for stability
- **Retries**: Configured for CI/CD reliability
- **Video Recording**: Enabled for debugging

### TypeScript Configuration
- **Target**: ES2020 for modern JavaScript features
- **Strict Mode**: Enabled for type safety
- **Module Resolution**: Node.js style

## 📈 CI/CD Integration

GitHub Actions workflow provides:
- ✅ **Automated Testing** on push and pull requests
- ✅ **Multi-browser Testing** (Chrome, Firefox, Edge)
- ✅ **Artifact Collection** (screenshots, videos)
- ✅ **Test Reports** with detailed results
- ✅ **PR Comments** with test status

## 🎯 Available Scripts

```bash
npm run test:open      # Open Cypress Test Runner
npm run test:run       # Run tests in headless mode
npm run test:chrome    # Run tests in Chrome browser
npm run test:firefox   # Run tests in Firefox browser
npm run test:edge      # Run tests in Edge browser
npm run test:headed    # Run tests with visible browser
npm run test:spec      # Run specific test file
npm run clean          # Clean screenshots and videos
npm run cy:run         # Direct cypress run command
npm run cy:open        # Direct cypress open command
```

## 🐛 Debugging

### Visual Debugging
```bash
npm run test:headed    # Watch tests execute in real browser
```

### Cypress Test Runner
The interactive test runner provides:
- **Time Travel**: Step through each command
- **DOM Snapshots**: See page state at each step
- **Network Requests**: Monitor API calls
- **Console Logs**: View application logs

### Screenshots and Videos
- **Screenshots**: Automatically captured on test failures
- **Videos**: Recorded for all test runs
- **Location**: `cypress/screenshots/` and `cypress/videos/`

## 📊 Test Reports

### Local Reports
Cypress generates HTML reports with:
- Test execution summaries
- Error details and stack traces
- Screenshots of failures
- Performance metrics

### CI/CD Reports
GitHub Actions provides:
- Test result summaries in PR comments
- Downloadable artifacts (videos, screenshots)
- Historical test trends
- Browser compatibility results

## 🌐 Application Under Test

**SauceDemo** (https://www.saucedemo.com) is a sample e-commerce application featuring:
- User authentication system
- Product catalog with filtering
- Shopping cart functionality  
- Multi-step checkout process
- Order confirmation system

### Test Users Available:
- `standard_user` - Normal user with full access
- `locked_out_user` - Blocked user for error testing
- `problem_user` - User with UI issues for edge case testing
- `performance_glitch_user` - User with slow page loads

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch** (`git checkout -b feature/new-test`)
3. **Commit changes** (`git commit -am 'Add new test scenario'`)
4. **Push to branch** (`git push origin feature/new-test`)
5. **Create Pull Request**

### Code Standards
- **TypeScript**: Use strict typing
- **Page Objects**: Keep locators and actions separate
- **Test Structure**: Follow AAA pattern (Arrange, Act, Assert)
- **Naming**: Use descriptive test and method names
- **Documentation**: Comment complex logic

## 📝 Best Practices

- **Test Independence**: Each test should run independently
- **Data Management**: Use fixtures for test data
- **Error Handling**: Include negative test scenarios
- **Assertions**: Use meaningful assertion messages
- **Maintenance**: Keep tests updated with application changes

## 🚨 Troubleshooting

### Common Issues
- **TypeScript errors**: Run `npx tsc --noEmit` to check types
- **Cypress not opening**: Verify installation with `npx cypress verify`
- **Test failures**: Check screenshots in `cypress/screenshots/`
- **Slow tests**: Optimize wait strategies and selectors

### Getting Help
- Check [Cypress Documentation](https://docs.cypress.io/)
- Review test videos for failure analysis
- Examine console logs during test execution
- Use Cypress Test Runner for interactive debugging

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Automated testing made simple with Cypress and TypeScript** 🎉