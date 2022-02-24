//Include Packages
const express = require('express');
const mongoose = require("mongoose");
const helmet = require('helmet');
const bodyParser = require('body-parser');
const Logger = require('./config/winston');
const logger = new Logger();
const _ = require('lodash');

// Health Check setup
const health = require('@cloudnative/health-connect');
const healthcheck = new health.HealthChecker();

// Prometheus client setup
const client = require('prom-client');

//Enable prom-client to expose default applications metric
const collectDefaultMetrics = client.collectDefaultMetrics;

//Define a custom prefix string for applications metrics
collectDefaultMetrics({ prefix : 'nodeserver'});


const histogram = new client.Histogram({
  name : 'http_request_duration_seconds',
  help : 'Duration of HTTP requests in seconds histogram',
  labelNames: ['method', 'handler', 'code'],
  buckets: [0.1, 5, 15, 50, 100, 500],
})


//Include ENV
require('dotenv').config();

//Configuration Files
const config = require('./config/config.json');
const defaultConfig = config.development;
const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];
const finalConfig = _.merge(defaultConfig,environmentConfig);
global.gConfig = finalConfig;

//Cluster Module
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

exports.ProjectPath = __dirname;

var db = '';
async function connectDB(){
//Database Utilities
const makeTheConnection = require('./config/mongooseConnection');
await makeTheConnection().then((result)=>{
  db = result;
},(error)=>{
  db = error
})
}

connectDB();

//Route Utilities
const akuru = require('./reviews/reviews.router');


//INCLUDE THIS BEFORE MOVING TO PRODUCTION
/*if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
      // Create a worker
      cluster.fork();
  }
} else {
}*/

//APP METRICS
const app = express();

const port = global.gConfig.node_port;

app.use(helmet());


app.get('/metrics', async (req, res, next) => {
  res.set('Content-Type', client.register.contentType);
  let responseq = await client.register.metrics();
  res.send(responseq);
});   

app.get('/api/db_connection', async (req, res) => {
  const end = histogram.startTimer();
  const name = req.query.name || 'World';
  try {
    const result = await connectDB();
    res.send({ message: result });
  } catch (err) {
    res.status(500).send({ error: err.toString() });
  }
  res.on('finish', () =>
    end({
      method: req.method,
      handler: new URL(req.url, `http://${req.hostname}`).pathname,
      code: res.statusCode,
    })
  );
});

//Health Check
app.use('/health', health.LivenessEndpoint(healthcheck));

//Readiness  Check
app.use('/ready', health.ReadinessEndpoint(healthcheck))



// Bodyparser middleware, extended false does not allow nested payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//Routes
akuru.routerConfig(app)


app.use(function (err, req, res, next) {
  logger.log(err.stack,'error');
  res.status(500).send('Something broke!')
});




app.listen(port,() => console.log('Node web API ready at '+port));



