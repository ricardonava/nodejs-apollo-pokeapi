import { RESTDataSource } from 'apollo-datasource-rest'
import makeEvolutionsChain from './utils/makeEvolutionsChain'

export default class PokeAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://pokeapi.co/api/v2/'
  }

  getAPokemon = async ({ name: pokemonName }: { name: string }) => {
    const {
      name,
      id,
      sprites: {
        other: {
          ['official-artwork']: { front_default: sprite },
        },
      },
      types,
      weight,
      height,
      location_area_encounters: locationUrl,
    } = await this.get(`pokemon/${pokemonName.toLocaleLowerCase()}`)

    // Two step destructuring to handle nullable objects
    const {
      color: { name: color },
      evolution_chain: evolutionChain,
    } = await this.get(`pokemon-species/${id}`)

    const { url: evolutionsUrl } = evolutionChain || {}

    // Check if encounters exists for UI/UX rendering disabled button
    const pokemonLocations = await this.get(locationUrl)

    // Check if evolutions exists for UI/UX rendering disabled button
    const pokemonEvolutions = await this.get(evolutionsUrl)
    console.log(pokemonEvolutions)

    // Create pokemon object to return
    const pokemon = {
      name,
      id,
      sprite,
      types: types.map((type: any) => type.type.name),
      height: weight / 10,
      weight: height / 10,
      // set property conditionally
      locationsUrl: pokemonLocations.length < 1 ? null : locationUrl,
      evolutionsUrl:
        pokemonEvolutions.chain.evolves_to < 1 ? null : evolutionsUrl,
      color,
    }
    return pokemon
  }

  getPokemonLocationNames = async ({
    locationsUrl,
  }: {
    locationsUrl: string
  }) => {
    const locations = await this.get(locationsUrl)
    const locationNames = locations.map((location: any) =>
      location.location_area.name.replace(/-/g, ' ')
    )
    console.log(locationNames)
    return locationNames
  }

  getPokemonEvolutions = async ({
    evolutionsUrl,
  }: {
    evolutionsUrl: string
  }) => {
    const evolutions = await this.get(evolutionsUrl)
    const evoChain = makeEvolutionsChain(evolutions)
    return evoChain
  }
}
