module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 54,
      lines: 69,
      statements: 69,
    },
  },
  setupFilesAfterEnv: ['<rootDir>/config/setupTests.ts'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleNameMapper: {
    // Mock CSS/LESS modules. Source:
    // https://jestjs.io/docs/en/next/webpack#mocking-css-modules
    '\\.module\\.(css|less)$': 'identity-obj-proxy',
  },
}
