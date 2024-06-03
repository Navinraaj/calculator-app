module.exports = {
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageReporters: ["lcov", "text"],
    testEnvironment: "node",
    reporters: [
      "default",
      [
        "jest-junit",
        {
          outputDirectory: "test-reports",
          outputName: "junit.xml"
        }
      ]
    ]
  };
  