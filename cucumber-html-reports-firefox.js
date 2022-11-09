const report = require("multiple-cucumber-html-reporter")
const dayjs = require("dayjs");
const today = dayjs().format("DD MMM YYYY, HH:mm:ss  AZ");

report.generate({
    jsonDir: "cypress/cucumber-json",
    reportPath: "./reports/cucumber-html-report.html",
    displayDuration: true,
    durationInMS: true,
    metadata: {
        browser:{
            name: "firefox",
            version: "91.13",
        },
        device: "Local machine test",
        platform: {
            name: "windows",
            version: "10"
        }
    },
    customData: {
        title: 'Run info',
        data: [
            {label: 'Project', value: 'Custom project'},
            {label: 'Release', value: 'v1.0'},
            {label: 'Cycle', value: 'B11221.34321'},
            {label: 'Execution Start Time', value: today},
            {label: 'Execution End Time', value: 'Nov 19th 2017, 02:56 PM EST'}
        ]
    }
})