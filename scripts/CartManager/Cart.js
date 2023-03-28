export class Cart {
    constructor( id, products, userId, temp) {
        if (!products) throw new Error('falta un argumento')       
        this.id = id
        this.products = products
        this.userId = userId
        this.temp = temp
       
    }
}