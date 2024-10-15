//iterate through array
for (const rollItem of cart) {
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
    console.log(rollItem);
    templatePack.innerText = `Pack Size: ${rollItem.size}`;
    //displaying the item configurated price, use glazeOptions and packOptions objects defined in HW4 to access adjusted values
    const rollBasePrice = rollItem.basePrice;
    const sumItemPrice = Number(((rollBasePrice + glazeOptions[rollItem.glazing]) * packOptions[Number(rollItem.size)])).toFixed(2);
    templatePrice.innerText = `$ ${sumItemPrice}`;
    console.log(cart);
}

calculatePrice();

function calculatePrice(){
    let totalPrice = 0;
    const allPricesInCart = document.querySelectorAll(".templateItemPrice");
    for (const price of allPricesInCart){
        let rollPrice = Number((price.innerText).substring(1));//to remove the dollar sign 
        totalPrice+=rollPrice;
        console.log(rollPrice);
    }
    document.querySelector(".cartTotalAmount").innerText = `$ ${(totalPrice).toFixed(2)}`;
}
 

function deleteItem(rollItem){
    rollItem.element.remove();
    const index = cart.indexOf(rollItem);
    cart.splice(index, 1);
    calculatePrice();
    saveToLocalStorage();
    console.log(cart);
}

