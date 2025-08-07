import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('cypress-plugin-tab/src/plugin')(on, config)
    },
    supportFile: 'cypress/support/e2e.js'
  },
})
