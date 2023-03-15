import { randomUUID } from 'crypto'
import crypto from 'crypto'
class Product {
    constructor({ id, title, description, code, price, status, stock, category, thumbnail}) {
       
        if (!title) throw new Error('falta un argumento title')
        if (!description) throw new Error('falta un argumento')
        if(Number.isNaN(price)||!price) throw new Error('falta un argumento price o es un tipo invalido')
        if(Number.isNaN(stock)||!stock) throw new Error('falta un argumento stock o es un tipo invalido')
        if (!category) throw new Error('falta el argumento category')
        if (thumbnail.lenght === 0) throw new Error('falta un argumento thumbnail')

        this.id = id
        this.nombre = nombre
        this.description = description
        this.code = code
        this.price= price
        this.status=status
        this.stock = stock
        this.category=category
        this.thumbnail=[]

    }
}

class ProductManager {
    #products
  

    constructor(path) {
      
        this.#products
         = []
    }

     addProduct(title, description, price, stock,category, thumbnail){
       const product = null
       
        try{
            if(this.#products.lenght === 0){
                product = new Product (1, title, description, randomUUID(), price, true, stock, category, thumbnail)
                this.#products.push(product)     
            }else if(this.#products.some((product)=> product.title===title||this.#products.some((product)=> product.id===id))){
                throw new Error ('producto ya existe')  
              }else{
                product = new Product (this.#products.lenght+1, title, description, randomUUID(), price, true, stock, category, thumbnail)
              }
          
        }catch(error){ console.log(error)}     
    }

         getProducts() {
        return this.#products  
    }

     getProductsById(id) {
        
        const searched = this.#products
        .find(product => product.id === id)
        if (!searched) {
            throw new Error('product not found')
        }
        return searched
    }

     updateProduct(id, newProduct) {
        
        const indexSearched = this.#products
        .findIndex(product => product.id === id)
        if (indexSearched === -1) {
            throw new Error('product not found')
        }
        this.#products
        [indexSearched] = newProduct
        
        return newProduct
    }

     deleteProductById(id) {
        
        const indexSearched = this.#products
        .findIndex(product => product.id === id)
        if (indexSearched === -1) {
            throw new Error('product not found')
        }
        const [deleted] = this.#products
        .splice(indexSearched, 1)
        
        return deleted
    }

     reset() {
        this.#products
         = []
        
    }
}

class Cart {
    constructor({ id, products}) {
        if (!products) throw new Error('falta un argumento')       
        this.id = id
        this.products = products
       
    }
}

class CartManager {
    #carts
    #path

    constructor(path) {
        this.#carts = []
    }


    getCarts() {
        return this.#carts
    }

    addCart(id,products=[]) {
        const newCart = {}
        try{
           
            if(this.#products.lenght === 0){
                newCart =  new Cart (1,products)
                this.#carts.push(newCart)
            }else{
                newCart =  new Cart (this.#carts.lenght+1,products)
                this.#carts.push(newCart)
            }

        }catch(error){console.log(error)}
        
    }

    
    getCartById(id) {
       
        const searched = this.#carts.find(c => c.id === id)
        if (!searched) {
            throw new Error('id no encontrado')
        }
        return searched
    }

    addToCart(cartId,productId,getProductById){
      const cart =  this.getCartById(cartId)
      const productToAdd = getProductById(productId)
     try{
        if(cart.quantity===0){
            const cartProduct= {id:productToAdd.id,quantity:1, price:productToAdd.price }
          }else{
            const cartProduct= {id:productToAdd.id,quantity:quantity+1, price:productToAdd.price }
          }
          cart.products.push(cartProduct)
          this.updateCart(cartId,cart)
     }catch(error){console.log(error)}

    }

    
    deleteCartById(id) {
       
        const indexSearched = this.#carts
        .findIndex(c => c.id === id)
        if (indexSearched === -1) {
            throw new Error('product not found')
        }
        const [deleted] = this.#carts
        .splice(indexSearched, 1)
        return deleted
    }

    updateCart(id, newCart) {
       
        const indexSearched = this.#carts
        .findIndex(c => c.id === id)
        if (indexSearched === -1) {
            throw new Error('product not found')
        }
        this.#carts
        [indexSearched] = newCart
        return newCart
    }

    deleteCartProductById(cartId,productId) {
       
        const cart = this.getCartById(cartId)
        const indexSearched = cart.products
        .findIndex(product => product.id === productId)
        if (indexSearched === -1) {
            throw new Error('product not found')
        }
        const newCart = cart.products
        .splice(indexSearched, 1)

        updateCart(cartId, newCart)        
    }

    reset() {
        this.#carts = []
    }
}

class User {

    constructor(id,fname,lname,username, email, password,salt, login=false){
        if(Number.isInteger(fname)) alert('First Name is not a valid input')
        if(Number.isInteger(lname)) alert('Last Name is not a valid input')
        if(email.search("@")===-1)alert ('not a valid email')

        this.id=id
        this.fname=fname
        this.lname=lname
        this.username=username
        this.email=email
        this.salt= crypto.randomBytes(128).toString('base64')
        this.password = crypto.createHmac('sha256', this.salt).update(password).digest('hex')
        this.login= login

    }
}
class UserManager{
    #users
    constructor(){
        this.users= []
    }
    addUser(id,fname,lname,username, email, password){
       let res = prompt(`Quieres crear un usuario? 1.si/2.no`)
       res = parseInt(res)
       while(Number.isNaN(res)){
            alert("entre un valor valido")
            res = prompt(`Quieres crear un usuario? 1.si/2.no`)
            parseInt(res)
       }
       if(res=== 1){
            const user = null
            fname= prompt(`Dame tu primer nombre`)
            fname.toLowerCase()
            lname= prompt(`Dame tu primer apellido`)
            lname.toLowerCase()
            username= prompt(`Escribe tu nombre de usuario`)
            while(username.lenght>20){username = prompt(`Escribe un nombre de usuario que puedas recordar: `)}
            password = prompt(`Dame una clave de por lo menos 8 caracteres`)
            while(password.lenght < 8){password=prompt(`Dame una clave de por lo menos 8 caracteres`)}

            try{
                if(this.#users.lenght === 0){
                    user = new User (1, fname,lname,username,email,password)
                    this.#users.push(user)     
                }else if(this.#users.some((user)=> users.username===username||this.#users.some((user)=> user.email===email))){
                    alert ('usuario ya existe')  
                    this.addUser()
                }else{
                    user = new User (this.#users.lenght+1, fname, lname, username,email,password)
                }
                this.loginUser()
            }catch(error){ alert(error)}   
       }
       if(res===2){ 
            alert('Quizas en otro momento') 
            return
        }
    }
        

    getUserById(){

    }  
    
    loginUser(){
        let res =prompt('Quieres iniciar sesion?: si/no')==="si"
        res.toLowerCase()
        if(res==="yes"){
         
            let userCheck =prompt(`dame tu usuario o correo`)
            let password = prompt(`Dame tu contrasena`)        
            let userIndex= this.users.findIndex((user)=> user.username===userCheck||user.email===userCheck)
            let validateuser = this.users[userIndex]
            let validatepassword = validateuser.password
            if(userIndex > -1||validatepassword!== crypto.createHmac('sha256', validateuser.salt).update(password).digest('hex') ){
                alert('usuario o contrasena incorrecta')
            } 
             this.users[userIndex].login= true 
             alert(`Bienvenido ${validateuser.fname} ${validateuser.lname}!`)
             cartManager.addCart(validateuser.id)
             userId=validateuser.id
        } 
        if(res==="no"){
            alert(`Quizas en otro momento`)
            return
        }else{
            alert(`Respuesta invalida`)
            return this.loginUser()
        }
        
    }
}
    


let userId=null
const productManager = new ProductManager()
const cartManager = new CartManager()
const userManager = new UserManager()

productManager.addProduct('Añejo Patrón','Tequila 100% Agave, Hecho en México', 6800, 25,'licores',['../assets/imgs/products/anejopatron.jpg'])
productManager.addProduct('Bombay Shapphire','London Dry Gin, Alc.40%',4800,25,'licores',['../assets/imgs/products/bombay-saphire.webp'])
productManager.addProduct('Chimay Bleu','Peres Trappistes, hecho en Bélgica, Alc. 9%', 2400, 25,'cervezas',['../assets/imgs/products/Chimay bleu.jpg'])
productManager.addProduct('Cerveza Ciney','Cerveza Belga Blonde, Alc.10%',2420,25,'cervezas',['../assets/imgs/products/ciney-blonde.jpg'])
productManager.addProduct('Lindemans Kriek Cherry','Cerveza Lambic, sabor cereza, Hecha en Bélgica',2600, 25,'cervezas',['../assets/imgs/products/Lindemans_Kriek_BottleGlass_website_2022-1.png'])
productManager.addProduct('Delirium Tremens Blonde','Cerveza Rubia, Hecha en Bélgica, Alc. 8,5%',2400, 25,'cervezas',['../assets/imgs/products/delirium-tremens-blonde.jpg'])
productManager.addProduct('El Profeta','Ginebra, Industria Argentina, Alc. 40%',2400,25,'vinos',['../assets/imgs/products/ginebra-el-profeta-750-ml.jpg'])
productManager.addProduct('Luca Old Vine Malbec','Uco Valley ',3100, 25,'vinos',['../assets/imgs/products/luca-malbec.png'])
productManager.addProduct('Zarapaca XO','Gran Reserva Especial, Solera, Hecho en Guatamala',7800,25,'licores',['../assets/imgs/products/ron-zaracapa-xo.webp'])
productManager.addProduct('Rutini Malbec','Mendoza, alc. 18% ',2790, 25,'licores',['../assets/imgs/products/rutini-malbec-2021.png'])
productManager.addProduct(' Santa Teresa 1796','Ron Venezolano Extra Añejo, Alc.40%',7000,25,'licores',['../assets/imgs/products/santa-teresa-1796.jpg'])
productManager.addProduct('El Enemigo, Malbec','Mendoza. Año 2021',3560,25,'vinos',['../assets/imgs/products/vino-el-enemigo-malbec-botella-750ml-a582a8a18e.webp'])
console.log(productManager.getProducts())

userManager.addUser()

function shop (res,seguir){
    let allProducts = productManager.getProducts()
  
    function showProducts(products){
        let selected=[]
         products.forEach(product => {
             selected += `id:${product.id}. nombre:${product.title} precio:${product.price}\n`
        })
        alert(`${selected}`)
        let addProductIndex =promp(`Elige un producto por id si quieres agregarlo: `)
        if(!userId){
            alert(`solo puedes comprar si eres usuario`)
            let isUser=(`eres usuario: 1.si/2.no/3.no me interesa`)
            while(Number.isNaN(isUser)&& isUser>3 && isUser<1){
                alert("entre un valor valido")
                res = prompt(`eres usuario: 1.si/2.no`)
                parseInt(seguir)
            }
            if(isUser= 1) {userManager.loginUser()}
            if(isUser=2){userManager.addUser()}
            if(isUser=3) {
                alert(`Lo siento, quizas en otro momento`)
                return
            }
        }
        if(parseInt(addProductIndex).lenght < allProducts.lenght && Number.isInteger(parseInt(addProductIndex))){
            cartManager.addToCart(userId,addProductIndex,getProductById(addProductIndex)) 
        }
    }

    let res=promp(`Quieres comprar:1.si/2.no`)

    res = parseInt(res)

    while(Number.isNaN(res)){
         alert("entre un valor valido")
         res = prompt(`Quieres comprar:1.si/2.no`)
         parseInt(res)
    }

    if(res=== 1){
        showProducts(allProducts)
        seguir = prompt(`Quieres seguir comprando1.si/2.no`)
        while(Number.isNaN(seguir)&& seguir>2 && seguir<1){
            alert("entre un valor valido")
            res = prompt(`Quieres comprar:1.si/2.no`)
            parseInt(seguir)
        }
        while(seguir===1){
        showProducts(allProducts)
        seguir = prompt(`Quieres seguir comprando1.si/2.no`)
            }
        alert(`Gracias por tu compra tu carrito es ${cartManager.getCartById(userId)}`)

    }

    if(res===2){
        alert(`Lo esperamos pronto`)
    }

}


shop()