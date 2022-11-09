const { defineConfig } = require("cypress");
const pg = require("pg");
const mysql = require("mysql");

const connections = {
  postgres: {
    host: "localhost",
    user: "postgres",
    password: "postgres",
    database: "testdb",
    port: 5432,
  },
  mysql: {
    host: "localhost",
    user: "sqluser",
    password: "password",
    database: "testdb",
  },
};

// querying the database from Node
function queryDB(connectionInfo, query) {
  const connection = mysql.createConnection(connectionInfo);

  connection.connect();

  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }

      connection.end();

      return resolve(results);
    });
  });
}

module.exports = defineConfig({
  pageLoadTimeout: 20000,
  waitForAnimations: true,
  animationDistanceThreshold: 10,
  chromeWebSecurity: false,
  videoCompression: 15,
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    reporterEnabled: "mochawesome",
    screenshotOnRunFailure: true,
    screenshotsFolder: "cypress/reports/mocha/screenshots",
    mochawesomeReporterOptions: {
      reportDir: "cypress/reports/mocha",
      quite: true,
      overwrite: false,
      html: false,
      json: true,
    },
  },
  // retries: {
  //   runMode: 1,
  //   openMode: 1
  // },

  e2e: {
    setupNodeEvents(on, config) {

      const cucumber = require('cypress-cucumber-preprocessor').default
      const browserify = require('@cypress/browserify-preprocessor');
      const resolve = require('resolve');
      const options = {
        ...browserify.defaultOptions,
        typescript: require.resolve('typescript'),
      };
      on('file:preprocessor', cucumber(options));
      
      var _ = require("underscore");
      on("after:spec", (spec, results) => {
        if (results && results.video) {
          // Do we have failures for any retry attempts?
          const failures = _.some(results.tests, (test) => {
            return _.some(test.attempts, { state: "failed" });
          });
          if (!failures) {
            // delete the video if the spec passed and no tests retried
            return delete results.video;
          }
        }
      });
      on("task", {
        DATABASE({ dbConfig, sql, values }) {
          // const pool = new pg.Pool(config.db);
          const pool = new pg.Pool(dbConfig);
          try {
            return pool.query(sql, values);
          } catch (e) {}
        },
      });
      on("task", {
        // destructure the argument into the individual fields
        queryDatabase({ dbName, query }) {
          const connectionInfo = connections[dbName];

          if (!connectionInfo) {
            throw new Error(`Do not have DB connection under name ${dbName}`);
          }

          return queryDB(connectionInfo, query);
        },
      });
    },
    specPattern: [
      "cypress/integration/**/*.cy.js",
      "cypress/e2e/**/*.cy.js",
      "**/*.{feature,features}",
    ],

    // Define to ignore spec files
    excludeSpecPattern: ["cypress/e2e/w3Schools.cy.js", "cypress/integration/b*.feature"]
  },
  env: {
    DB: {
      user: "postgres",
      host: "127.0.0.1",
      database: "testdb",
      password: "postgres",
      port: 5432,
    },
  },
});
