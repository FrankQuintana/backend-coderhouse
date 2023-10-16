class ProductManager {

    constructor () {
        this.products=[]
    }

    getProducts() {
        return this.products
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        let id = 1
        if (this.products.length>0) {
            id=this.products[this.products.length-1].id+1
        }

        let newProduct = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        this.products.push(newProduct)
    }

    getProductById(id) {
        let indice = this.products.findIndex(product => product.id===id)
        if (indice===-1) {
            console.log(`no existe el producto con id ${id}`)
            return
        }
        return this.products[indice]
    }

}

let op = new ProductManager()
op.addProduct('producto prueba', 'es una prueba', '500', 'none', 'sd45', '15')
op.addProduct('prueba2', 'otra prueba', '700', 'anyware', 'gd45', '12')
op.addProduct('prueba3', 'otra mas prueba', '900', 'anymore', 'gd45', '1')

console.log(op.getProducts());
console.log(op.getProductById(48));
