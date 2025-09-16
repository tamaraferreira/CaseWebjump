describe('Fluxo de compra para um novo usuário', () => {
  it('Cadastro, login e compra', () => {
    cy.createUser().then(user => {
      cy.createAccount(user);
      cy.loginUser(user);
      cy.addProductCart('Radiant Tee');
      cy.addShippingAddress(user);
      cy.checkoutPayment();
    })
  });
});