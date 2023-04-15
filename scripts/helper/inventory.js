
export function createInventory(pm){
    
    pm.loadProducts()
    if(pm.products.length===0){
        pm.addProduct('Ciney','Cerveza Belga Blonde alc.8 33 cl',3500,45,'cervezas','./assets/imgs/cervezas/ciney-blonde.jpg')
        pm.addProduct('Amalaya Gran Corte', 'Vino Tinto Blend Salta', 2800,60, 'vinos','./assets/imgs/vinos/Amalaya-Gran-Corte-Barrel-Selection-01-Mercado.png')
        pm.addProduct('Decantador','Decantador 1 lt cristal de Bohemia',8600,30, 'varios','./assets/imgs/varios/DECANTADOR-DE-VIDRIO-1500ML-MERCADO-LIBRE-1.png' )
        pm.addProduct('San Pellegrino', 'Aguan con Gas 33 cl', 1800,190, 'bebidas', './assets/imgs/bebidas/SAN-PELLEGRINO-SPARKLING-NATURAL-MINERAL-WATER-VIDRIO-CON-GAS-505ML-MERCADO-LIBRE-1.png')  
    }
}