const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function putTrainersOnPage(trainers) {
// console log the json to see what the data is
  // console.log(trainers)
  // debugger
// what to attach to
  const trainersDiv = document.getElementById('trainers')

  trainers.forEach(function(trainer ) {
    // create the div that the comment like count will be stored in
    const node = document.createElement("div")

    node.className = "card"
    node.setAttribute('data-id' , `${trainer.id}`)
    node.id= trainer.id;

    // store the trainer name in innerHTML
    node.innerHTML = `<p>${trainer.name}</p>
      <button data-trainer-id= ${trainer.id} class= "addPoke">Add Pokemon</button>
      <ul></ul>`
    // new forEach for pokemon only
    trainersDiv.appendChild(node);
    // debugger
    // append the pokemon info to this
    const pokeList = document.getElementById(trainer.id).getElementsByTagName("ul")[0]

    trainer.pokemons.forEach(function(pokemon) {
      // concatenate to the innerHTML
       let pokeItem = `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id} >Release</button></li>`
       pokeList.innerHTML += pokeItem;

      })

  })
}

// Release a pokemon
const appContent = document.getElementById("trainers")
// create a event delegation for the release button
appContent.addEventListener('click', function(event) {
  const release = event.target.className === 'release'

  if (release) {
    event.target.parentElement.remove()
    // debugger

    const pokemonId = event.target.dataset.pokemonId

    const newPOKEMONS_URL = POKEMONS_URL + `/${pokemonId}`

    fetch(newPOKEMONS_URL, {
      method: "delete"
    })
      // .then(response => response.json())
      // .then(putPokesOnPage);

  }
});

//make a GET reqeust
fetch(TRAINERS_URL)
  .then(r => r.json())
  .then(putTrainersOnPage)


// Add a pokemon
// getAttribute grabs key not value
// const addPokeBtn = document.querySelectorAll("#addPoke")
// create a event delegation for the release button
appContent.addEventListener('click', function(event){

  const addPokeBtn = event.target.className === 'addPoke'

  if (addPokeBtn) {
  // make a POST request to add a new pokemon
  fetch(POKEMONS_URL, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      // pokemons: {
      //   id: pokeid++
      // }
       trainer_id: event.target.dataset.trainerId
    })
  })
    .then(response => response.json())
    .then(putPokesOnPage);

}
}
);
// this is the Response#=> Example Response
// {
//   "id":147,
//   "nickname":"Gunnar",
//   "species":"Weepinbell",
//   "trainer_id":1
// }
function putPokesOnPage(pokemon) {
console.log(pokemon)
// what to attach to
// the end of the list of Pokemon of the particular trainer
  // const cardDiv = document.getElementsByTagName('div').getAttribute("data-id")
  const pokeAddList = document.getElementById(pokemon.trainer_id).getElementsByTagName("ul")[0]

  // concatenate to the innerHTML
   let pokeItem = `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id} >Release</button></li>`
   pokeAddList.innerHTML += pokeItem;

}
