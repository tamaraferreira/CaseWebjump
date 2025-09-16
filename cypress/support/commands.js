import { faker } from '@faker-js/faker';

Cypress.Commands.add('createUser', () => {
  const user = {
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    password: faker.internet.password(10),
    streetAddress: faker.location.streetAddress(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode('#####'),
    phoneNumber: faker.phone.number()
  };
  cy.writeFile('cypress/fixtures/user.json', user, { flag: 'w' });
  return cy.wrap(user);
});

Cypress.Commands.add('createAccount', (user) => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('/');
    cy.contains('Create an Account').should('be.visible').click();
    cy.url({ timeout: 20000 }).should('include', '/customer/account/create');
    cy.get('#firstname', { timeout: 12000 }).type(user.firstName);
    cy.get('#lastname').should('be.visible').type(user.lastName);
    cy.get('#email_address').should('be.visible').type(user.email);
    cy.get('#password').should('be.visible').type(user.password);
    cy.get('#password-confirmation').should('be.visible').type(user.password);
    cy.get('#form-validate button[type="submit"]').click();
    cy.url().should('include', '/customer/account');
    cy.get('.message-success > div').should('contain','Thank you for registering with Main Website Store.');
});

Cypress.Commands.add('loginUser', (user) => {
    cy.visit('/customer/account/logout/');
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('/');
    cy.contains('Sign In').click();
    cy.url().should('include', '/customer/account/login');
    cy.get('#email').should('be.visible').type(user.email);
    cy.get('#pass').should('be.visible').type(user.password);
    cy.get('#send2').click();
    cy.get('.greet.welcome').should('contain', user.firstName);
});

Cypress.Commands.add('addProductCart', (product_name) => {
    cy.visit('/');
    cy.contains('.product-item', product_name).as('product');
    cy.get('@product').trigger('mouseover');
    cy.get('@product').find('.swatch-option.text').then($product_sizes => {
        if ($product_sizes.length > 0) {
        cy.wrap(Cypress._.sample($product_sizes.toArray())).click();
        }
    });

    cy.get('@product').find('.swatch-option.color').then($product_colors => {
        if ($product_colors.length > 0) {
        cy.wrap(Cypress._.sample($product_colors.toArray())).click();
        }
    });

    cy.get('@product').trigger('mouseover');
    cy.get('@product').contains('Add to Cart').click({ force: true });
    cy.get('.message-success').should('contain', `You added ${product_name} to your shopping cart.`);
    cy.get('.counter-number').should('not.have.value', '0');
});

Cypress.Commands.add('addShippingAddress', (user) => {
    cy.visit('/checkout/cart/');
    cy.get('#checkout-loader', { timeout: 20000 }).should('not.exist');
    cy.get('.loading-mask', { timeout: 20000 }).should('not.exist');
    cy.url({ timeout: 20000 }).should('include', '/checkout');
    cy.get('.mark > strong', { timeout: 12000 }).should('be.visible');
    cy.get('.checkout-methods-items > :nth-child(1) > .action > span').should('be.visible').click();
    cy.get('#checkout-step-shipping', { timeout: 20000 }).should('be.visible');
    cy.get('[name="street[0]"]').type(user.streetAddress);
    cy.get('[name="region_id"]').then($select => {
        const options = $select.find('option').not(':first');
        cy.wrap($select).select(Cypress._.sample(options.toArray()).value);
    });
    cy.get('[name="city"]').type(user.city);
    cy.get('[name="postcode"]').type(user.zipcode);
    cy.get('[name="telephone"]').type(user.phoneNumber);

    const random_shipping_methods = ['[name="ko_unique_3"]', '[name="ko_unique_4"]'];
    cy.get(Cypress._.sample(random_shipping_methods)).check();
});

Cypress.Commands.add('checkoutPayment', () => {
    cy.get('.button > span').click();
    cy.url().should('include', '/checkout/#payment');
    cy.get('.payment-method-content > :nth-child(4) > div.primary > .action > span', { timeout: 20000 })
    .should('be.visible').click();
    cy.get('.base').should('contain', 'Thank you for your purchase!');
});

Cypress.Commands.add('loginListOrders', (email, password) => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('/');
    cy.contains('Sign In').click();
    cy.url().should('include', '/customer/account/login');
    cy.get('#email').should('be.visible').type(email);
    cy.get('#pass').should('be.visible').type(password);
    cy.get('#send2').click();
    cy.get('.greet.welcome').should('contain', 'Welcome');
});

Cypress.Commands.add('addProdToCartItemPage', (productName) => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('/');
    cy.contains('.product-item', productName).trigger('mouseover').click();
    cy.get('.swatch-option.text').then($sizes => {
        if ($sizes.length > 0) {
            cy.wrap(Cypress._.sample($sizes.toArray())).click();
        }
    });
    cy.get('.swatch-option.color').then($colors => {
        if ($colors.length > 0) {
            cy.wrap(Cypress._.sample($colors.toArray())).click();
        }
    });
    cy.contains('Add to Cart').click();
    cy.get('.message-success', { timeout: 10000 })
    .should('contain', `You added ${productName} to your shopping cart.`);
});

Cypress.Commands.add('searchAndAddToCart', (searchTerm, productName) => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('/');
    cy.get('#search').type(`${searchTerm}{enter}`);
    cy.get('.product-item').should('have.length.greaterThan', 0);
    cy.get('.product-item').contains(productName).click();
    cy.contains('Add to Cart').should('be.visible').click();
    cy.get('.message-success')
    .should('contain', `You added ${productName} to your shopping cart.`);
});

Cypress.Commands.add('viewFirstOrder', () => {
  cy.get(':nth-child(2) > .customer-welcome > .customer-name > .action').click();
  cy.contains('My Account').invoke('removeAttr', 'target').click();
  cy.url({ timeout: 10000 }).should('include', '/customer/');
  cy.contains('My Orders').click();
  cy.url({ timeout: 10000 }).should('include', '/sales/order/history/');
  cy.get('.column').should('contain', 'My Orders');

  cy.get('tbody tr', { timeout: 10000 }).first().contains('View Order').click();
  cy.url({ timeout: 10000 }).should('include', '/sales/order/view/');
  cy.get('.column > .block > .block-title > strong', { timeout: 10000 })
    .should('contain', 'Order Information');
});