export const typeDefs = `#graphql
  type Weather {
    temperature: Float
    description: String
    location: String
  }

  type Query {
    weather(location: String!): Weather
  }
`;