import {Cart} from './Cart.js'
import {UserManager} from '../UserManager/UserManager.js'

export class CartManager {
    carts
    path

    constructor(path) {
        this.path = path
        this.carts = []
    }

    
    // async loadCarts() {
    //     // const json = await fs.readFile(this.path, 'utf-8')
    //     this.carts = 
    // }
     getCart(name){
       let inJSON = localStorage.getItem(name)
       let localCart = JSON.parse(inJSON) 
       return localCart

    }

    saveCart(name,cart){
        const inJson =  JSON.stringify(cart)
        localStorage.setItem(name,inJson)

    }

    // async unloadCarts() {
    //     const newJson = JSON.stringify(this.carts, null, 2)
    //     await fs.writeFile(this.path, newJson)
        
    // }


     getCarts() {
       
        return this.carts
    }

     addCart() {
        try{
         
            if(!localStorage.getItem('User')){
                const tempCart = {id:-1,products:[], userId:-1, temp:true}
                this.saveCart('tempCart', tempCart)
                this.carts.push(tempCart)
            }else{

                if(this.carts.length === 0){
                    const newCart =  new Cart (1,[], userId, false)
                    this.carts.push(newCart)
                    this.saveCart("localCart", newCart)
    
                }else{
                    const newCart =  new Cart (this.carts.length + 1,[], userId, false)
                    this.carts.push(newCart)
                    this.saveCart("localCart", newCart)
                }

            }    
        }catch(error){console.log(error)}
        
    }

    
    getCartById(id) {
        
        const searched = this.carts.find(c => c.id === id)
        if (!searched) {
            throw new Error('id no encontrado')
        }
        return searched
    }



   addToCart(productId,pm){
    let cartId = 0
    debugger
    let quantity = document.getElementById(`${productId}_amount`)
    
    if(!localStorage.getItem('User')){
        cartId = -1
    }else{
        cartId= this.getCart('localCart').id
    }
        let newCart = null
        let cartCounter = 0
    
        if(this.getCartById(cartId) === -1){
           newCart = this.getCart('tempCart')
        }else{
           newCart =  this.getCartById(cartId)
        }        
        const productToAdd =  pm.getProductById(productId)
        console.log(productToAdd)
        console.log(newCart)        
        // const cartProducts = newCart.products
        const inCart = newCart.products.findIndex(p => p.id === productId)
   
        try{
            if(inCart === -1){
                const newProduct= {id: productToAdd.id, quantity: quantity, price: productToAdd.price }
                newCart.products.push(newProduct)

                 
            }else{
                const newProduct= {id: productToAdd.id, quantity: newCart.products[inCart].quantity+quantity, price:productToAdd.price }
                newCart.products[inCart] = newProduct
            }
            console.log(this.getCarts())
            cartCounter = newCart.products.reduce(
                (accumulator, p) => accumulator + p.quantity,
                0
              )
            console.log(cartCounter)
            let desktopCart = document.getElementById("desktop-cart-counter")
            let mobileCart = document.getElementById("mobile-cart-counter")
            desktopCart.innerText= cartCounter
            desktopCart.style.borderBottom = '1px solid black'
            mobileCart.innerText= cartCounter
            mobileCart.style.borderBottom = '1px solid black'
            this.updateCart(newCart.id, newCart)
            

        }catch(error){console.log(error)}

    }

    
    deleteCartById(id) {

        const indexSearched = this.carts.findIndex(c => c.id === id)
        
        if (indexSearched === -1) {

            throw new Error('product not found')

        }else if(indexSearched === this.carts[this.carts.length-1]) {

            return this.carts.pop()
            

        }else if (indexSearched===0){

            this.carts.shift()
            const idUpdated = this.carts.map((cart)=> cart.id = cart.id -1)
            this.carts = idUpdated

        }else{

            const [deleted] = this.carts.splice(indexSearched, 1)
            const idUpdated= this.carts.map((cart)=> cart.id > indexSearched+1 ? cart.id = cart.id -1: cart.id = cart.id)
            this.carts = idUpdated
            return deleted
        }
        
        

        
    }

    updateCart(id, newCart) {
     
        const indexSearched = this.carts.findIndex(c => c.id === id)

        if (indexSearched === -1) {
            throw new Error('product not found')
        }
        this.carts[indexSearched] = newCart
        if(!localStorage.getItem('user')){
            this.saveCart('tempCart', newCart)
        }else{
            this.saveCart('localCart', newCart)
        }
        console.log(newCart)
        return newCart
    }

     deleteCartProductById(cartId,productId) {
         
        const cart = this.getCartById(cartId)
        const indexSearched = cart.products.findIndex(product => product.id === productId)
        if (indexSearched === -1) {
            throw new Error('product not found')
        }
        const newCart = cart.products.splice(indexSearched, 1)

        this.updateCart(cartId, newCart) 

    }

     reset() {
        this.carts = []
       
    }
}
