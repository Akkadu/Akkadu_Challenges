import ENV from "./env.json";

type EnvType = {
  name: string;
  baseUrl: string;
};

export const ServerEnv: EnvType = ENV;
