const report = require("multiple-cucumber-html-reporter")

report.generate({
    jsonDir: "cypress/cucumber-json",
    reportPath: "./reports/cucumber-html-report.html",
    metadata: {
        browser:{
            name: "chrome",
            version: "91.13",
        },
        device: "Local machine test",
        platform: {
            name: "window",
            version: "10"
        }
    }
})