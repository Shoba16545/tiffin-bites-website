let searchField=document.getElementById("search_field")
let TiffinContainer=document.getElementById("menu_two")
let TiffinCards=document.querySelectorAll(".card_container")

searchField.addEventListener("input",()=>{
    let searchTerm = searchField.value.toLowerCase().trim();
    let hasResults=false;
    TiffinCards.forEach((card)=>{
        let name=card.id
        if(name.includes(searchTerm)){
            card.style.display="flex"
            hasResults=true
        }else{
            card.style.display="none"
            hasResults=false
        }
    })
    
})
let cartQuantity = document.getElementById("quantity")
let cartPrice = document.getElementById("price")

let cart = {}
let totalQuantity = 0
let totalPrice = 0

let cards = document.querySelectorAll(".card_container")
console.log(cards)
cards.forEach((card)=>{
    let itemId = card.id
    console.log(itemId)

    let itemName = card.querySelector(".food_title").innerText
    console.log(itemName)

    let itemPrice = Number(card.querySelector(".food_price").innerText.replace("₹",""))
    console.log(itemPrice)

    let itemQuantity = card.querySelector("span")
    console.log(itemQuantity)

    let minusBtn = card.querySelectorAll(".quantity_btns")[0]
    console.log(minusBtn)

    let plusBtn = card.querySelectorAll(".quantity_btns")[1]
    console.log(plusBtn)
    


    cart[itemId]={
        name:itemName,
        price:itemPrice,
        quantity:0
    }

    plusBtn.addEventListener("click",()=>{
        cart[itemId].quantity++;
        totalQuantity++;
        totalPrice+=itemPrice;
        itemQuantity.innerText=cart[itemId].quantity;
        updateCart();
    });
    minusBtn.addEventListener("click",()=>{
        if(cart[itemId].quantity>0){
        cart[itemId].quantity--;
        totalQuantity--;
        totalPrice-=itemPrice;
        itemQuantity.innerText=cart[itemId].quantity;
        updateCart();
        }
    });
});

let updateCart =()=> {
    cartQuantity.innerText= totalQuantity
    cartPrice.innerText = `₹${totalPrice.toFixed(2)}`
}

let cart_icon = document.getElementById("cart_icon")
let closebtn = document.querySelector("#popup_container>#close_btn")
let main = document.querySelector("main")

cart_icon.addEventListener("click",()=>{
    main.style.display = "flex"
    renderCartDetails()
});
closebtn.addEventListener("click",()=>{
    main.style.display = "none"
})

// function placeOrder(){
//     if (totalQuantity === 0){
//         alert("❌ Cart is empty. Add items first");
//     } else {
//         alert("✅ Order Placed Successfully!");
//     }
// }
function placeOrder(){
    const message = document.getElementById("successMessage");
    message.style.display="block";

    setTimeout(function() {
        message.style.display="none";
    }, 5000);
}



let cartDetails = document.getElementById("cart_details");
let cart_total_items = document.querySelector("#cart_total_items>span") 
let cart_total_price = document.querySelector("#cart_total_price>span")


 function renderCartDetails(){
    cartDetails.innerText=""
    let hasResults = false
    for(let id in cart){
        let name = cart[id].name
        let price = cart[id].price
        let quantity = cart[id].quantity
        if(quantity>0){
            hasResults=true
            let para = document.createElement("p")
            para.innerHTML=`${name}x${quantity} = ₹${(price*quantity).toFixed(2)}`
            cartDetails.append(para)
        }
    }
    if(hasResults==false){
        cartDetails.innerHTML=`<p>No items in the cart<p>`
    }
    cart_total_items.innerText = totalQuantity
    cart_total_price.innerText = totalPrice

 }