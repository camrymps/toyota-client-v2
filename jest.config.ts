import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest/presets/default-esm",
  verbose: true,
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "<rootDir>/coverage",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  moduleNameMapper: {
    "(.+)\\.js": "$1",
  },
};

export default config;
