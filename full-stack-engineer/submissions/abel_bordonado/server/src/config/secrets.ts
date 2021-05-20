import dotenv from "dotenv";
import fs from "fs";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const envFile = `.env`;

if (fs.existsSync(envFile)) {
  console.log(`  Using ${envFile} file to supply config environment variables`);
  dotenv.config({ path: envFile });
} else {
  throw new Error(`  Env file ${envFile} not found.`);
}
export const ENVIRONMENT = process.env.NODE_ENV;

const REQUIRED_ENV = [] as string[];

const notSet = REQUIRED_ENV.filter((key) => process.env[key] === undefined);

if (notSet.length > 0) {
  console.error("Missing some required env variables: " + notSet.join(","));
  process.exit(1);
}
