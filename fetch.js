

let pokeapi_url = "https://pokeapi.co/api/v2/"
let pokeapi_pokemon_url = "https://pokeapi.co/api/v2/pokemon/{id or name}/";
let pokeapi_pokemon_tyranitar_url = "https://pokeapi.co/api/v2/pokemon/tyranitar/";
let pokeapi_response;
let pokeapi_obj;

// Make sure to cache responses
// https://developer.mozilla.org/en-US/docs/Web/API/Cache
// Cache.add(request) is equivalent to  fetch(request) and Cache.put()
/*
caches.open('pokeapi_cache')
    .then( (cache) => {
        cache.add(pokeapi_pokemon_tyranitar_url).then( () => {
            console.log(`${pokeapi_pokemon_tyranitar_url} is cached`);
        });
});
*/

pokeapi_response = fetchPokemonUrl(pokeapi_pokemon_tyranitar_url);
console.log( typeof pokeapi_response );

// turn json text response into a javascript object (deserialization)
if (pokeapi_response.length === 0 ){ // ERROR: poekapi_response is undefined
    // Throw error
    throw "ERROR: Pokeapi_response is empty";
}
else {
    // pokeapi_obj = JSON.parse(pokeapi_response); // ERROR: unexpected character at line 1 column 2, https://stackoverflow.com/questions/38412574/syntaxerror-json-parse-unexpected-character-at-line-1-column-2-of-the-json
    pokeapi_obj = pokeapi_response;// FIX?
}

console.log("JSON:");
console.log(`pokeapi_response: ${pokeapi_response}`); // pokeapi_response is a Promise object
// how to add to html body
var id = pokeapi_obj.id;
var _name = pokeapi_obj.name;
console.log(`_name: ${_name}`);
var sprites = pokeapi_obj.sprites; // sprites is undefined
var sprites_other_official_artwork = sprites.other["official-artwork"];

var html_body = document.getElementById("container1"); // html_body is null
// `string` = template literal, template string
var node = html_body.appendChild(document.createElement('h1')); // argument 1 is not an object, https://stackoverflow.com/questions/38277713/argument-1-of-node-appendchild-is-not-an-object-when-trying-to-append-basic-html
var content = document.createTextNode(`Pokemon ${id}: ${_name}`);
node.appendChild(content);
html_body.appendChild(document.createElement('img'));

// <img src="pic_trulli.jpg" alt="Italian Trulli">



// FUNCTION // 
function fetchPokemonUrl( pokemon_url ) {
    // let response;
    
    return fetch( pokemon_url )
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
        let id = data.id;
        let _name = data.name;
        let sprites = data.sprites;
        let sprites_other_official_artwork = sprites.other["official-artwork"];
        html_body = document.getElementById("container1"); // html_body is null
        // `string` = template literal, template string
        let node = html_body.appendChild(document.createElement('h1')); // argument 1 is not an object, https://stackoverflow.com/questions/38277713/argument-1-of-node-appendchild-is-not-an-object-when-trying-to-append-basic-html
        let content = document.createTextNode(`Pokemon ${id}: ${_name}`);
        node.appendChild(content);

        
        // response = data;
    } ); //.then().then() is a promise chain
    
    // return response; WRONG You want to return the previous object, https://stackoverflow.com/questions/50607760/reactjs-typeerror-object-is-undefined
}