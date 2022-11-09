import addContext from "mochawesome/addContext";
import './commands'
import postgreSQL from 'cypress-postgresql';
import 'cypress-mochawesome-reporter/register';

postgreSQL.loadDBCommands();

Cypress.on("test:after:run", (test, runnable) => {
  if (test.state === "failed") {
    const screenshot = `assets/${Cypress.spec.name}/${runnable.parent.title} --       ${test.title} (failed).png`;
    addContext({ test }, screenshot);
  }
});
