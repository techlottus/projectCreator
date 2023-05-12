const sonarqubeScanner = require("sonarqube-scanner");

sonarqubeScanner({
  serverUrl: process.env.SQ_URL,
  options: {
    "sonar.projectKey": process.env.SQ_PROJECT_KEY,
    "sonar.projectName": process.env.SQ_PROJECT_NAME,
    "sonar.sources": "./src",
    "sonar.exclusions": "*.test.js",
    "sonar.javascript.lcov.reportPaths": "./coverage/lcov.info",
  },
});