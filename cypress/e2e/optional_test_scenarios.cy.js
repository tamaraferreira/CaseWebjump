describe('Cenários opcionais', () => {
  it('Navegar até a página de um produto e adicionar ao carrinho', () => {
    cy.addProdToCartItemPage('Hero Hoodie');
  });

  it('Realizar uma busca de um produto e adicionar ao carrinho', () => {
    cy.searchAndAddToCart('Driven Backpack', 'Driven Backpack');
  });

  it('Lista de pedidos de um usuário', () => {
    cy.fixture('list_orders.json').then((user) => {
      cy.loginListOrders(user.email, user.password);
      cy.viewFirstOrder();
    });
  });
});