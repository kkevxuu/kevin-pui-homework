//just added to test things
//create cart array
let cart = [];

//create a roll constructor

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

//HW6


//converting cart set to a string for storage
function saveToLocalStorage(){
    const cartArray = Array.from(cart);
    const cartArrayString = JSON.stringify(cartArray);
    localStorage.setItem("storedRolls", cartArrayString);
}

function retrieveFromLocalStorage(){
    const cartArrayString = localStorage.getItem("storedRolls");
    if (cartArrayString != null){
        cart = JSON.parse(cartArrayString);
        console.log(cart);
    }

}
    
retrieveFromLocalStorage();

