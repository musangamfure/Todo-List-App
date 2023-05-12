'jest-environment-jsdom';

module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['./src/index.css'],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
  resolver: undefined,
  setupFiles: ['<rootDir>/test-setup.js'],
};
