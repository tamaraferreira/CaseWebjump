const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://magento.nublue.co.uk',
    testIsolation: false,
    browser: "chrome",
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      if (config.browser !== "chrome") {
        console.warn("Aviso: Cypress está rodando em outro navegador, mudando para Chrome.");
        config.browser = "chrome";
      }
      return config;
    },
  },
});