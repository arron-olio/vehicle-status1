module.exports = {
  preset: "@testing-library/react-native",
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  testMatch: ["<rootDir>/__tests__/**/*.test.js"],
};
