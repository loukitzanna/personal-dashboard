import Fastify, { FastifyInstance } from 'fastify';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { typeDefs } from './schema';
import { weatherResolver } from './resolvers/weatherResolver';

async function startServer() {
    const fastify: FastifyInstance = Fastify();

    const server = new ApolloServer({
        typeDefs,
        resolvers: {
            Query: {
                ...weatherResolver.Query
            }
        },
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer: fastify.server })]
    });

    await server.start();

    // Add GraphQL route
    fastify.post('/graphql', async (request, reply) => {
        try {
            const { query, variables, operationName } = request.body as any;

            const response = await server.executeOperation({
                query,
                variables,
                operationName,
            });

            return response;
        } catch (error) {
            reply.code(500).send(error);
        }
    });

    try {
        await fastify.listen({ port: 4000, host: '0.0.0.0' });
        console.log(`🚀 Server ready at http://localhost:4000/graphql`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

startServer();