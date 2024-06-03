module.exports = {
    testEnvironment: "node",
    reporters: [
      "default",
      [
        "jest-junit",
        {
          "outputDirectory": "./test-reports",
          "outputName": "junit.xml"
        }
      ]
    ],
    testMatch: ["**/tests/**/*.test.[jt]s?(x)"]
  };
  