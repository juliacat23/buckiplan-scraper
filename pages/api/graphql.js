import { PrismaClient } from '@prisma/client';
import { makeExecutableSchema } from '@graphql-tools/schema';

const prisma = new PrismaClient();

const typeDefs = `
  type User {
    email: String!
    name: String
  }

  type Query {
    allUsers: [User!]!
  }
`;

const resolvers = {
    Query: {
        allUsers: () => {
            return prisma.user.findMany();
        },
    },
};

export const schema = makeExecutableSchema({
    resolvers,
    typeDefs,
});
