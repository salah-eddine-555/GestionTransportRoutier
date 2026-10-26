export default {
    rootDir: "../..",

    testEnvironment: "node",

    collectCoverage: true,

    collectCoverageFrom: [

        "src/controllers/**/*.js",
        "src/services/**/*.js",
        "src/middlewares/**/*.js",
        "src/models/**/*.js",

        "!src/tests/**",
        "!**/node_modules/**"
    ],

    coverageDirectory: "coverage",

    coverageReporters: [
        "text",
        "html"
    ]
};