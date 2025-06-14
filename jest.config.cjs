module.exports = {
  preset: "ts-jest",

  testEnvironment: "jsdom",

  roots: ["<rootDir>/src"],
  testMatch: ["<rootDir>/src/**/*.{spec,test}.{ts,tsx,js,jsx}"],

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json",
    },
  },
};
