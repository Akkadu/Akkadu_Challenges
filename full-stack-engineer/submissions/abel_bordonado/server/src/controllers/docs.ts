import { Request, Response, NextFunction, Router } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import * as components from '../common/docs/components';
import * as parameters from '../common/docs/parameters';
// import * as modelComponents from "../config/docs";

const router = Router();

// -- setup up swagger-jsdoc --
const swaggerDefinition = {
  openapi: '3.0.1',
  components: {},
  parameters: {},
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'API Docs for Akkado Server',
  },
};
const options = {
  swaggerDefinition,
  apis: [path.resolve(__dirname, '*.js')],
};
swaggerDefinition.components = {
  ...swaggerDefinition.components,
  ...components,
  // ...modelComponents Now is empty file, update when adding mobile
};
// console.log("TAG:", options);
swaggerDefinition.parameters = parameters;
const swaggerSpec = swaggerJSDoc(options);

router.get('/swagger.json', async (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

router.get('/', async (req, res, next) => {
  const template = `<!DOCTYPE html>
  <html>
    <head>
      <title>API Docs</title>
      <!-- needed for adaptive design -->
      <meta charset="utf-8"/>
      <link rel="shortcut icon" type="image/x-icon" href="https://quizizz.com/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700" rel="stylesheet">

      <!--
      ReDoc doesn't change outer page styles
      -->
      <style>
        body {
          margin: 0;
          padding: 0;
        }
      </style>
    </head>
    <body>
      <!-- we provide is specification here -->
      <redoc spec-url='docs/swagger.json' expand-responses="all"></redoc>
      <script src="https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js"> </script>
    </body>
  </html>`;
  res.send(template);
});

export default router;
