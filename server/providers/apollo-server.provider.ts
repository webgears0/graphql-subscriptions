import { createServer } from "http";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

import resolvers from '../api/resolvers';
import typeDefs from '../api/type-defs';

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
const httpServer = createServer(app);

const webSocketServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

const serverCleanUp = useServer({ schema }, webSocketServer);

const server = new ApolloServer({
  schema,
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),

    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanUp.dispose();
          },
        };
      },
    },
  ],
});

export async function runServer(port: number) {
  await server.start();
  server.applyMiddleware({ app });

  httpServer.listen(port, () => {
    console.log(
      `Query endpoint is running on http://localhost:${port}${server.graphqlPath}`
    );
    console.log(
      `Subscription endpoint is running on ws://localhost:${port}${server.graphqlPath}`
    );
  });
}
