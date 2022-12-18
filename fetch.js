"use strict";


// DATA
// NOTE: avoid using global variables if they're not constant
// these variables can be referred to in the console (F12)
const page_title = "Pokeapi"
const localhost_endpoint = "http://localhost";
const selected_port = 8000;
const localhost_port_endpoint = localhost_endpoint + `:${selected_port}`;

const localhost_pokeapi_endpoint = localhost_port_endpoint + "/api/v2";

const localhost_pokeapi_pokemon_endpoint = localhost_port_endpoint + "/api/v2/pokemon/";

const pokeapi_endpoint = "https://pokeapi.co/api/v2";
// "https://pokeapi.co/api/v2/pokemon/{id or name}/";\
const pokeapi_pokemon_endpoint = "https://pokeapi.co/api/v2/pokemon/";

const dex_number_max = 905;
const pseudo_legendaries = ["dragonite", "tyranitar", "salamence", "metagross", "garchomp", "hydreigon", "goodra", "kommo-o", "dragapult"];

const endpoint_remote_tyranitar = "https://pokeapi.co/api/v2/pokemon/tyranitar/";
const endpoint_local_hydreigon = "http://localhost:8000/api/v2/pokemon/hydreigon/";


const type_color_list = {
    normal: 'a8a878',
    fighting: 'c03028',
    ground: 'e0c068',
    rock: 'ba8038',
    steel: 'b8b8d0',
    fire: 'f08030',
    water: '6890f0',
    grass: '78c850',
    electric: 'f8d030',
    ice: '98d8d8',
    flying: 'a890f0',
    bug: 'a8b820',
    poison: 'a040a0',
    ghost: '705898',
    psychic: 'f85888',
    dark: '705848',
    fairy: 'ee99ac',
    dragon: '7038f8'
}

// Refer to promisifying functions
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

var selected_endpoint = localhost_pokeapi_endpoint;

// RUN
main();

// FUNCTION //

function main() {
    // Need to debounce this function call to prevent it from being called too often
    // and prevent overloading the api server

    // Figure out how to cache responses
    let pokeapi_response;
    let pokeapi_endpoint = "https://pokeapi.co/api/v2";
    getRandomInt(dex_number_max);

    printPageTitle(page_title);
    createAPIEndpointOptions("api_source");
    get_API_Endpoint_Choice("api_source");

    clearNodeById("container1");
    test_fetch();
    // console.log( "typeof pokeapi_response: " + typeof pokeapi_response );
}

function test_fetch() {
    let returned_promise = get_pokeapi_response(endpoint_remote_tyranitar);
    returned_promise
        .then( (response) => {
            return response.json();
        })
        .then( (data) => {
            console.log(`Retrieved: ${data.name}`);
        })
        .catch( () => {
            console.log("ERROR from test_fetch()");
        }
        )
}

function fetchPokemonButton() {
    // TODO: debounce
    
    let selected_button;
    let selected_api;
    let selected_pokemon;
    let url_to_fetch;
    // get api source
    selected_button = get_API_Endpoint_Choice("api_source");
    // selected_api = selectAPISource(selected_button);
    // console.log(`selected_api: ${selected_api}`);
    
    // fetch pokemon from source
    // get_pokeapi_response(url);
    selected_pokemon = document.getElementById("selected_pokemon").value;
    console.log(`selected_pokemon: ${selected_pokemon}`);
    if (selected_pokemon === "" || selected_pokemon === undefined || selected_pokemon === null) {
        fetchRandomPokemon();
        return;
    }
    url_to_fetch = selected_endpoint + '/pokemon' + '/' + selected_pokemon;
    console.log(`url_to_fetch: ${url_to_fetch}`);
    get_pokeapi_response(url_to_fetch);
}

function get_random_pokemon() {
    let pokeapi_response;
    let dex_num = getRandomInt(dex_number_max);
    let pokeapi_pokemon_random_endpoint = pokeapi_pokemon_endpoint + dex_num;
    let localhost_pokemon_random_endpoint = localhost_port_endpoint + "/pokemon" + dex_num;
    
    clearNodeById("container1");

    console.log(`[selected_endpoint]: ${selected_endpoint}`);
    console.log(`[pokeapi_pokemon_random_endpoint]: ${pokeapi_pokemon_random_endpoint}`);
    if (selected_endpoint === pokeapi_endpoint ) {
        console.log(`[selected_endpoint]: ${selected_endpoint}`);
        pokeapi_response = get_pokeapi_response_to_render(pokeapi_pokemon_random_endpoint, dex_num);
    } else {
        console.log('ELSE');
        console.log(`[selected_endpoint]: ${selected_endpoint}`);
        pokeapi_response = get_pokeapi_response_to_render(localhost_pokemon_random_endpoint, dex_num);
    }
    
}

function get_pokemon_up_to_dex(node_id){
    
    
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
    let localhost_pokemon_url = localhost_pokeendpoint + "/pokemon";
    let url_to_fetch;
    let pokeapi_response;
    const j = 5;
    // main();
    // ERROR: fetch is async
    for (let i=0 ; i < dex_number; i++) {
        // main();
        url_to_fetch = localhost_pokeendpoint+ "/pokemon/" + `${i+1}`;
        console.log(`url_to_fetch: ${url_to_fetch}`);
        pokeapi_response = get_pokeapi_response(url_to_fetch);
        console.log(i);
    }


}

function get_pokeapi_response(endpoint, dex_number) {
    console.log(`fetching from: ${endpoint}`);
    return fetch( endpoint );
}

// REMEMBER promises are always async
function get_pokeapi_response_to_render( endpoint, dex_number ) {

    const requestOptions = {
        //mode: "no-cors",
    }
    
    console.log(`attempting to fetch from: ${endpoint}}`);

    // response object contains a representation of the entire HTTP response
    // that is why you have to access its json method
    // then returns a promise
    // refer to using promises:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
    // a promise is a returned object to which you attach callbacks
    // you can rewrite promise chains with async functions
    // () => x is short for () => {return x; }
    return fetch( endpoint )
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
            render_pokemon(data, dex_number);
        })
        .catch( (error) => {
            console.log(`ERROR: ${error}`);
        }); //.then().then() is a promise chain
    
    // return response; WRONG You want to return the previous object, https://stackoverflow.com/questions/50607760/reactjs-typeerror-object-is-undefined
}

function render_pokemon(data, dex_number) {
    console.log("data: " + data);
    console.log(`== [SUCCESS] retrieved: ${data.name.toUpperCase()} ==`);
    
    let id = data.id;
    let _name = data.name;
    let types = data.types;
    let sprites = data.sprites;
    let sprites_other_official_artwork = sprites.other["official-artwork"].front_default; // [object Object]
    let img;
    let arr = []; // let arr; -> arr is undefined
    let p;
    let node;
    let type_color;

    console.log(`artwork data: ${sprites_other_official_artwork}` );
    
    let body1 = document.getElementById("body1");
    body1.appendChild(document.createElement('br'));
    node = document.getElementById("container1"); // html_body is null
    
    // `string` = template literal, template string
    // [Pokemon]
    // [[Name]]
    let h1 = node.appendChild(document.createElement('h1')); // argument 1 is not an object, https://stackoverflow.com/questions/38277713/argument-1-of-node-appendchild-is-not-an-object-when-trying-to-append-basic-html
    let pokemon_id = document.createTextNode(`Pokemon [${id}]: ${_name}`.toUpperCase());
    
    h1.appendChild(pokemon_id);
    node.appendChild(document.createElement('br'));
    
    // [[Picture]]
    img = document.createElement('img');
    // <img src="pic_trulli.jpg" alt="Italian Trulli"></img>
    img.src = sprites_other_official_artwork;
    node.appendChild(img);
    // content = document.createTextNode(`<img src=\"${sprites_other_official_artwork}\" alt="Image of Pokemon" >`);
    
    // [[Types]]
    p=document.createElement('p');
    types.forEach(function(element, index, array) {
        console.log(`[index] ${index}`);
        console.log(`[api_type]: ${element.type}`);
        console.log(`[type.name]: ${element.type.name}`);
        // node.appendChild()
        
        type_color = '#' + type_color_list[element.type.name];
        console.log(`[type_color]: ${type_color}`);

        arr.push(element.type.name);
        console.log(`arr: ${arr}`);
        p = node.appendChild(document.createElement('p')); // appendchild returns the newly appended node
        p.style.color = type_color;
        p.append(`type[${index}]: ${element.type.name.toUpperCase()} `);
    })

    // [[Evolution]]
    // Evolves to
    // Evolves from
    if (dex_number === null ){
        console.log('[Warning]: No dex number information was found, unable to get evolution info');
        return;
    }
    let evolution_endpoint = selected_endpoint + '/evolution-chain' + `/${dex_number}`;
    let evolves_to = ''; // fetch
    // [Pokedex Entry]
}

function createAPIEndpointOptions(html_node_id) {
    // refer: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio
    let node = document.getElementById(html_node_id);
    let br = document.createElement('br');
    let title = document.createElement('p');
    let input_node = document.createElement('input');
    let label_node = document.createElement('label');
    node.innerHTML = ""; // reset

    title.textContent = "API source (use pokeapi if you are not running a local server): ";
    // Set endpoint to localhost
    input_node.type = "radio";
    input_node.id = "localhost";
    input_node.name = "api_source"; // define radio group: giving each of radio buttons in the group the same name 
    input_node.checked = true; // sets button selected by default
    input_node.onclick = () => { // addEventLister('click', function()) is the idiomatic way to add event listener
        console.log('radio button 1 clicked!');
        selected_endpoint = localhost_pokeapi_endpoint;
        console.log(`Set api endpoint to: ${selected_endpoint}`);
    }


    // label
    label_node.htmlFor = "localhost"; // To programmatically set the for attribute, use htmlFor.
    label_node.textContent = "localhost";
    

    
    node.appendChild(title);
    node.appendChild(input_node);
    node.appendChild(label_node);

    // Select new port
    input_node = document.createElement('input');
    input_node.type = "number";
    input_node.id = "port_input";
    node.appendChild(input_node);

    input_node = document.createElement('button');
    input_node.id = "port_input_button";
    input_node.textContent = 'Set new port';
    input_node.addEventListener('click', () => {
        let port = document.getElementById('port_input').value;
        if (port === null || port === "" || port === undefined){
            alert('Invalid port. Choose: [1-65535]');
            console.log('Invalid input');
            console.log("typeof [port]: " + typeof port);
            return;
        }
        console.log(`SET new port: ${port}`);

    });
    node.appendChild(input_node);
    node.appendChild(br);
    
    // set endpoint to pokeapi
    input_node = document.createElement('input');
    input_node.type = "radio";
    input_node.id = "pokeapi";
    input_node.name = "api_source";
    input_node.onclick = function setRemoteEndpoint() { // Function expressions in JavaScript are not hoisted, unlike function declarations. You can't use function expressions before you create them: 
        console.log('radio button 2 clicked!');
        selected_endpoint = pokeapi_endpoint;
        console.log(`Set api source to: ${selected_endpoint}`);
    }
    
    node.appendChild(input_node);
    
    label_node = document.createElement('label');
    label_node.htmlFor ="pokeapi";
    label_node.textContent = "pokeapi";
    node.appendChild(label_node);
}

function get_API_Endpoint_Choice(name) {
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

function getPokemonName(name){
    // check if url is valid
    let url_to_fetch = pokeapi_pokemon_url + name;
    console.log(`fetching: ${url_to_fetch}`);
    get_pokeapi_response(url_to_fetch);
}

function printPageTitle(title) {
    let titleDiv = document.getElementById("title");
    let node = titleDiv.appendChild(document.createElement('h1'));
    node.appendChild(document.createTextNode(title));
}

function createPokemonTypeStyle(){
    
}

// Math.random() returns a floating point pseudo-random number where 0 < x < 1
function getRandomInt(max){
    return Math.floor(Math.random() * max);
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

function refreshPageEvery(seconds) {
    
    setInterval(() => {
        document.location.reload();
    }, seconds*1000);

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