// Cypress.on('window:alert', () => true);
// Cypress.on('window:confirm', () => true);
// Cypress.on('window:prompt', () => true);
Cypress.on('uncaught:exception', (err, runnable) => {
  if (
    err.message.includes("Unable to process binding") ||
    err.message.includes("Cannot read properties of undefined")
  ) {
    return false;
  }
  return true;
});

import './commands'