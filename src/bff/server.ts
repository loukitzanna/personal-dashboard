import Fastify, { FastifyInstance } from 'fastify';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { fastifyApolloDrainPlugin, fastifyApolloHandler } from '@as-integrations/fastify';
import { typeDefs } from './schemaLoader.js';
import { weatherResolver } from './resolvers/weatherResolver.js';

async function startServer() {
    const fastify: FastifyInstance = Fastify();

    const server = new ApolloServer({
        typeDefs,
        resolvers: {
            Query: {
                ...weatherResolver.Query
            }
        },
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer: fastify.server }),
            fastifyApolloDrainPlugin(fastify)
        ]
    });

    await server.start();

    // Add GraphQL route using Apollo's Fastify integration
    fastify.post('/graphql', fastifyApolloHandler(server));

    try {
        await fastify.listen({ port: 4000, host: '0.0.0.0' });
        console.log(`🚀 Server ready at http://localhost:4000/graphql`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

startServer();
