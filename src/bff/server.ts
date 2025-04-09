import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Fastify, { FastifyInstance } from 'fastify';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { fastifyApolloDrainPlugin, fastifyApolloHandler } from '@as-integrations/fastify';
import { typeDefs } from './schemaLoader.js';
import { weatherResolver } from './resolvers/weatherResolver.js';
import { stocksResolver } from './resolvers/stocksResolver.js';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
config({ path: join(__dirname, '../../.env') });

async function startServer() {
    try {
        const fastify: FastifyInstance = Fastify({
            logger: true,
        });

        const server = new ApolloServer({
            typeDefs,
            resolvers: {
                Query: {
                    ...weatherResolver.Query,
                    ...stocksResolver,
                },
            },
            plugins: [
                ApolloServerPluginDrainHttpServer({ httpServer: fastify.server }),
                fastifyApolloDrainPlugin(fastify),
            ],
        });

        await server.start();

        // Add GraphQL route using Apollo's Fastify integration
        fastify.post('/graphql', fastifyApolloHandler(server));

        await fastify.listen({ port: 4000, host: '0.0.0.0' });
        console.log(`🚀 Server ready at http://localhost:4000/graphql`);
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
}

startServer().catch((err) => {
    console.error('Unhandled error in server startup:', err);
    process.exit(1);
});
