//re-defining adjustment objects here because the ones defined in bakeshopcalc won't link up
let glazeOptions = {
    "Keep Original": 0,
    "Sugar Milk": 0,
    "Vanilla Milk": 0.5,
    "Double Chocolate": 1.5,
};

let packOptions = {
    1: 1,
    3: 3,
    6: 5,
    12: 10,
};

//create cart array
const cart = new Set();

//create a roll constructor

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

//creating 4 new roll objects
let defaultRolls = [
    new Roll("Original", "Sugar Milk", "1", 2.49),
    new Roll("Walnut", "Vanilla Milk", "12", 3.49),
    new Roll("Raisin", "Sugar Milk", "3", 2.99),
    new Roll("Apple", "Keep Original", "3", 3.49),
];

//function that takes roll objects and adds to cart
for (const newRoll of defaultRolls){
    cart.add(newRoll);
}

console.log(cart);

//iterate through array
for (const rollItem of cart ) {
    console.log(rollItem);
    createCartObject(rollItem);
}



function createCartObject(rollItem) {
    console.log("Creating cart templates...");
    //create a template of a cart item in html
    const template = document.querySelector("#cartTemplate");
    const clone = template.content.cloneNode(true);
    rollItem.element = clone.querySelector(".cartItem");
    console.log(rollItem.element);

    //adding rollItem.element to template list, the container of all cloned templates
const containerElement = document.querySelector("#cartContainer");
    containerElement.append(rollItem.element);
  
    //update element with input of object rollItem as it provides information for what needs to be updated
    updateElement(rollItem);

    //delete button
    const removeButton = rollItem.element.querySelector(".remove");
    removeButton.addEventListener("click", () => {
        deleteItem(rollItem);
    });
}



function updateElement(rollItem){
    //assigning values from rollItem to template
    //getting references from template
    const templatePic = rollItem.element.querySelector(".cartPic");
    const templateName = rollItem.element.querySelector(".templateRollName");
    const templateGlaze = rollItem.element.querySelector(".templateGlazing");
    const templatePack = rollItem.element.querySelector(".templatePackSize");
    const templatePrice = rollItem.element.querySelector(".templateItemPrice");
    //assigning information to the references
    templatePic.src = `assets/products/${rolls[rollItem.type]["imageFile"]}`;
    templateName.innerText = `${rollItem.type} cinnamon roll`;
    templateGlaze.innerText = rollItem.glazing;
    templatePack.innerText = `Pack Size: ${rollItem.size}`;
    //displaying the item configurated price, use glazeOptions and packOptions objects defined in HW4 to access adjusted values
    const rollBasePrice = rollItem.basePrice;
    const sumItemPrice = Number(((rollBasePrice + glazeOptions[rollItem.glazing]) * packOptions[Number(rollItem.size)])).toFixed(2);
    templatePrice.innerText = `$ ${sumItemPrice}`;
}

calculatePrice();

function calculatePrice(){
    let totalPrice = 0;
    const allPricesInCart = document.querySelectorAll(".templateItemPrice")
    for (const price of allPricesInCart){
        let rollPrice = Number((price.innerText).substring(1));//to remove the dollar sign 
        totalPrice+=rollPrice;
        console.log(rollPrice);
    }
    document.querySelector(".cartTotalAmount").innerText = `$ ${(totalPrice).toFixed(2)}`;
}
 

function deleteItem(rollItem){
    rollItem.element.remove();
    cart.delete(rollItem);
    calculatePrice();
}



