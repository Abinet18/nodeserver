import Express from "express";
import mongoose, { Connection } from 'mongoose';
import BodyParser from "body-parser";
import * as dotenv from 'dotenv';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import blogRoutes from './routes/blogs';
import productRoutes from './routes/products'
import cors from "cors";
// Importing the required modules
import WebSocketServer from 'ws';
import { createProducer } from "./kafka/Producer";
import { startConsumer } from "./kafka/Consumer";
import { authenticateRedis } from "./cache/cache";
import graphql from 'graphql';
import { graphqlHTTP } from 'express-graphql';
import { schema } from "./graphql/graphql";


dotenv.config();
const PORT = 5001;
const DB_URL = process.env.DB_URL;

import { SubscriptionServer } from 'subscriptions-transport-ws';
const subscriptionsEndpoint = `ws://localhost:${PORT}/subscriptions`;

const app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(cors());
// let db;
app.use('/blogs', blogRoutes);
app.use('/products', productRoutes);


// app.use('/graphql', graphqlHTTP({
//     schema,
//     graphiql: true,
// }))
// app.use('/graphql', graphqlExpress(() => ({
//     schema: schema,
//     subscriptionsEndpoint: subscriptionsEndpoint,
//     graphiql: true
// })));

// app.use('/graphiql', graphiqlExpress({
//     endpointURL: '/graphql',
//     subscriptionsEndpoint: subscriptionsEndpoint
// }));
//Connect to DB

authenticateRedis();
const server = createServer(app);
const subscriptionServer = SubscriptionServer.create({
    // This is the `schema` we just created.
    schema,
    // These are imported from `graphql`.
    execute,
    subscribe,
}, {
    // This is the `httpServer` we created in a previous step.
    server: server,
    // Pass a different path here if your ApolloServer serves at
    // a different path.
    path: '/graphql',
});

const apolloServer = new ApolloServer({
    schema,
    plugins: [{
        async serverWillStart() {
            return {
                async drainServer() {
                    subscriptionServer.close();
                }
            };
        }
    }],

});
(async function () {
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
})();


server.listen(PORT, async () => {
    const db = await mongoose.connect(DB_URL as string);
    if (db) {
        console.log('db connected');
    }
    // new SubscriptionServer({
    //     execute,
    //     subscribe,
    //     schema
    // }, {
    //     server: server,
    //     path: '/subscriptions'
    // })
    console.log('server running on port ', PORT);
});

// const producer = createProducer('test');
// startConsumer();

// Creating a new websocket server
// const wss = new WebSocketServer.Server({ port: 8090 })
// let clientId = 1;
// let clients = new Map();

// Creating connection using websocket
// wss.on("connection", (ws: WebSocketServer.WebSocket) => {
//     const wsId = clientId;
//     clientId++;
//     console.log("new client connected", clientId);
//     clients.set(wsId, ws);
//     // sending message
//     ws.on("message", data => {
//         console.log(`Client has sent us: ${data}`)
//     });
//     // handling what to do when clients disconnects from server
//     ws.on("close", () => {
//         console.log("the client has disconnected");
//         clients.delete(wsId);
//     });
//     // handling client connection error
//     ws.on('error', function () {
//         console.log("Some Error occurred")
//     });
// });
// if (wss) {
//     console.log("The WebSocket server is running on port 8090");
// }

// export function sendToAllClients(message: string) {
//     console.log('Tryint to send update to clients');
//     clients.forEach((client, clientId) => {
//         console.log('Sending to client', clientId);
//         client.send(message);
//     })
// }

export function writeToKafka(message: string) {
    // producer.write(Buffer.from(message));
    console.log('writing to kafka topic');
}
