// Make sure to cache response
// https://developer.mozilla.org/en-US/docs/Web/API/Cache
let pokeapi_url = "https://pokeapi.co/api/v2/"
let pokeapi_pokemon_url = "https://pokeapi.co/api/v2/pokemon/{id or name}/";
let pokeapi_pokemon_tyranitar_url = "https://pokeapi.co/api/v2/pokemon/tyranitar/";
let pokeapi_response;

// Cache.add(request) == fetch(request).push()

caches.open('pokeapi_cache')
    .then( (cache) => {
        cache.add(pokeapi_pokemon_tyranitar_url).then( () => {

        });
});

function fetchPokemon( pokemon ) {
    fetch(pokeapi_pokemon_tyranitar_url)
    .then( (response) => response.json()) // response object contains a representation of the entire HTTP response
                                          // that is why you have to access its json method
                                          // then returns a promise
                                          // refer to using promises:
                                          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
                                          // a promise is a returned object to which you attach callbacks
// promises save you from the pyramid of doom
/*
// Behold the Callback Pyramid of DOOM !!!
doSomething(function (result) {
  doSomethingElse(result, function (newResult) {
    doThirdThing(newResult, function (finalResult) {
      console.log(`Got the final result: ${finalResult}`);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);
*/
// () => x is short for () => {return x; }
    .then( (data) => {
    // javascript check if string length is empty

        console.log(data);
        pokeapi_response = data;
    } ); //.then().then() is a promise chain
    
}



// turn json text response into a javascript object (deserialization)
if (pokeapi_response.length === 0 ){
    // Throw error
    throw "ERROR: Pokeapi_response is empty";
}
else {
    const pokeapi_obj = JSON.parse(pokeapi_response); // ERROR: unexpected character at line 1 column 1
}

console.log("JSON OBJECT:");
console.log(pokeapi_response);
// how to add to html body

html_body = document.getElementById("body");
// `string` = template literal, template string
html_body.appendChild(`<h1>id: ${pokeapi_obj.id}</h1>`);
html_body.appendChild(`<h1>Pokemon of the Day: ${pokeapi_obj.name}</h1>`);
html_body.appendChild(`<h1>Types: ${pokeapi_obj.types}</h1>`);
sprites = pokeapi_obj.sprites;
// <img src="pic_trulli.jpg" alt="Italian Trulli">
html_body.appendChild(`<img src=${sprites.official_artwork.front} alt="pokemon image"`);