"use strict";


// DATA

// these variables can be referred to in the console (F12)
const page_title = "Pokeapi"
const localhost_url = "http://localhost";
const default_port = 8000;
const localhost_port_url = localhost_url + `:${default_port}`;

const localhost_pokeapi_url = localhost_port_url + "/api/v2";

const localhost_pokeapi_pokemon_url = localhost_port_url + "/api/v2/pokemon/";

const pokeapi_url = "https://pokeapi.co/api/v2/";
// "https://pokeapi.co/api/v2/pokemon/{id or name}/";\
const pokeapi_pokemon_url = "https://pokeapi.co/api/v2/pokemon/";

const maxDexNumber = 905;
const pseudoLegendaries = ["dragonite", "tyranitar", "salamence", "metagross", "garchomp", "hydreigon", "goodra", "kommo-o", "dragapult"];

const pokeapi_pokemon_tyranitar_url = "https://pokeapi.co/api/v2/pokemon/tyranitar/";
const localhost_pokemon_hydreigon_url = "http://localhost:8000/api/v2/pokemon/hydreigon/";

const api_url = [localhost_pokeapi_url, pokeapi_url];

// Refer to promisifying functions
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

var base_api_url;

// RUN
main();

/*
setTimeout(() => {
    document.location.reload();
  }, 5000);
*/ 

// FUNCTION //

function main() {
    // Need to debounce this function call to prevent it from being called too often
    // and prevent overloading the api server

    // Figure out how to cache responses
    let pokeapi_response;
    let pokeapi_pokemon_random_url = pokeapi_pokemon_url + getRandomInt(maxDexNumber);
    let localhost_pokemon_random_url = localhost_pokeapi_url + "/pokemon" + `/${getRandomInt(maxDexNumber)}`;
    let url_to_fetch;

    printPageTitle(page_title);
    createAPISourceOptions("api_source");
    getAPISourceOptions("api_source");

    clearNodeById("container1");

    pokeapi_response = fetchPokeapiResponse(localhost_pokemon_random_url);
    
    console.log( "typeof pokeapi_response: " + typeof pokeapi_response );
}

function fetchPokemonButton() {
    let selected_button;
    let selected_api;
    // get api source
    selected_button = getAPISourceOptions("api_source");
    selected_api = selectAPISource(selected_button);
    console.log(`selected_api: ${selected_api}`);
    // fetch pokemon from source
}

function fetchRandomPokemon() {
    let pokeapi_response;
    let pokeapi_pokemon_random_url = pokeapi_pokemon_url + getRandomInt(maxDexNumber);
    let localhost_pokemon_random_url = localhost_pokeapi_url + "/pokemon" + `/${getRandomInt(maxDexNumber)}`;
    let url_to_fetch;
    clearNodeById("container1");

    pokeapi_response = fetchPokeapiResponse(localhost_pokemon_random_url);
}

function fetchPokemonToButton(node_id){
    
    
    let dex_number = document.getElementById(node_id).value;
    
    clearNodeById("container1");
    
    if (dex_number == null || dex_number == undefined || dex_number === "") {
        console.log("Invalid input, using 1 as default");
        dex_number = 1;
    }
    console.log(`Trying to fetch to pokemon [${dex_number}]`);
    // main();
    fetchPokemonTo(dex_number);

}

function fetchPokemonTo(dex_number) {
    //if (dex_number === NaN || dex_number == undefined || dex_number == null) {
        //console.log("ERROR: Number required");
        //dex_number = 5;
    //}
    let localhost_pokemon_url = localhost_pokeapi_url + "/pokemon";
    let url_to_fetch;
    let pokeapi_response;
    const j = 5;
    // main();
    // ERROR: fetch is async
    for (let i=0 ; i < dex_number; i++) {
        // main();
        url_to_fetch = localhost_pokeapi_url+ "/pokemon/" + `${i+1}`;
        console.log(`url_to_fetch: ${url_to_fetch}`);
        pokeapi_response = fetchPokeapiResponse(url_to_fetch);
        console.log(i);
    }

    /*
    for(let i=0; i<dex_number; i++) {
        url_to_fetch = localhost_pokeapi_pokemon_url+`${i+1}`;
        // console.log(`fetching: ${url_to_fetch} `);
        fetchPokeapiResponse(url_to_fetch); // this errors because it is an async function
    }
    */
}

// REMEMBER promises are always async
function fetchPokeapiResponse( pokemon_url ) {
    /*
    if (pokemon_url.slice(-1) !== "/") {
        pokemon_url = pokemon_url + "/";
    }
    */
    const requestOptions = {
        //mode: "no-cors",
    }
    
    console.log(`attempting to fetch from: ${pokemon_url}`);

    // response object contains a representation of the entire HTTP response
    // that is why you have to access its json method
    // then returns a promise
    // refer to using promises:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
    // a promise is a returned object to which you attach callbacks
    // you can rewrite promise chains with async functions
    // () => x is short for () => {return x; }
    return fetch( pokemon_url )
        .then( (response) => {
            console.log(`Response: ${response}`);
            console.log(`response status: ${response.status}`);
            return response.json(); // WRONG response.json(); RIGHT return response.json() <-- this needs to be returned
            /*
            Normally, you do something like this:

            fetch(...).then(r => r.json()).then(console.log);

            which implicitly returns r.json(), but since you're using () => { ... }, you need to explicitly return. 
            */
        })
        .then( (data) => {
            renderJSON(data);
        })
        .catch( (error) => {
            console.log(`ERROR: ${error}`);
        }); //.then().then() is a promise chain
    
    // return response; WRONG You want to return the previous object, https://stackoverflow.com/questions/50607760/reactjs-typeerror-object-is-undefined
}

function renderJSON(data) {
    console.log("data: " + data);
        
    let id = data.id;
    let _name = data.name;
    let types = data.types;
    let sprites = data.sprites;
    let sprites_other_official_artwork = sprites.other["official-artwork"].front_default; // [object Object]
    let img;

    console.log(`artwork data: ${sprites_other_official_artwork}` );
    
    body1 = document.getElementById("body1");
    body1.appendChild(document.createElement('br'));
    container1 = document.getElementById("container1"); // html_body is null
    
    // `string` = template literal, template string
    // Name
    let node = container1.appendChild(document.createElement('h1')); // argument 1 is not an object, https://stackoverflow.com/questions/38277713/argument-1-of-node-appendchild-is-not-an-object-when-trying-to-append-basic-html
    let pokemon_id = document.createTextNode(`Pokemon [${id}]: ${_name}`);
    
    node.appendChild(pokemon_id);
    node.appendChild(document.createElement('br'));
    
    // Picture
    img = document.createElement('img');
    // <img src="pic_trulli.jpg" alt="Italian Trulli"></img>
    img.src = sprites_other_official_artwork;
    node.appendChild(img);
    // content = document.createTextNode(`<img src=\"${sprites_other_official_artwork}\" alt="Image of Pokemon" >`);
    
    // Types
    types.forEach(function(element, index, array) {
        console.log(element.type);
        console.log(index);
        console.log(`type: ${element.type.name}`);
        // node.appendChild()
    })
}

function createAPISourceOptions(html_node_id) {
    // refer: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio
    let node = document.getElementById(html_node_id);
    let br = document.createElement('br');
    let title = document.createElement('p');
    let input_node = document.createElement('input');
    let label_node = document.createElement('label');
    node.innerHTML = ""; // reset

    title.textContent = "API source (use pokeapi if you are not running a local server): ";

    input_node.type = "radio";
    input_node.id = "localhost";
    input_node.name = "api_source"; // define radio group: giving each of radio buttons in the group the same name 
    input_node.checked = true; // sets button selected by default
    input_node.onclick = () => {
        console.log('radio button 1 clicked!');
        base_api_url = localhost_pokeapi_url;
        console.log(`Set api source to: ${base_api_url}`);
    }
    label_node.htmlFor = "localhost"; // To programmatically set the for attribute, use htmlFor.
    label_node.textContent = "localhost";
    
    node.appendChild(title);
    node.appendChild(input_node);
    node.appendChild(label_node);
    node.appendChild(br);
    
    input_node = document.createElement('input');
    input_node.type = "radio";
    input_node.id = "pokeapi";
    input_node.name = "api_source";
    input_node.onclick = () => {
        console.log('radio button 2 clicked!');
        base_api_url = pokeapi_url;
        console.log(`Set api source to: ${base_api_url}`);
    }
    node.appendChild(input_node);
    
    label_node = document.createElement('label');
    label_node.htmlFor ="pokeapi";
    label_node.textContent = "pokeapi";
    node.appendChild(label_node);
}

function getAPISourceOptions(name) {
    let ele = document.getElementsByName(name);
    let selected_button;
    //let node;
    //let node2;
    for (let i = 0; i<ele.length; i++) {
        if (ele[i].checked){
            
            selected_button = ele[i].id;
        }
    }
    console.log(`selected object: ${selected_button}`);


    return selected_button;
}

function selectAPISource(source){
    if (source === "localhost") {
        return localhost_url;
    }
    else if (source === "pokeapi") {
        return pokeapi_url;
    }
}

// Math.random() returns a floating point pseudo-random number where 0 < x < 1
function getRandomInt(max){
    return Math.floor(Math.random() * max);
}


function printPageTitle(title) {
    let titleDiv = document.getElementById("title");
    let node = titleDiv.appendChild(document.createElement('h1'));
    node.appendChild(document.createTextNode(title));
}

function getPokemonName(name){
    // check if url is valid
    let url_to_fetch = pokeapi_pokemon_url + name;
    console.log(`fetching: ${url_to_fetch}`);
    fetchPokeapiResponse(url_to_fetch);
}

function clearHTML(node) {
    console.log(`Clearing innerHTML of ${node}`);
    node.innerHTML = "";
}

function clearNodeById(Id) {
    let node;
    console.log(`Clearing node ID: ${Id}`);
    node = document.getElementById(Id);
    node.innerHTML = "";
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