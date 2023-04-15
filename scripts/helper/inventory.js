
export function createInventory(pm){
    
    pm.loadProducts()
    if(pm.products.length===0){
        pm.addProduct('Ciney','Cerveza Belga Blonde alc.8 33 cl',3500,45,'cervezas','./assets/imgs/cervezas/ciney-blonde.jpg')
        pm.addProduct('Amalaya Gran Corte', 'Vino Tinto Blend Salta', 2800,60, 'vinos','./assets/imgs/vinos/Amalaya-Gran-Corte-Barrel-Selection-01-Mercado.png')
        pm.addProduct('Decantador','Decantador 1 lt cristal de Bohemia',8600,30, 'varios','./assets/imgs/varios/DECANTADOR-DE-VIDRIO-1500ML-MERCADO-LIBRE-1.png' )
        pm.addProduct('Cabaña Piedras Blancas Provoleta de Cabra', 'Queso tupo artesanal 80gr', 1200,20, 'comida', './assets/imgs/comida/261378-800-auto.webp')  
        pm.addProduct('San Pellegrino', 'Aguan con Gas 33 cl', 1800,30, 'bebidas', './assets/imgs/bebidas/SAN-PELLEGRINO-SPARKLING-NATURAL-MINERAL-WATER-VIDRIO-CON-GAS-505ML-MERCADO-LIBRE-1.png')  
        pm.addProduct('Jamon Serrano Tangama', 'Jamon Iberico Importado de España, 100gr', 4900,20, 'comida', './assets/imgs/comida/00750104005196L.webp')
        pm.addProduct('Whisky Swing ', 'Johnny Walker, Alc.40, 75cc', 9000,30, 'whiskies', './assets/imgs/licores/whiskyswing.jpg')  
        pm.addProduct('El Profeta Gin', 'Ginebra Artesal, hecha en Argentina, Alc.40, 75 cl', 2500,29, 'licores', './assets/imgs/licores/ginebra-el-profeta-750-ml.jpg')  
        pm.addProduct('Ron Zaracapa XO', 'Ron Extra Añejo, Hecho en Nicaragua, Alc.40, 75 cl', 12500,23, 'licores', './assets/imgs/licores/ron-zaracapa-xo.webp')  
        pm.addProduct('Tequila Patron', 'Aguan con Gas 33 cl', 8790,30, 'licores', './assets/imgs/licores/anejopatron.jpg')  
        pm.addProduct('Johny Walker Red Label', 'Aguan con Gas 33 cl',6500,30, 'whiskies', './assets/imgs/licores/johnnie-walker-red-label-blended-scotch-whisky-01.webp')  
        pm.addProduct('Bombay Saphire Gin', 'Gin Extra Destilada, 75cl', 8000,30, 'licores', './assets/imgs/licores/bombay-saphire.webp')  
        pm.addProduct('Luca Old Vine', 'Aguan con Gas 33 cl', 5000,30, 'vinos', './assets/imgs/vinos/luca-malbec.png')  
        pm.addProduct('El Enemigo Malbec', 'Aguan con Gas 33 cl', 4200,30, 'vinos', './assets/imgs/vinos/vino-el-enemigo-malbec-botella-750ml-a582a8a18e.webp')  
        pm.addProduct('Corona 6-pack Botella', 'Aguan con Gas 33 cl', 1800,30, 'cervezas', './assets/imgs/cervezas/coronasixpack.jpg')  
        pm.addProduct('Quilmes de Lata 6-pack', 'Aguan con Gas 33 cl', 1800,30, 'cervezas', './assets/imgs/cervezas/quilmes473.png')
        pm.addProduct('Chimay Bleau', 'Aguan con Gas 33 cl', 1800,30, 'cervezas', './assets/imgs/cervezas/Chimay bleu.jpg')
        pm.addProduct('MacCallagan 12', 'Aguan con Gas 33 cl', 14000,30, 'whiskies', './assets/imgs/whiskies/macallan-12-anos-whisky-1617701221.jpg')            




    }


    async function getBooze() {
       const resp = await fetch("www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka")
       const data = await resp.json()
       console.log(data)
    }

    async function getGin() {
        const resp = await fetch("www.thecocktaildb.com/images/ingredients/gin.png")
        const data = await resp.json()
        console.log(data)
     }
}
