import { RESTDataSource } from 'apollo-datasource-rest'

export default class PokeAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://pokeapi.co/api/v2/'
  }

  async getAPokemon(name) {
    const result = await this.get(`pokemon/${name}`)
    console.log(result)
    return result
  }

  //   async getMostViewedMovies(limit = 10) {
  //     const data = await this.get('movies', {
  //       per_page: limit,
  //       order_by: 'most_viewed',
  //     })
  //     return data.results
  //   }
}
