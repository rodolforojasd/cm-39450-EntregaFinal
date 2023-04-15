import {Cart} from './Cart.js'
import {UserManager} from '../UserManager/UserManager.js'
import { Product } from '../ProductManager/Product.js'



export class CartManager {


    constructor() {
        this.carts = []
    }


    nameStorageCart(){
        let name
        if(!localStorage.getItem('User')){
            name = 'tempCart'
        }else{
            name= 'localCart'
        } 
        return name
    }
    

    getStorageCart(){
 
       let name = this.nameStorageCart()
       let inJSON = localStorage.getItem(name)
       let localStorageCart = JSON.parse(inJSON) 
       return localStorageCart

    }

    saveStorageCart(name,cart){
        name= this.nameStorageCart()
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
    
            let name = this.nameStorageCart()
            while(!localStorage.getItem(name)){
                if(!localStorage.getItem('User')){
                    const tempCart = {id:-1,products:[], userId:-1, temp:true}
                    this.saveStorageCart(name, tempCart)
                    this.carts.push(tempCart)
                }else{
    
                    if(this.carts.length === 0){
                        const newCart =  new Cart (1,[], userId, false)
                        this.carts.push(newCart)
                        this.saveStorageCart(name, newCart)
        
                    }else{
                        const newCart =  new Cart (this.carts.length + 1,[], userId, false)
                        this.carts.push(newCart)
                        this.saveStorageCart(name, newCart)
                    }
    
                }    

            }
            
       
        
    }

    
    getCartById(id) {
        
        const searched = this.carts.find(c => c.id === id)
        if (!searched) {
            throw new Error('id no encontrado')
        }
        return searched
    }

    getCartProductById(id) {
        let cart=this.getStorageCart() 
        const searched = cart.products.find(product => product.id === id)
        if (!searched) {
            throw new Error('product not found')
        }

        return searched
    }

    countCartItems(){
  
        let name = this.nameStorageCart()
        let cart = this.getStorageCart(name)
        let cartCounter= 0
        if(cart.products.length > 0){
             cartCounter = cart.products.reduce(
                (accumulator, p) => accumulator + p.quantity, 0)
                return cartCounter
        }else{
            cartCounter = 0
            return cartCounter
        }
  
    }

    getCartTotal(){
        let name = this.nameStorageCart()
        let cart = this.getStorageCart(name)
        let cartTotal = cart.products.reduce(
            (accumulator, p) => accumulator + (p.quantity*p.price), 0)
            return cartTotal
    }  
    

   addToCart(productId, pm, quantity){
            
        let name = this.nameStorageCart()
        let newCart = []
        let cartCounter = 0
        // let addBtn = document.getElementById(`${productId}-addToCart-button`)
        // let quantityElement = document.getElementById(`${productId}_amount`)
        
        const productToAdd =  pm.getProductById(productId)
        let stock = productToAdd.stock

        


        
        newCart = this.getStorageCart()

        const inCart = newCart.products.findIndex(p => p.id === productId)
        
        if(inCart === -1){
            const newProduct= {id: productToAdd.id, quantity: quantity,title:productToAdd.title, price:productToAdd.price, stock:productToAdd.stock, thumbnail:productToAdd.thumbnail }
            newCart.products.push(newProduct)

                
        }else{
            const newProduct= {id: productToAdd.id, quantity: newCart.products[inCart].quantity+quantity, title:productToAdd.title,price: productToAdd.price, stock:productToAdd.stock, thumbnail:productToAdd.thumbnail }
            newCart.products[inCart] = newProduct
        }

        this.saveStorageCart(name, newCart)
        cartCounter = this.countCartItems()
        
        
        return cartCounter
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

    updateCart(newCart,name ) {
        name = this.nameStorageCart()
        let cart = this.getStorageCart()
        const indexSearched = cart.products.findIndex(p => p.id === id)

        if (indexSearched === -1) {
            throw new Error('product not found')
        }
        this.carts.products[indexSearched] = newCart
        this.saveStorageCart(name,newCart)
        return newCart
    }



    deleteCartProductById(productId) {
        
        let name = this.nameStorageCart()
        let cart = this.getStorageCart()
        let newCart = []
        let deleted = {}
        let indexSearched = cart.products.findIndex(product => product.id === productId)
        if (indexSearched === -1) {
            throw new Error('product not found')
        }
        if(cart.products.length === 0){
            cart.products=[]
            newCart=cart
        }else if(indexSearched===0 && cart.products.length > 0){
            cart.products.shift()
            newCart = cart
        }else if(indexSearched === cart.products[cart.products.length-1]){
            cart.products.pop()
            newCart=cart
        }else{
            deleted = cart.products.splice(indexSearched, 1)
            newCart=cart

        }
        this.saveStorageCart(name,newCart) 

    }



     reset() {
        this.carts = []
       
    }
}
