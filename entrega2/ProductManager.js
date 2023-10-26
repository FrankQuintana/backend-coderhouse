const fs = require('fs')

class ProductManager {
    #ruta = '../products.json'
    constructor () {
        // this.products=[]
        this.path = this.#ruta
    }

    getProducts() {
        if(fs.existsSync(this.path)){
            return JSON.parse(fs.readFileSync(this.path,"utf-8"))
        }else{
            return []
        }
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        let products = this.getProducts();

        let id = 1
        if (products.length>0) {
            id=products[products.length-1].id+1
        }

        let exists = products.find(pro = pro.code === code)
        if (exists) {
            console.log(`el producto con codigo ${code} ya existe!!`)
            return
        } 

        products.push({
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        })

        fs.writeFileSync(this.path, JSON.stringify(products, null, 5))
    }

    getProductById(id) {
        let products=this.getProducts()
        let indice = products.findIndex(product => product.id===id)
        if (indice===-1) {
            console.log(`no existe el producto con id ${id}`)
            return
        }
        return
    }

    updateProduct(id, obj){
        let products=this.getProducts()
        let indice = products.findIndex(product=>product.id === id)
        if(indice === -1){
            console.log(`no existe el producto con id ${id}`)
            return 
        }

        const compObjeto = (objeto) => {
            return objeto === Object(objeto)
        }
        const objetoComp = compObjeto(obj);
        if (!objetoComp) {
            console.log("No es un objeto")
            return
        }

        products[indice]={
            ...products[indice],
            ...obj,
            id
        }
        
        fs.writeFileSync(this.path, JSON.stringify(products, null, 5))
    }

    deleteProduct(id){
        let products=this.getProducts()
        let indice = products.findIndex(product=>product.id === id)
        if(indice === -1){
            console.log(`no existe el producto con id ${id}`)
            return 
        }
        products.splice(indice, 1)

        fs.writeFileSync(this.path, JSON.stringify(products, null, 5))
    }

}

const op = new ProductManager("./products.json")
console.log(op.getProducts())
