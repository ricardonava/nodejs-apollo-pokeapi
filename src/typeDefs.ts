import { gql } from 'apollo-server'
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # This "Pokemon" type defines the queryable fields for a pokemon in our data source.
  type Pokemon {
    name: String!
    id: Int!
    sprite: String!
    types: [String]
    height: Float!
    weight: Float!
    location: String!
    evolutionUrl: String
    color: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "pokemon" query returns a Pokemon (defined above).
  type Query {
    pokemon(name: String!): Pokemon
  }
`

export default typeDefs
