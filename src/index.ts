import { ApolloServer, gql } from 'apollo-server'
import PokeAPI from './dataSources'

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Pokemon" type defines the queryable fields for a pokemon in our data source.
  type Pokemon {
    name: String
    id: Int
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "pokemon" query returns a Pokemon (defined above).
  type Query {
    pokemon(name: String!): Pokemon
  }
`
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves the pokemon from pokemon object above.
const resolvers = {
  Query: {
    pokemon: (root, { name }, { dataSources }) =>
      dataSources.pokeAPI.getAPokemon(name),
  },
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    pokeAPI: new PokeAPI(),
  }),
})

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
