import { ProductManager } from "./ProductManager/ProductManager.js"
import { CartManager } from "./CartManager/CartManager.js"
import {UserManager} from  "./UserManager/UserManager.js"



const productManager = new ProductManager
const cartManager = new CartManager
const userManager = new UserManager
productManager.addProduct('Ciney','Cerveza Belga Blonde alc.8 33 cl',3500,45,'cervezas','./assets/imgs/cervezas/ciney-blonde.jpg')
productManager.addProduct('Amalaya Gran Corte', 'Vino Tinto Blend Salta', 2800,60, 'vinos','./assets/imgs/vinos/Amalaya-Gran-Corte-Barrel-Selection-01-Mercado.png')
productManager.addProduct('Decantador','Decantador 1 lt cristal de Bohemia',8600,30, 'varios','./assets/imgs/varios/DECANTADOR-DE-VIDRIO-1500ML-MERCADO-LIBRE-1.png' )
productManager.addProduct('San Pellegrino', 'Aguan con Gas 33 cl', 1800,190, 'bebidas', './assets/imgs/bebidas/SAN-PELLEGRINO-SPARKLING-NATURAL-MINERAL-WATER-VIDRIO-CON-GAS-505ML-MERCADO-LIBRE-1.png')

cartManager.addCart()

console.log(productManager.getProducts())

let productsShelf = document.getElementById('products_showcase')
let page = document.getElementsByTagName('title')[0]
let pageName = page.innerText

console.log(pageName)

    let products = null
    if(pageName === "Inicio"){
        products= productManager.getProducts()

    }else{
        products=  productManager.getProducts()
        products = products.filter(p=> p.category === pageName.toLowerCase)
        console.log(products)
        
    }

    products.forEach(p => { productsShelf.innerHTML += `
        <div class= "col-sm-12 col-md-6 col-lg-4">
            <div id="${p.id}" class="card">
            <a id="${p.id}-link" href="#productview/${p.title}">
                <img id="${p.id}-img"src="${p.thumbnail}" class="card-img-top" alt="${p.title}">
            </a>
                <div class="card-body">
                    <h5 class="card-title"> Nombre :  ${p.title}</h5>
                    <p class="card-text">${p.description}.</p>
                    <p id="${p.id}-item_price" class="item-price"> Precio:  $${p.price}</p>
                 </div>
            
            </div>
            <div id="add_cart_button">  
                    <input id="${p.id}_amount" type="number" min="1" max="${p.stock}">                   
                    <button id= "${p.id}-addToCart-button" onclick = "cartManager.addToCart(${p.id}, productManager)" type="button" class="btn btn-secondary">Agregar</button>
            </div>
        </div>
        
          `})


    // productsShelf.addEventListener("click", (e)=>{
    //    let productId= e.target.id
    //    productId=parseInt(productId.slice(0,1))
    //    let product = productManager.getProductById(productId)
    //    console.log(productId)
    //    console.log(product)
      
    //     let itemDetail = document.getElementById('item_detail')
  
    //     itemDetail.style.display = "block"
        
    //     itemDetail.innerHTML = `
    //     <div class="card mb-3" style="max-width: 99vw; height: 100vw; z-index: 6">
    //         <div class="row g-0">
    //             <div class="col-md-4">
    //             <img src="${product.thumbnail}" class="img-fluid rounded-start" alt="...">
    //             </div>
    //             <div class="col-md-8">
    //             <div class="card-body">
    //                 <h5 class="card-title">${product.title}</h5>
    //                 <p class="card-text">${product.description}</p>
    //                 <h6 class="card-text"><bold class="text-body-secondary">${product.price}</bold></h6>
    //                 <p class="card-text">${product.stock}</p>
    //             </div>
    //             </div>
    //         </div>
    //     </div>
        
    //     `
    //    console.log(itemDetail)
    // })
    
    

