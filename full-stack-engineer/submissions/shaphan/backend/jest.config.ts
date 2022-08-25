import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  automock: true,
  testPathIgnorePatterns: ["<rootDir>/(build|docs|dist|node_modules)/"],
};
export default config;
