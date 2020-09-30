import { RESTDataSource } from 'apollo-datasource-rest'

export default class PokeAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://pokeapi.co/api/v2/'
  }

  async getAPokemon({ name: pokemonName }: { name: string }) {
    const {
      name,
      id,
      sprites,
      types,
      weight,
      height,
      location_area_encounters: location,
    } = await this.get(`pokemon/${pokemonName.toLocaleLowerCase()}`)

    const {
      color: { name: color },
      evolution_chain: { url: evolutionUrl },
    } = await this.get(`pokemon-species/${pokemonName.toLocaleLowerCase()}`)

    const pokemon = {
      name,
      id,
      sprite: sprites.other['dream_world'].front_default,
      types: types.map((type: any) => type.type.name),
      height: weight / 10,
      weight: height / 10,
      location,
      evolutionUrl,
      color,
    }
    console.log(pokemon)
    return pokemon
  }
}
