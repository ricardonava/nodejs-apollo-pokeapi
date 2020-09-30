export default function makeEvolutionsChain(data: any) {
  const evoChain = []
  let evoData = data.chain

  do {
    const numberOfEvolutions = evoData.evolves_to.length
    evoChain.push(
      evoData.species.name.replace(/^\w/, (c: any) => c.toUpperCase())
    )

    if (numberOfEvolutions > 1) {
      for (let i = 1; i < numberOfEvolutions; i += 1) {
        evoChain.push(
          evoData.evolves_to[i].species.name.replace(/^\w/, (c: any) =>
            c.toUpperCase()
          )
        )
      }
    }

    evoData = evoData.evolves_to[0]
  } while (
    !!evoData &&
    Object.prototype.hasOwnProperty.call(evoData, 'evolves_to')
  )
  console.log(evoChain)
  return evoChain
}
