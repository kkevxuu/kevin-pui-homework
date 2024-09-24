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
let glazeDisplay = document.getElementById("glazedropdown");
let packDisplay  = document.getElementById("packdropdown");
let priceDisplay = document.getElementById("itemprice");

//Setting default price and packsize
const baseRollPrice = 2.49;
let newRollPrice = baseRollPrice;
let packSize = 1;

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
function glazingChange(chosenGlaze){
    newRollPrice = baseRollPrice + parseFloat(chosenGlaze.value); //geting only value from form (not key and value) then turning it into a float. 
    calcPrice();
};

//Getting the packsize based on user selected option
function packingChange(chosenPack){
    packSize = chosenPack.value;
    calcPrice();
};

//Make a function that calculates and displays final price
function calcPrice(){
    let finalPrice = newRollPrice * packSize;
    let twoDecimal = finalPrice.toFixed(2);
    priceDisplay.innerText = "$" + twoDecimal;
    

};



//dont forget to inject js


