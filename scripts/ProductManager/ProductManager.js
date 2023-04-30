

import {Product} from "./Product.js"

export class ProductManager {


    constructor(path) {
        this.path = path
        this.products = []
    }

    loadProducts(){
    
       let inJSON = localStorage.getItem(this.path)
       if( inJSON === null){
        this.saveProducts()
        inJSON = localStorage.getItem(this.path)
       }
       this.products = JSON.parse(inJSON) 
       
    }

    saveProducts(name,products){
        name= this.path
        products = this.products
        const inJson =  JSON.stringify(products)
        localStorage.setItem(name,inJson)

    }

    addProduct(title, description,abv,price,stock,category,thumbnail,db){
        
        this.loadProducts()
        
        let id = null
        if(this.products.some((product)=> product.title===title||this.products.some((product)=> product.id===id))){
            console.log(title)
            throw new Error ('producto ya existe')  
        }
        
        if(this.products.length > 0){
            id = this.products.length + 1
            let product = new Product (id, title, description, abv, price, true, stock, category, thumbnail,db)
            this.products.push(product)
            this.saveProducts()
    
        }

        if(this.products.length === 0){
            id =1
            let  product = new Product ( id, title, description,abv, price, true, stock, category, thumbnail,db)
            this.products.push(product)    
            this.saveProducts()
   
        }
    }

    getProducts() {
        this.loadProducts()
        return this.products
        
    }

    getProductById(id) {
        this.loadProducts()
        const searched = this.products.find(product => product.id === id)
        if (!searched) {
            throw new Error('product not found')
        }

        return searched
    }

     updateProduct(id, newProduct) {
        this.loadProducts()
        const indexSearched = this.products.findIndex(product => product.id === id)
        if (indexSearched === -1) {
            throw new Error('product not found')
        }
        this.products[indexSearched] = newProduct
        this.saveProducts()
        return newProduct
    }

     deleteProductById(id) {
        this.loadProducts()
        const indexSearched = this.products.findIndex(p => p.id === id)
        
        if (indexSearched === -1) {

            throw new Error('product not found')

        }else if(indexSearched === this.products[this.products.length-1]) {

             this.products.pop()
             this.saveProducts()

        }else if (indexSearched===0){

            this.products.shift()
            const idUpdated = this.products.map((p)=> p.id = p.id -1)
            this.products = idUpdated
            this.saveProducts()

        }else{

            const [deleted] = this.products.splice(indexSearched, 1)
            const idUpdated= this.products.map((p)=> p.id > indexSearched+1 ? p.id = p.id -1: p.id = p.id)
            this.products = idUpdated
            this.saveProducts()
            return deleted
        }
        
    }

    copyProductsByIds(idsArr,listName){
        
        let listProducts =[]
        this.loadProducts()
        let inJSON = localStorage.getItem(listName)
        while( inJSON !== null){
            listProducts = JSON.parse(inJSON)
            break
        }
        idsArr.forEach(id=>{
            listProducts.push(this.products[id-1])                
        })    
        inJSON = JSON.stringify(listProducts)
        localStorage.setItem(listName,inJSON)
        
    }
 
    getListProducts(listName){
    
        let inJSON = localStorage.getItem(listName)
        let listProducts= []

       if(inJSON === null){
            return "no list found"
       } else{
            listProducts = JSON.parse(inJSON)
       }
        return listProducts
    }

    reset() {
        this.products= []
        this.saveProducts()

    }
}

