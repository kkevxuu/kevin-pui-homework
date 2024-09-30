//HW4

//Accessing the rollType key from the url

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get("roll");
console.log(rollType)
    if (rollType == null){
        rollType = "Original";
    }

//Select heading and image using DOM

const heading = document.querySelector(".slogan");
const imageSource = document.querySelector(".itempic");

//Setting innertext and src

heading.innerText = rollType + " cinnamon roll";
imageSource.src = "./assets/products/" + rolls[rollType].imageFile
console.log (rolls[rollType]); 


//Defining objects
let glazeOptions = {
    "Keep original": 0,
    "Sugar milk": 0,
    "Vanilla milk": 0.5,
    "Double chocolate": 1.5,
};

let packOptions = {
    1: 1,
    3: 3,
    6: 5,
    12: 10,
};

//Assigning variables using selectors
let glazeDisplay = document.querySelector("#glazedropdown");
let packDisplay  = document.querySelector("#packdropdown");
let priceDisplay = document.querySelector("#itemprice");

//Setting default price and packsize
const baseRollPrice = Number(rolls[rollType].basePrice);
let newRollPrice = baseRollPrice;
let packSize = 1;
let chosenGlaze = 0;

//Setting price display to the baserollprice
priceDisplay.innerText = "$" + baseRollPrice;

//Using for loop to populate the glazing menu using appendchild
//Referenced code from MDN WEB DOCS (Object.entries()): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries

for (const [key, value] of Object.entries (glazeOptions)){
    let glazeOption = document.createElement("option");
    console.log(key,value);
    glazeOption.textContent = key;
    glazeOption.value = value;
    glazeDisplay.appendChild(glazeOption); //Using id because class wont work, id ensures singularity 
};

//Second loop for populating the packing menu
for (const [key, value] of Object.entries (packOptions)){
    let packOption = document.createElement("option");
    packOption.textContent = key;
    console.log(key, value);
    packOption.value = value;
    packDisplay.appendChild(packOption);
};

//Calculate donut price based on user selected glazing option
function glazingChange(glaze){
    newRollPrice = baseRollPrice + parseFloat(glaze.value); //geting only value from form (not key and value) then turning it into a float. 
    chosenGlaze = glaze.value;
    calcPrice();
};

//Getting the packsize based on user selected option
function packingChange(pack){
    packSize = pack.value;
    calcPrice();
};

//Make a function that calculates and displays final price
function calcPrice(){
    let finalPrice = newRollPrice * packSize;
    let twoDecimal = finalPrice.toFixed(2);
    priceDisplay.innerText = "$" + twoDecimal;
    

};



//Add to cart

const cart = [];

//Create a roll constructor

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

//Create a new object to add to Roll class

function addToCart(){
    let currentSelection = new Roll(rollType, chosenGlaze, packSize, baseRollPrice);
    //Adding selection to cart array
    cart.push(currentSelection)
    console.log(cart);

};
