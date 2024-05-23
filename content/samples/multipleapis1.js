async function getCharmandar(){
  const pokemonListUrl = "https://pokeapi.co/api/v2/pokemon"

  // get list of pokemon
  const response = await fetch(pokemonListUrl)
  const pokeList = await response.json()

  // find charmander in the array of pokemon
  const charmanderEntry = pokeList.find((poke) => poke.name === "charmandar")

  // request the charmandar data
  const response2 = await fetch(charmanderEntry.url)
  const charmander = await response2.json()

  // use the charmandar data as desired
}
getCharmandar()