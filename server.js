const express = require('express');
const {ApolloServer} = require('apollo-server-express')
const app = express();
// const bodyParser = require("body-parser");
// const cors = require('cors')
// app.use(bodyParser.urlencoded({ extended: false}));
// app.use(bodyParser.json())
// app.use(cors());
const {resolvers} = require('./resolvers');
const {typeDefs} = require('./schema');

async function startApolloServer(){
    const server =  new ApolloServer({
        typeDefs,
        resolvers,
    });
    await server.start();
    server.applyMiddleware({app})
    app.listen({port : 3000},() => {
        console.log(`server ready at http://localhost:3000${server.graphqlPath}`)
    });
}
startApolloServer()
// server.start()
