/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Express } from "express";
import dotenv from "dotenv";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import router from "./routes/index";

// eslint-disable-next-line no-var
global.__basedir = __dirname;

dotenv.config();

const app: Express = express();
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(cors());


const port = process.env.PORT || 5000;

app.use(router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

export default app;
