import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const SchemaString = `
    type User {
        _id: ID
        google_id: String
        display_name: String
    }

    type Query {
        currentUser: User
    }

    type Mutation {
        logout: Boolean
    }
`;

export const schema = makeExecutableSchema({
  typeDefs: SchemaString,
  resolvers
});
