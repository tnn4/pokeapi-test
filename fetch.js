// RUN



// DATA

const pokeapi_url = "https://pokeapi.co/api/v2/"
// "https://pokeapi.co/api/v2/pokemon/{id or name}/"
const pokeapi_pokemon_url = "https://pokeapi.co/api/v2/pokemon/";

// FUNCTION //

function main() {

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
    printPageTitle("Simple Pokedex");

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
    let id = pokeapi_obj.id;
    let _name = pokeapi_obj.name;
    console.log(`_name: ${_name}`);
    // var sprites = pokeapi_obj.sprites; // sprites is undefined
    // var sprites_other_official_artwork = sprites.other["official-artwork"];

    let html_body = document.getElementById("container1"); // html_body is null
    // `string ${variable}` = template literal, template string
    let node = html_body.appendChild(document.createElement('h1')); // argument 1 is not an object, https://stackoverflow.com/questions/38277713/argument-1-of-node-appendchild-is-not-an-object-when-trying-to-append-basic-html

    node.appendChild(content);
}

function printPageTitle(title) {
    let titleDiv = document.getElementById("title");
    let node = titleDiv.appendChild(document.createElement('h1'));
    node.appendChild(document.createTextNode(title));
}

function getPokemonName(name){
    // check if url is valid
}

function fetchPokemonUrl( pokemon_url ) {
    
    console.log(`attempting to fetch from: ${pokemon_url}`);

    return fetch( pokemon_url )
    .then( (response) => response.json()) // you can rewrite promise chains with async functions
    // response object contains a representation of the entire HTTP response
                                          // that is why you have to access its json method
                                          // then returns a promise
                                          // refer to using promises:
                                          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
                                          // a promise is a returned object to which you attach callbacks

// () => x is short for () => {return x; }
    .then( (data) => {

        console.log(data);
        
        let id = data.id;
        let _name = data.name;
        let sprites = data.sprites;
        let sprites_other_official_artwork = sprites.other["official-artwork"].front_default; // [object Object]
        
        console.log(`artwork data: ${sprites_other_official_artwork}` );
        
        html_body = document.getElementById("container1"); // html_body is null
        // `string` = template literal, template string
        let node = html_body.appendChild(document.createElement('h1')); // argument 1 is not an object, https://stackoverflow.com/questions/38277713/argument-1-of-node-appendchild-is-not-an-object-when-trying-to-append-basic-html
        let content = document.createTextNode(`Pokemon [${id}]: ${_name}`);
        document.createElement('br');
        node.appendChild(content);
        img = document.createElement('img');
        // <img src="pic_trulli.jpg" alt="Italian Trulli"></img>
        img.src = sprites_other_official_artwork;
        node.appendChild(img);
        // content = document.createTextNode(`<img src=\"${sprites_other_official_artwork}\" alt="Image of Pokemon" >`);
        

        // response = data;
    } ); //.then().then() is a promise chain
    
    // return response; WRONG You want to return the previous object, https://stackoverflow.com/questions/50607760/reactjs-typeerror-object-is-undefined
}

// async/await
// async functions allow you to avoid explicitly configure promise chaining
// async functions always return promises, which means functions that don't explicitly return a promise will wrap the value inside a promise

// these are equivalent
async function foo_async() {
    // 1 everything here is run synchronously
    await 1; // 2 progress is suspended and control is given back to foo_async's caller
    // 3 when the first promise is either fulfilled or rejected, control returns to foo_async
    // 4 result of first promise fulfillment is returned from await,
    // 5 the 2nd await expression is evaluated, foo_async if suspended and control returns to caller

    // each await can be thought of as equivalent to then() 
}

function foo() {
    return Promise.resolve(1).then(() => undefined);
}

async function foo2() {
    const result1 = await new Promise((resolve) => // 2 progress is suspended and control is given back to foo_async's caller
      setTimeout(() => resolve("1"))               // 3 when the first promise is either fulfilled or rejected, control returns to foo_async
    );                                             // 4 result of first promise fulfillment is returned from await,
    const result2 = await new Promise((resolve) => // 5 the 2nd await expression is evaluated, foo_async if suspended and control returns to caller
      setTimeout(() => resolve("2"))
    );
}

/*
async function async_example() {
    await // -> exit, variable time t1
    resolve <- come back
    await // -> exit, variable time t2
    resolve // <- come back
    // resolved value returned
    // Note how the promise chain is not built-up in one go, it is broken up because it keeps exiting and returning at variable times

}
*/