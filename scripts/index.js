// import { randomUUID } from '../crypto.js'
// import crypto from '../crypto.js'

class Product {
    constructor(id, title, description,price, status, stock, category, thumbnail) {
       
        this.id = id
        this.title = title
        this.description = description
        this.price= price
        this.status=status
        this.stock = stock
        this.category=category
        this.thumbnail=[]

    }
}

class ProductManager {

  

    constructor() {
      
        this.products = []
    }

     addProduct(title, description, price, stock,category, thumbnail){
       let product ={}
       
        try{
            
            if(this.products.length === 0){
                product = new Product (1, title, description,price, true, stock, category, thumbnail)
                this.products.push(product)     
            }else if(this.products.some((p)=> p.title===title)){
                throw new Error ('producto ya existe')  
              }else{
                product = new Product (this.products.length + 1, title, description, price, true, stock, category, thumbnail)
                this.products.push(product)  
              }
          
        }catch(error){ console.log(error)}     
    }

    getProducts() {
        return this.products  
    }

     getProductsById(id) {
        
        let searched = this.products
        .find(product => product.id === id)
        if (!searched) {
            throw new Error('product not found')
        }
        return searched
    }

     updateProduct(id, newProduct) {
        
        let indexSearched = this.products
        .findIndex(product => product.id === id)
        if (indexSearched === -1) {
            throw new Error('product not found')
        }
        this.products
        [indexSearched] = newProduct
        
        return newProduct
    }

     deleteProductById(id) {
        
        let indexSearched = this.products
        .findIndex(product => product.id === id)
        if (indexSearched === -1) {
            throw new Error('product not found')
        }
        let [deleted] = this.products
        .splice(indexSearched, 1)
        
        return deleted
    }

       reset() {
        this.products = []
        
    }
}

class Cart {
    constructor(id, products) {
        if (!products) throw new Error('falta un argumento')       
        this.id = id
        this.products = []
       
    }

    getTotal(total){
       total = this.products.reduce((total, p)=> total + p.price*p.quantity,0)
       return total
    }
}

class CartManager {
    carts
    

    constructor() {
        this.carts = []
    }


    getCarts() {
        return this.carts
    }

    addCart(id,products) {
        let newCart = {}
        try{
  
            if(this.carts.length === 0){
                id=1
                products=[]
                newCart =  new Cart (id,[])
                console.log(newCart)
                this.carts.push(newCart)
            }else if(this.carts.length> 0 && products === undefined){
                id = this.carts.length+1
                products = []
                newCart =  new Cart (id,products)
                this.carts.push(newCart)
                console.log(newCart)
            }else{
                id = this.carts.length+1
                newCart =  new Cart (id,products)
                this.carts.push(newCart)
            }
            }catch(error){console.log(error)}

    }

    
    getCartById(id) {
       
        let searched = this.carts.find(c => c.id === id)
        if (!searched) {
            throw new Error('id no encontrado')
        }
        return searched
    }

    addToCart(cartId,productId,pm){
   
      let newCart =  this.getCartById(cartId)
      let productToAdd = pm.getProductsById(productId)
      let newProduct= {}
      let inCartProducts = newCart.products
      let index = inCartProducts.findIndex(product => product.id === productId)
        try{
debugger            
            if(index === -1){
                newProduct= {id:productToAdd.id, quantity: 1, price:productToAdd.price,title:productToAdd.title }
                newCart.products.push(newProduct) 
                this.updateCart(cartId, newCart)
            }else{
        
                newProduct= {id:productToAdd.id, quantity: newCart.products[index].quantity + 1 , price:productToAdd.price, title:productToAdd.title}
                newCart.products[index] = newProduct
                this.updateCart(cartId, newCart)
            }
        }catch(error){console.log(error)}

    }

    
    deleteCartById(id) {
       
        let indexSearched = this.carts
        .findIndex(c => c.id === id)
        if (indexSearched === -1) {
            throw new Error('product not found')
        }
        let [deleted] = this.carts
        .splice(indexSearched, 1)
        return deleted
    }

    updateCart(id, newCart) {
       
        let indexSearched = this.carts.findIndex(c => c.id === id)
        if (indexSearched === -1) {
            throw new Error('product not found')
        }
        this.carts[indexSearched] = newCart
        return newCart
    }

    deleteCartProductById(cartId,productId) {
       
        let cart = this.getCartById(cartId)
        let indexSearched = cart.products
        .findIndex(product => product.id === productId)
        if (indexSearched === -1) {
            throw new Error('product not found')
        }
        let newCart = cart.products
        .splice(indexSearched, 1)

        updateCart(cartId, newCart)        
    }

    reset() {
        this.carts = []
    }
}

class User {

    constructor(id,fname,lname,username, email, password, login){
        if(Number.isInteger(fname)) alert('First Name is not a valid input')
        if(Number.isInteger(lname)) alert('Last Name is not a valid input')
        if(email.search("@")===-1)alert ('not a valid email')

        this.id=id
        this.fname=fname
        this.lname=lname
        this.username=username
        this.email=email
        this.password=password
        this.login= false

    }
}
class UserManager{

    constructor(){
        this.users= []
    }

    getUsers(){
        return this.users
    }

    addUser(id,fname,lname,username, email, password){


       let res = prompt("Quieres hacer un usuario: 1.si/ 2.no")

        res = parseInt(res)
       
        console.log(res)
     
       while(res!==1 && res!==2){
            alert("entre un valor valido")
            this.addUser()
       }
       if(res === 1){
            let user = null
            fname= prompt(`Dame tu primer nombre`)
            lname= prompt(`Dame tu primer apellido`)
            username= prompt(`Escribe tu nombre de usuario`)
            while(username.length>20){username = prompt(`Escribe un nombre de usuario que puedas recordar: `)}
            password = prompt(`Dame una clave de por lo menos 8 caracteres`)
            while(password.length < 8){password=prompt(`Dame una clave de por lo menos 8 caracteres`)}
            email= prompt(`Dame un correo`) 
            while(email.search("@")===-1) { email= prompt(`Dame un correo, valido`)}

            try{
                if(this.users.length === 0){
                    user = new User (1, fname,lname,username,email,password, false)
                    this.users.push(user) 
                    alert(`Eres nuestro primer cliente!: ${username}`) 
                    this.loginUser()   
                }else if(this.users.some((user)=> users.username===username||this.users.some((user)=> user.email===email))){
                    alert ('usuario ya existe')  
                    this.addUser()
                }else{
                    user = new User (this.users.length+1, fname, lname, username,email,password, false)
                    this.users.push(user)  
                    alert(`Bienvenido ${username}`)  
                    this.loginUser()   
                }
               
            }catch(error){ alert(error)}   
       }
       if(res===2){ 
            alert('Quizas en otro momento') 
            return
        }
    }
        

    getUserById(id){
       
        try{
            let searched = this.users.findIndex((user)=>user.id === id)
            if(searched !== -1){return searched}
        }catch(error){console.log(error)}
      
    }  
    
    loginUser(){

        let resp = prompt('Quieres iniciar sesion?: 1.si / 2.no')
        resp = parseInt(resp)

     
        while(resp !==1 && resp !==2 ){
            alert('respuesta invalida')
            resp = prompt('Quieres iniciar sesion?: 1.si / 2.no')
            resp = parseInt(resp)  
        }

        if(resp === 1){

            let userCheck =prompt(`dame tu usuario o correo`)
            let password = prompt(`Dame tu contrasena`) 
            let index =this.users.findIndex((user)=> (user.email === userCheck || user.username === userCheck))
            let validateUser = this.users[index !== -1? index: undefined]
            let validatePassword = validateUser.password

            if(validateUser=== undefined || validatePassword!== password ){
                alert('usuario o contrasena incorrecta') 
                return this.loginUser()
            }

            this.users[ validateUser.id-1].login= true 
            cartManager.addCart()
            userId=validateUser.id
            alert(`Feliz compra: ${validateUser.username}`)
            return console.log("carrito asignado")
        }
        
        if(resp === 2){ return alert(`Quizas en otro momento`)}
        
    }
}
    
let userId=null
let productManager = new ProductManager()
let cartManager = new CartManager()
let userManager = new UserManager()

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


function shop(shopping,shopMore,carrito, inventory, shelf,total){
debugger
    shelf = ""
    inventory = productManager.getProducts()
    shopping = true
    while(shopping===true){
        console.log(inventory.length)
        inventory.forEach(product => {shelf += `id: ${product.id}. nombre: ${product.title} precio: ${product.price} \n`})

        console.log(shelf)

        function showProducts(res){

            res = prompt(`Estos son nuestros productos :\n ${shelf}; Si deseas alguno elige seleciona su Id, de lo contrario escribe "salir"`)

           

         

//me costo hacer qeu funcionara un condicional para un numero negativo, es decir los tres condicionales y lo tuve que resolver con esa iteracion

            while( !inventory.find((p)=>p.id=parseInt(res))  && res !== "salir" ){

                alert(`respuesta invalida`)
                res = prompt(`Estos son nuestros productos :\n
                 ${shelf}; Si deseas alguno elige seleciona su Id, de lo contrario escribe "salir"`)
            }

           if(res=== 'salir'){
                
                alert("Ok, te esperamos en otro momento!")
                shopping=false
            }
            

            if(userId !== null){
                cartManager.addToCart(userId,parseInt(res),productManager)
                cartManager.getCarts()
                carrito= cartManager.getCartById(userId)
            }

            if(userId === null && cartManager.carts.length === 0){ 
                cartManager.addCart()
                cartManager.addToCart(cartManager.carts.length,parseInt(res),productManager)
                carrito = cartManager.getCartById(cartManager.carts.length)
            }

            
            if(userId===null && cartManager.carts.length > 0){
                cartManager.addToCart(cartManager.carts.length,parseInt(res),productManager)
                carrito = cartManager.getCartById(cartManager.carts.length)
            }
            
            shopMore = prompt("Quieres seguir comprando: 1.si/2.no ?")
            shopMore=parseInt(shopMore)

            while(shopMore !== 1 && shopMore !== 2){
                alert(`respuesta invalida`) 
                shopMore = prompt("Quieres seguir comprando: 1.si/2.no ?")
                shopMore=parseInt(shopMore)
            }

            if(shopMore === 2){shopping = false}
            if(shopMore===1){shopping=true}
        }

        showProducts()

    }

    let mostrarCarrito= ""

    carrito.products.forEach((product) => {mostrarCarrito += `
    id: ${product.id}. nombre: ${product.title} precio: ${product.price} cantidad: ${product.quantity} \n`})

    total = carrito.getTotal()

    if(carrito.products.length > 0 && userId === null){
       
        alert(`Estos son tus productos: \n ${mostrarCarrito} \n Este es tu total: ${total}`)
 
        cartManager.carts.pop()

        return (`Gracias por tu compra`)

    }

    if(carrito.products.length === 0){
        alert(`la proxima vez conseguiras algo`)
        return
    }
    debugger
    let greeting = (userManager.users[userId-1].username)
    alert(`Estos son tus productos: ${greeting}\n ${mostrarCarrito}  \n Este es tu total: ${total}`)    
    alert(`Gracias por tu compra`)
}  

userManager.addUser()
console.log(userId)
shop()





