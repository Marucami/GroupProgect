module.exports = {
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(dom7|swiper)/)",
  ],
  moduleNameMapper: {
    "^lodash-es$": "lodash",
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
};