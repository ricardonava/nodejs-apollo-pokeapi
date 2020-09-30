import { ApolloServer } from 'apollo-server'
import PokeAPI from './dataSources'
import typeDefs from './typeDefs'

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves the pokemon from pokemon object above.
const resolvers = {
  Query: {
    // Destructure name from args
    pokemon: (_root: any, { name }: { name: string }, { dataSources }: any) =>
      dataSources.pokeAPI.getAPokemon({ name }),

    pokemonLocations: (
      _root: any,
      { locationsUrl }: { locationsUrl: string },
      { dataSources }: any
    ) => dataSources.pokeAPI.getPokemonLocationNames({ locationsUrl }),

    pokemonEvolutions: (
      _root: any,
      { evolutionsUrl }: { evolutionsUrl: string },
      { dataSources }: any
    ) => dataSources.pokeAPI.getPokemonEvolutions({ evolutionsUrl }),
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
