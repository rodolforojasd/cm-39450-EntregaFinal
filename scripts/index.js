import { ProductManager } from "./ProductManager/ProductManager.js"
import { CartManager } from "./CartManager/CartManager.js"
// import {UserManager} from  "./UserManager/UserManager.js"
import { ingredientList } from "./helper/getBooze.js"
import { getBooze } from "./helper/getBooze.js"
import { createInventory } from "./helper/inventory.js"


const productManager = new ProductManager('products')
createInventory(productManager)
getBooze('https://www.thecocktaildb.com/api/json/v1/1/search.php?i=', productManager)

const cartManager = new CartManager
cartManager.addCart()
// const userManager = new UserManager

let indexPage = "Inicio"
let cartPage = "Carrito"
let cartProducts = cartManager.getStorageCart().products

let products = productManager.getProducts()

let productsShelf = document.getElementById('products_showcase')
let  monthSelection = document.getElementById('month_selection')
let  importedSelection = document.getElementById('imported_selection')
let  nationalSelection = document.getElementById('national_selection')
let signupBtn = document.getElementById('sign-up-icon')


let cartShelf = document.getElementById('cart_showcase')
let page = document.getElementsByTagName('title')[0]
let pageName = page.innerText
let mobileCart = document.getElementById('mobile-cart')
let desktopCart = document.getElementById('desktop-cart')
let desktopCartCounter = document.getElementById('desktop-cart-counter')
let mobileCartCounter = document.getElementById('mobile-cart-counter')


signupBtn.addEventListener('click',displaySignUp)

function closeWindow(){
    document.body.removeChild(document.body.lastChild)
}

function displaySignUp(){
    let body = document.getElementsByTagName('main')
    let signUpView = document.createElement('div')
    signUpView.id="sign-up-wrapper"

    signUpView.innerHTML =
    `<div id="sign-up-container" class='login-screen container'>
        <btn id="login-close-btn"  class="btn btn-dark close-btn">x</btn>
       
        <div class='login'>
            <h2>Login</h2>
            <hr/>

            <form id="sign-up-form" class="row text-center" onSubmit={handleSubmit}>
                <label class="form-check-label">
                    Email
                </label>
            
                <input
                    value=''
                    type='text'
                    onChange=''
                    class='form-control row'
                    placeholder='Tu email'
                    name='email'
                />

                <label class="form-check-label">
                    Password
                </label>
                <input 
                    value={values.password}
                    type='password'
                    onChange='handleInputChange'
                    class='form-control row'
                    placeholder='Password'
                    name='password'
                />

                <button id="login-btn" class='btn btn-outline-secondary' type='submit'>Login</button>

            </form>
           
            <button id="google-login-btn"class='btn btn-outline-primary' onClick=''>
                <i class="bi bi-google"></i>
                Entra con Goggle
            </button>

            <h4 id="register-view-btn" type ="button" >Registrarse</h4>
     </div>
    </div>`
    document.body.appendChild(signUpView)
    
    

    
   let registerView = document.getElementById('register-view-btn')
   registerView.addEventListener('click', ()=>{
        signUpView.id="registration-wrapper"

        signUpView.innerHTML =`
        <div class='registration-screen'>
            <btn id="register-close-btn"  class="btn btn-dark close-btn">x</btn>
            <div class='login'>
                <h2>Registrate</h2>
                <hr/>

                <form onSubmit={handleSubmit}>
                <label class="form-check-label">
                    Email
                </label>    
                <input
                        value=''
                        type='text'
                        onChange={handleInputChange}
                        class='form-control'
                        placeholder='Tu email'
                        name='email'
                    />
                    <label class="form-check-label">
                    Password
                     </label>
                    <input 
                        value=''
                        type='password'
                        onChange=''
                        class='form-control my-3'
                        placeholder='Password'
                        name='password'
                    />

                    <button id="create-user" class='btn btn-primary' type='submit'>Crear usuario</button>
                    
                </form>

            </div>
        </div>`
    let registerCloseBtn = document.getElementById('register-close-btn')
    registerCloseBtn.addEventListener('click',closeWindow)
   })

   let closeBtn= document.getElementById('login-close-btn')
   closeBtn.addEventListener('click', closeWindow)
    


function createList(pm,listName, idsArr){
    while (pm.getListProducts(listName)==="no list found"||products.includes(null)){
        pm.copyProductsByIds(idsArr, listName)
        let products = pm.getListProducts(listName)
        break
    }
}

createList(productManager,'month',[17,18,26,112,117])
createList(productManager,'imported',[1,9,7,93])
createList(productManager,"national",[2,13,14,12])

}

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
    



function minText(string){
    let minText = string
    while(string && string.length >160){
        let start = string.substring(0,160)
        let end = string.substring(161)
        let endDot = end.split(".")[0]
        let endComma= end.split(",")[0]
        if(endDot.length < endComma.length){
            minText= `${start+endDot}.`
        }else{
            minText=`${start+endComma}.`
        }
        break
    }
    return minText
}

function addToCart(event){

    console.log(event)
    let productId = event.target.id
    productId = parseInt(productId.split('-')[0])
    
    if(event.target.id===`${productId}-addToCart-button`){
        let quantityElement = document.getElementById(`${productId}-amount`)
        let addToCartBtn = document.getElementById(`${productId}-addToCart-button`)
        let quantity= parseInt(quantityElement.value)
        let inCart = cartManager.getStorageCart()
        inCart= (inCart.products.find(p => p.id === productId))||0
        let stock = productManager.getProductById(productId).stock
        let cartCounter = 0

        if( inCart !== 0 && inCart.quantity+quantity > stock){
            addToCartBtn.className = `btn btn-secondary addtocart disabled`
            addToCartBtn.ariaDisabled = "true"
        
        }else{
            cartCounter= cartManager.addToCart(productId,productManager, quantity)            
            desktopCartCounter.innerText= cartCounter
            mobileCartCounter.innerText= cartCounter
            addToCartBtn.className = "btn btn-secondary addtocart"
            addToCartBtn.ariaDisabled="false"
            isCartEmpty()
            updateCartTotal()
        }
    }

}

function updateCartTotal(){
    let cartTotal = document.getElementById('cart-total')
    cartTotal.innerText=` Total : $ ${cartManager.getCartTotal()} `
}


function increaseItem(event){

    let eventId = event.target.id
    let productId = parseInt(eventId.split('-')[0])
    console.log(productId)
    while(eventId ===`${productId}-increase-btn`){
        let decBtn = document.getElementById(`${productId}-decrease-btn`)
        let addBtn = document.getElementById(`${productId}-increase-btn`)
        let quantityElement = document.getElementById(`${productId}-amount`)
        let stock = productManager.getProductById(productId).stock
        let cartCounter = 0
        let quantity= parseInt(quantityElement.value)
        let inCart = cartManager.getStorageCart()
        inCart= inCart.products.find(p => p.id === productId)||0

        if(inCart === 0||quantity < stock||(quantity+inCart.quantity) < stock){
            
            decBtn.className = "amount-btn decrease-btn"
            addBtn.className = "amount-btn increase-btn"
            addBtn.className = "amount-btn increase-btn"


            if(pageName!=='Carrito'){
              quantityElement.value = quantity+1
              
            }else{
                cartCounter= cartManager.addToCart(productId,productManager, 1)
                quantityElement.value = quantity+1
                quantityElement.max= stock 
                desktopCartCounter.innerText= cartCounter
                mobileCartCounter.innerText= cartCounter
                isCartEmpty()
                updateCartTotal()
            }
            
        }else{
            addBtn.className = `amount-btn increase-btn disabled`
            addBtn.ariaDisabled = "true"
            quantityElement.value= stock
        }
        break
    }

}

function decreaseItem(event){   

    let eventId = event.target.id
    let productId = parseInt(eventId.split('-')[0])
    console.log(productId)
    while(eventId ===`${productId}-decrease-btn`){
        let decBtn = document.getElementById(`${productId}-decrease-btn`)
        let addBtn = document.getElementById(`${productId}-increase-btn`)
        let addToCartBtn = document.getElementById(`${productId}-addToCart-button`)
        let quantityElement = document.getElementById(`${productId}-amount`)
        let stock = productManager.getProductById(productId).stock
        let cartCounter = 0
        let quantity= parseInt(quantityElement.value)
        let inCart = cartManager.getStorageCart()
        inCart= inCart.products.find(p => p.id === productId)||0

        if(quantity > 1){
            decBtn.className = "amount-btn decrease-btn"
            addBtn.className = "amount-btn increase-btn"
            addBtn.ariaDisabled = "false"
            if(pageName!=='Carrito' ){
            debugger
                --quantity
                quantityElement.value = quantity
                if(inCart!== 0 && inCart.quantity+quantity <= stock){
                    addToCartBtn.className = "btn btn-secondary addtocart"
                    addToCartBtn.ariaDisabled="false"
                }
              return 
            }
            

            cartCounter= cartManager.addToCart(productId,productManager, -1)
            quantityElement.value = quantity-1
            quantityElement.max= stock 
            desktopCartCounter.innerText= cartCounter
            mobileCartCounter.innerText= cartCounter
            isCartEmpty()
            updateCartTotal()
        }else{
            decBtn.className = `amount-btn decrease-btn disabled`
            decBtn.ariaDisabled = "true"
            
        }
        break
    }

}


function changeItemAmount(event){
    debugger    
    const eventId = event.target.id
    const productId = parseInt(eventId.split('-')[0])
    console.log(productId)
    while(event.target.id ===`${productId}-amount`){
        let cartCounter=0
        let quantityElement = document.getElementById(`${productId}-amount`)
        let quantity= parseInt(quantityElement.value)
        let cart = cartManager.getStorageCart()
        let newCart ={}
        let stock = parseInt(quantityElement.max)
        console.log(stock)
        let inCart= cart.products.findIndex(p => p.id === productId)
        let product = cart.products[inCart]
        quantity > stock 
        ? quantity = stock
        : quantity 
        quantityElement.value = quantity

        if(pageName ==="Carrito" && quantity <= stock){
            
            cart.products[inCart].quantity = quantity
            newCart = cart
            cartManager.updateCart(newCart)
            cartCounter = cartManager.countCartItems()
            desktopCartCounter.innerText = cartCounter
            mobileCartCounter.innerText = cartCounter
            updateCartTotal()
            isCartEmpty()
            
        }else{
            return quantityElement.value=quantity
        }
        break
    }   
}

function deleteFromCart(event){
    
    const eventId = event.target.id
    const productId = parseInt(eventId.split('-')[0])
    console.log(eventId)
    while(eventId === `${productId}-del-confirm`){
        
        cartManager.deleteCartProductById(productId)
        let cartCounter = cartManager.countCartItems()
        desktopCartCounter.innerText= cartCounter
        mobileCartCounter.innerText= cartCounter
        isCartEmpty()
        updateCartTotal()
        window.location.reload();
        break
    }
    
}   
    



function displayProducts(arr, element, listName){

    if (listName === undefined){
        arr.forEach(p => { element.innerHTML += 
            
        !p?`<h3>Loading...</h3>`   
            
        :
        `
        <div class= "col-sm-12 col-md-6 col-lg-4 col-xlg-3">
            <div id="${p.id}" class="card">
                
                <a id="${p.id}-link" href="#productview/${p.title}">
                    <img id="${p.id}-img"src="${(pageName === 'Inicio'||p.db === "coktaildb")? p.thumbnail:'.'+p.thumbnail}" class="card-img-top" alt="${p.title}">
                </a>
                <div class="card-body">
                    <h3 class="card-title">  ${p.title}</h3>
                    <h4 class="card-text">${minText(p.description)}.</h4>
                    <p id="${p.id}-item_price" class="item-price"> Precio:  $${p.price}</p>
                    <div id="add_cart_button">
                        <div class="amount-wrapper">
                            <span id="${p.id}-decrease-btn" class="amount-btn decrease-btn" type= "button" >-</span>
                            <input class= "amount-input" id="${p.id}-amount" type="number" value="1" min="1" max="${p.stock}">
                            <span id="${p.id}-increase-btn" class="amount-btn increase-btn" type="button">+</span>   
                        </div>                 
                        <button id= "${p.id}-addToCart-button"  type="button" class="btn btn-secondary addtocart">Agregar</button>
                                    
                    </div>
                </div>   
                    
                </div>
            
            </div>
        
        </div>
    
        `})
    } else{

         arr = productManager.getListProducts(listName)
         arr.forEach((p) => {
            
            
                element.innerHTML+=
                
                !p?`<h3>Loading...</h3>`   
                :
                `
                
                    <div class= "col-sm-12 col-md-6 col-lg-4 col-xlg-3">
                        <div id="${p.id}" class="card">
                            <a id="${p.id}-link" href="#productview/${p.title}">
                                <img id="${p.id}-img"src="${(pageName === 'Inicio'||p.db === "coktaildb")? p.thumbnail:'.'+p.thumbnail}" class="card-img-top" alt="${p.title}">
                            </a>
                            <div class="card-body">
                                <h3 class="card-title">${p.title}</h3>
                                <h4 class="card-text">${minText(p.description)}.</h4>
                                <p id="${p.id}-item_price" class="item-price"> Precio:  $${p.price}</p>
                                <div id="add_cart_button">
                                    <div class="amount-wrapper">
                                        <span id="${p.id}-decrease-btn" class="amount-btn decrease-btn" type= "button" >-</span>
                                        <input class= "amount-input" id="${p.id}-amount" type="number" value="1" min="1" max="${p.stock}">
                                        <span id="${p.id}-increase-btn" class="amount-btn increase-btn" type="button">+</span>  
                                    </div>                 
                                    <button id= "${p.id}-addToCart-button"  type="button" class="btn btn-secondary addtocart">Agregar</button>
                                    
                                </div>
                            </div>
                        
                        </div>
                
                    </div>
               
                `
                
            })
                
        }

         element.addEventListener('click',addToCart )
         element.addEventListener('click',increaseItem)
         element.addEventListener('click',decreaseItem)
         element.addEventListener('change',changeItemAmount )   
    // let  btnAddToCart = document.getElementsByClassName('addtocart')

    // for (const btn of btnAddToCart) {
    //     btn.addEventListener('click', addToCart)
    // }

}


function displayCart(arr, element){
    arr.forEach(p => { element.innerHTML += `
            
    
            <div class="card mb-3 cart-card" style="max-width: 100%">
            <div class="row g-0">
                <div class="row g-0 d-flex align-items-center card-body">

                    <div class="col-2">
                        <img src="${p.db === "coktaildb"? p.thumbnail:"."+p.thumbnail}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-6 text-center ">
                        <h3 class="card-title ">${p.title}</h3>
                    </div>
                    <div id="cart-amount-wrapper" class="col">
                        <div class="amount-wrapper">
                                <span id="${p.id}-decrease-btn" class="amount-btn decrease-btn" type= "button" >-</span>
                                <input class= "amount-input" id="${p.id}-amount" type="number" value="${p.quantity}" min="1" max="${p.stock}">
                                <span id="${p.id}-increase-btn" class="amount-btn increase-btn" type="button">+</span>   
                        </div>  
                       
                        <p class="card-text"><small class="text-body-secondary"> Hay ${p.stock} disponibles</small></p>
                    </div>
                    
                    <div class="col d-flex justify-content-around">
                        <p class="cart-item-price"><bold>$${p.quantity+p.price}</bold></p>
                       <button id="${p.id}-delete_button" class="btn btn-outline-secondary deletebtn" data-bs-toggle="modal" data-bs-target="#${p.id}modal">
                            <i id="${p.id}-delete_icon" class="bi bi-trash"></i>
                       </button> 
                    </div>
                   
                    <div class="modal fade" id="${p.id}modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="${p.id}Label" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title fs-5" id="${p.id}Label">Eliminar Producto</h4>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                               Quieres eliminar ${p.title} de tu selección?
                            </div>
                            <div class="modal-footer">
                                <button type="button" id="${p.id}-del-confirm" class="btn btn-primary">Eliminar</button>
                                <button  type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
          </div>
    `})

    element.addEventListener('click',increaseItem)
    element.addEventListener('click',decreaseItem)
    element.addEventListener('change',changeItemAmount)
    element.addEventListener('click',deleteFromCart)
    
    // let  btnMoreItem = document.getElementsByClassName('increase-btn')
    // let  btnLessItem =  document.getElementsByClassName('decrease-btn')
    // let  btnDeleteItem = document.getElementsByClassName('deletebtn')
    // for (const btn of btnMoreItem) {
    //     btn.addEventListener('click',  increaseItem)
    // }
    // for (const btn of btnDeleteItem) {
    //     btn.addEventListener('click', deleteFromCart)
    // }
    // for (const btn of btnLessItem) {
    //     btn.addEventListener('click', decreaseItem)
    // }

    

    const cartMain = document.getElementById('cart-container')
    let shopDiv = document.createElement('div')
    let content= `<div class="row justify-content-end ">
    <div class="col-sm-12 col-md-6 col-lg-6 p-1 align-middle text-end">
    <h3 id= "cart-total"> Total : $ ${cartManager.getCartTotal()} </h3>
    <a href="../pages/checkout.html">
        <button id="go_buy-btn" class="btn btn-primary p-1"> Comprar </button>
    </a>
    
    </div>
    </div>
    `

    shopDiv.className = "card mg-2 p-3"
    shopDiv.id="shop-div"
    cartMain.appendChild(shopDiv)
    let newShopDiv =  document.getElementById("shop-div")  
    newShopDiv.innerHTML= content
    
}

function displayCheckout(total){
    let checkoutTotal= document.getElementById('checkout-total')
        checkoutTotal.innerText= `Pagas: $${total}`
        const form = document.querySelector('form');

        form.addEventListener('submit', (event) => {
          event.preventDefault(); // Prevent form submission
          
          const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
          
          // Validate form inputs based on payment method
          if (paymentMethod === 'credit-card' || paymentMethod === 'debit-card') {
            const cardNumber = document.querySelector('#card-number').value;
            const expirationDate = document.querySelector('#expiration-date').value;
            const cvv = document.querySelector
        
          }
        })
    }


isCartEmpty() 


if(pageName === indexPage){
    isCartEmpty()
    desktopCart.style.backgroundImage="url(assets/icons/icon-cart.svg)"
    mobileCart.style.backgroundImage="url(assets/icons/icon-cart.svg)"

    displayProducts(products,monthSelection,"month")
    displayProducts(products,importedSelection,"imported")
    displayProducts(products,nationalSelection, "national")

}else if(pageName === cartPage){
    
    isCartEmpty()
    desktopCart.style.backgroundImage="url(../assets/icons/icon-cart.svg)"
    mobileCart.style.backgroundImage="url(../assets/icons/icon-cart.svg)"
    displayCart(cartProducts, cartShelf)  
}else{
    isCartEmpty()
    desktopCart.style.backgroundImage="url(../assets/icons/icon-cart.svg)"
    mobileCart.style.backgroundImage="url(../assets/icons/icon-cart.svg)"
    products = products.filter( p => p.category === pageName.toLowerCase())
    displayProducts(products,productsShelf)    
}
 
if(pageName === "Checkout"){
    displayCheckout(cartManager.getCartTotal())
}
// const form = document.querySelector('#contact-form');
// const nameInput = document.querySelector('#name');
// const emailInput = document.querySelector('#email');
// const messageInput = document.querySelector('#message');

// form.addEventListener('submit', (event) => {
//   event.preventDefault(); // Prevent form submission
  
//   // Validate form inputs
//   if (!nameInput.value || !emailInput.value || !messageInput.value) {
//     alert('Please fill in all required fields');
//     return;
//   }
  
//   // Send email using emailjs
//   emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
//     from_name: nameInput.value,
//     reply_to: emailInput.value,
//     message: messageInput.value
//   }).then((response) => {
//     alert('Your message has been sent!');
//     form.reset();
//   }, (error) => {
//     alert('Oops, something went wrong. Please try again later.');
//     console.error(error);
//   });
// });

