

import {Product} from "./Product.js"

export class ProductManager {
    products
    path

    constructor(path) {
        this.path = path
        this.products = []
    }




     addProduct(title, description, price, stock,category, thumbnail){
        
        try{
             

            let id = null
            if(this.products.some((product)=> product.title===title||this.products.some((product)=> product.id===id))){
                throw new Error ('producto ya existe')  
            }
            
            if(this.products.length > 0){
                id = this.products.length + 1
                let product = new Product (id, title, description, price, true, stock, category, thumbnail)
                this.products.push(product)
                console.log(product)
                console.log(this.getProducts())
                 
            }

            if(this.products.length === 0){
                id =1
                let  product = new Product ( id, title, description, price, true, stock, category, thumbnail)
                this.products.push(product)    
                console.log(product)
                console.log(this.getProducts()) 
                 
            }


        }catch(error){ console.log(error)}
       
    }

     getProducts() {
 
        return this.products
        
    }

     getProductById(id) {
 
        const searched = this.products.find(product => product.id === id)
        if (!searched) {
            throw new Error('product not found')
        }

        return searched
    }

     updateProduct(id, newProduct) {

        const indexSearched = this.products.findIndex(product => product.id === id)
        if (indexSearched === -1) {
            throw new Error('product not found')
        }
        this.products[indexSearched] = newProduct
        return newProduct
    }

     deletepById(id) {

        const indexSearched = this.products.findIndex(p => p.id === id)
        
        if (indexSearched === -1) {

            throw new Error('product not found')

        }else if(indexSearched === this.products[this.products.length-1]) {

            return this.products.pop()
            

        }else if (indexSearched===0){

            this.products.shift()
            const idUpdated = this.products.map((p)=> p.id = p.id -1)
            this.products = idUpdated

        }else{

            const [deleted] = this.products.splice(indexSearched, 1)
            const idUpdated= this.products.map((p)=> p.id > indexSearched+1 ? p.id = p.id -1: p.id = p.id)
            this.products = idUpdated
            return deleted
        }
        
        

        
    }

     reset() {
        this.products= []
   

    }
}

