
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
imageSource.src = "./assets/products/" + rolls[rollType].imageFile;
console.log (rolls[rollType]); 


//Assigning variables using selectors
let glazeDisplay = document.querySelector("#glazedropdown");
let packDisplay  = document.querySelector("#packdropdown");
let priceDisplay = document.querySelector("#itemprice");

//Setting default price and packsize
const baseRollPrice = Number(rolls[rollType].basePrice);
let newRollPrice = baseRollPrice;
let packSize = 1;
let chosenGlaze = 0;
let chosenGlazeKey = "";

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

    console.log(glaze);
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


//Create a new object to add to Roll class

function addToCart(){
    const selectedGlazeText = glazeDisplay.options[glazeDisplay.selectedIndex].innerText;
    const selectedPackText = packDisplay.options[packDisplay.selectedIndex].innerText;
    let currentSelection = new Roll(rollType, selectedGlazeText, selectedPackText, baseRollPrice);
    //Adding selection to cart array
    cart.push(currentSelection);
    console.log(cart);
    saveToLocalStorage();
};


