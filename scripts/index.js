import { ProductManager } from "./ProductManager/ProductManager.js"
import { CartManager } from "./CartManager/CartManager.js"
import {UserManager} from  "./UserManager/UserManager.js"
import { createInventory } from "./helper/inventory.js"

const productManager = new ProductManager('products')
createInventory(productManager)
const cartManager = new CartManager
cartManager.addCart()
const userManager = new UserManager

let indexPage = "Inicio"
let cartPage = "Carrito"
let cartProducts = cartManager.getStorageCart().products

let products = productManager.getProducts()

let productsShelf = document.getElementById('products_showcase')
let cartShelf = document.getElementById('cart_showcase')
let page = document.getElementsByTagName('title')[0]
let pageName = page.innerText
let mobileCart = document.getElementById('mobile-cart')
let desktopCart = document.getElementById('desktop-cart')
let desktopCartCounter = document.getElementById('desktop-cart-counter')
let mobileCartCounter = document.getElementById('mobile-cart-counter')


async function getBooze(link) {
    const resp = await fetch(link)
    const data = await resp.json()
    console.log(data)
    const inJson = JSON.stringify(data)
    sessionStorage.setItem('ingredientList',data)
    
}



  getBooze("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list")



function isCartEmpty(){

    while(cartManager.countCartItems()=== 0){
        desktopCart.style.visibility = "hidden"
        mobileCart.style.visibility = "hidden"
        return
    }

    desktopCart.style.visibility = "visible"
    mobileCart.style.visibility = "visible"
    desktopCartCounter.innerText = cartManager.countCartItems()
    mobileCartCounter.innerText = cartManager.countCartItems()
}  
    
isCartEmpty()




function addToCart(event){
    let productId = event.target.id
    productId = parseInt(productId.split('-')[0])
    let addBtn = document.getElementById(`${productId}-addToCart-button`)
    let quantityElement = document.getElementById(`${productId}_amount`)
    let quantity= parseInt(quantityElement.value)
    let stock = productManager.getProductById(productId).stock
    let cartCounter = 0
    // let quantity = cartManager.addToCart(productId,productManager)
    quantity > stock 
    ? quantity = stock
    : quantity 
    quantityElement.value = quantity

    if(stock === 0){
            
        addBtn.className = `${addBtn.className} disabled`
        addBtn.ariaDisabled = "true"
        
    }else{

        addBtn.className = "btn btn-secondary addtocart" 
        cartCounter= cartManager.addToCart(productId,productManager, quantity)
        quantityElement.max= stock 
        desktopCartCounter.innerText= cartCounter
        mobileCartCounter.innerText= cartCounter
        isCartEmpty()
    }

}

function updateCartTotal(){
    let cartTotal = document.getElementById('cart-total')
    cartTotal.innerText=` Total : $ ${cartManager.getCartTotal()} `
}


function increaseItem(event){

    let productId = event.target.id
    productId = parseInt(productId.split('-')[0])
    let decBtn = document.getElementById(`${productId}-decrease_product_button`)
    

    
    let addBtn = document.getElementById(`${productId}-increase_product_button`)


    let quantityElement = document.getElementById(`${productId}-amount_incart`)
    let quantity= cartManager. getCartProductById(productId).quantity +1
    quantityElement.value= quantity
    let stock = productManager.getProductById(productId).stock

    let cartCounter = 0
    
    if(quantity > stock){
            
        addBtn.className = `${addBtn.className} disabled`
        addBtn.ariaDisabled = "true"
        quantityElement.value= stock
    }else{
        decBtn.className = "btn btn-secondary cartDecreaseBtn"
        addBtn.className = "btn btn-secondary cartIncreaseBtn"
        addBtn.ariaDisabled = "false"
        cartCounter= cartManager.addToCart(productId,productManager, 1)
        quantityElement.max= stock 
        desktopCartCounter.innerText= cartCounter
        mobileCartCounter.innerText= cartCounter
        isCartEmpty()
        updateCartTotal()
    }

}

function decreaseItem(event){   

    let productId = event.target.id
    productId = parseInt(productId.split('-')[0])
    let decBtn = document.getElementById(`${productId}-decrease_product_button`)
    let addBtn = document.getElementById(`${productId}-increase_product_button`)
    let quantityElement = document.getElementById(`${productId}-amount_incart`)
    let quantity= cartManager.getCartProductById(productId).quantity 
    quantityElement.value= quantity
    let stock = productManager.getProductById(productId).stock

    let cartCounter = 0
    
    if(quantity === 0){
            
        decBtn.className = `${decBtn.className} disabled`
        decBtn.ariaDisabled = "true"
        quantityElement.value= 0
    }else{
        addBtn.className = "btn btn-secondary cartIncreaseBtn"
        decBtn.className = "btn btn-secondary cartIncreaseBtn"
        decBtn.ariaDisabled = "false"
        cartCounter= cartManager.addToCart(productId,productManager, -1)
        quantityElement.max= stock 
        desktopCartCounter.innerText= cartCounter
        mobileCartCounter.innerText= cartCounter
        updateCartTotal()
        isCartEmpty()
        
    }
    cartManager.getCartTotal()
}

function deleteFromCart(event){

    let productId = event.target.id
    productId = parseInt(productId.split('-')[0])
    let res = prompt(`Estas seguro de que quieres eliminar el producto: 1.si/ 2.no`)
    res= parseInt(res)
    if(res === 1){
        cartManager.deleteCartProductById(productId)
        let cartCounter = cartManager.countCartItems()
        desktopCartCounter.innerText= cartCounter
        mobileCartCounter.innerText= cartCounter
        isCartEmpty()
        updateCartTotal()
        window.location.reload();
    }else if(res === 2){
        return
    }else{
        alert(`respuesta no valida`)
    }
}

function displayProducts(arr, element){

    arr.forEach(p => { element.innerHTML += `
        <div class= "col-sm-12 col-md-6 col-lg-4 col-xlg-3">
            <div id="${p.id}" class="card">
                <a id="${p.id}-link" href="#productview/${p.title}">
                    <img id="${p.id}-img"src="${pageName === 'Inicio'? p.thumbnail:'.'+p.thumbnail}" class="card-img-top" alt="${p.title}">
                </a>
                <div class="card-body">
                    <h5 class="card-title"> Nombre :  ${p.title}</h5>
                    <p class="card-text">${p.description}.</p>
                    <p id="${p.id}-item_price" class="item-price"> Precio:  $${p.price}</p>
                    <div id="add_cart_button">  
                        <input class= "amount-input" id="${p.id}_amount" type="number" min="1" max="${p.stock}">                   
                        <button id= "${p.id}-addToCart-button"  type="button" class="btn btn-secondary addtocart">Agregar</button>
                    </div>
                </div>
            
            </div>
        
        </div>
    
    `})

    let  btnAddToCart = document.getElementsByClassName('addtocart')

    for (const btn of btnAddToCart) {
        btn.addEventListener('click', addToCart)
    }


}

function displayCart(arr, element){
    arr.forEach(p => { element.innerHTML += `
            
    
            <div class="card mb-3" style="max-width: 100%">
            <div class="row g-0">
                <div class="row g-0 d-flex align-items-center card-body">

                    <div class="col-2">
                        <img src=".${p.thumbnail}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-6 text-center ">
                        <h4 class="card-title ">${p.title}</h4>
                    </div>
                    <div class="col">
                        
                        <button id="${p.id}-decrease_product_button" class="btn btn-secondary cartDecreaseBtn">-</button>
                        <input class= "amount-input_incart" id="${p.id}-amount_incart" placeholder="${p.quantity}" type="number" min="1" max="${p.stock}">
                        <button id="${p.id}-increase_product_button" class="btn btn-secondary cartIncreaseBtn">+</button>
                        <p class="card-text"><small class="text-body-secondary"> Hay ${p.stock} disponibles</small></p>
                    </div>
                    
                    <div class="col d-flex justify-content-around">
                        <h4>$${p.quantity+p.price}</h4>
                       <button id="${p.id}-delete_button" class="btn btn-outline-secondary deletebtn ">
                            <i id="${p.id}-delete_icon" class="bi bi-trash"></i>
                       </button> 
                        
                    </div>
                </div>
            </div>
          </div>
    `})

    let  btnMoreItem = document.getElementsByClassName('cartIncreaseBtn')
    let  btnLessItem =  document.getElementsByClassName('cartDecreaseBtn')
    let  btnDeleteItem = document.getElementsByClassName('deletebtn')
    for (const btn of btnMoreItem) {
        btn.addEventListener('click',  increaseItem)
    }
    for (const btn of btnDeleteItem) {
        btn.addEventListener('click', deleteFromCart)
    }
    for (const btn of btnLessItem) {
        btn.addEventListener('click', decreaseItem)
    }

    

    const cartMain = document.getElementById('cart-container')
    let shopDiv = document.createElement('div')
    let content= `<div class="row justify-content-end ">
    <div class="col-sm-12 col-md-6 col-lg-6 p-1 text-end">
    <h4 id= "cart-total"> Total : $ ${cartManager.getCartTotal()} </h4>
    <button id="go_buy-btn" class="btn btn-primary p-1"> Comprar </button>
    </div>
    </div>
    `

    shopDiv.className = "card mg-2 p-3"
    shopDiv.id="shop-div"
    cartMain.appendChild(shopDiv)
    let newShopDiv =  document.getElementById("shop-div")  
    newShopDiv.innerHTML= content

 }


if(pageName === indexPage){
    isCartEmpty()
    desktopCart.style.backgroundImage="url(assets/icons/icon-cart.svg)"
    mobileCart.style.backgroundImage="url(../assets/icons/icon-cart.svg)"

    displayProducts(products,productsShelf)

}else if(pageName === cartPage){
    cartProducts
    isCartEmpty()
    displayCart(cartProducts, cartShelf)  
}else{
    isCartEmpty()
    desktopCart.style.backgroundImage="url(../assets/icons/icon-cart.svg)"
    mobileCart.style.backgroundImage="url(../assets/icons/icon-cart.svg)"
    products = products.filter( p => p.category === pageName.toLowerCase())
    displayProducts(products,productsShelf)

    
}
   

    

