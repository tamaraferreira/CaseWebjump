# Case de automação de testes - Webjump

Este repositório contém o exercício de automação de teste web desenvolvido em **Cypress** e **JavaScript**.  

### Cenários automatizados

**Fluxo de compra:**
- Cadastro de novo usuário; 
- Login;
- Adicionar produto ao carrinho;
- Finalizar compra;

**Validações opcionais:**
- Adicionar item ao carrinho a partir da página do produto;
- Adicionar item ao carrinho a partir de uma pesquisa feita no campo de busca;
- Listar os pedidos de um usuário e detalhar um destes pedidos;

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) - Versão recomendada: 18 ou superior;
- [Google Chrome](https://www.google.com/chrome/) - Versão mais recente;
- [Git](https://git-scm.com/) instalado e configurado na sua máquina;

---

## Configuração e execução dos testes

1. Clone o repositório do GitHub:

```bash
git clone https://github.com/tamaraferreira/CaseWebjump.git
```

2. Navegue até a pasta do projeto e instale as dependências
```bash
cd CaseWebjump
npm install cypress --save-dev
```

3. Os testes foram divididos em dois arquivos diferentes:
- principal_shopping_flow.cy.js
- optional_test_scenarios.cy.js

### Executando os testes:

**Modo interativo (headed):**
```bash
npx cypress open
```

- Selecione o Google Chrome como navegador;
- Clique em "Start E2E Testing";
- Escolha qual arquivo .cy.js deseja executar;

**Modo headed (visual, com navegador aberto):**
```bash
npm run run:headed
```

- Executa os dois arquivos um seguido do outro, permitindo acompanhar a execução;

**Modo headless (sem abrir navegador):**
```bash
npm run run
```

- Executa os dois arquivos um seguido do outro automaticamente;
