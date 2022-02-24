/*
*Name : API reviews
*Author : Mike Mwambia
*Date : 18th February 2021
*/
const { ApolloServer }  = require('apollo-server');
const { AppolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require('express');
const http = require('http');

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const MONGODB = process.env.MONGO_DB;
const PORT  = process.env.PORT;

//Resolvers and Type Defination
const resolvers = require('./graphQL/resolvers');
const server = new ApolloServer({
    typeDefs:fs.readFileSync(
        path.join(__dirname,'./graphQL/typeDefs.graphql'),
        'utf8'
      ),
    resolvers
});

//Mongoose connection
mongoose.connect(MONGODB, {useNewUrlParser: true})
.then(() => {
    console.log("MongoDB Connected");
    return server.listen({port: PORT});
})
.then((res) => {
    console.log(`Server running at ${res.url}`)
})
.catch((err)=>{
    console.log(err)
})
