import { existsSync, promises } from 'fs'
// const fs = require('fs')

class ProductManager {

    #ruta = '../public/products.json'

    constructor() {
        this.path = this.#ruta
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        const product = {
            title, 
            description, 
            price, 
            thumbnail, 
            code, 
            stock
        }

        try {
            if (existsSync(this.path)) {
                console.log("existe el producto")
                let data = await promises.readFile(this.path, 'utf-8')
                let dataJS = JSON.parse(data)

                product.id = dataJS[dataJS.length - 1].id + 1
                dataJS.push(product)

                await promises.writeFile(this.path, `${JSON.stringify(dataJS, null, 5)}`, 'utf-8')
            }else {
                product.id = 1
                const arrProducts = [product]

                await promises.writeFile(this.path, `${JSON.stringify(arrProducts, null, 5)}`, 'utf-8')
            }
        }catch (error) {
            console.log(error)
        }
    }

    async getProducts() {
        try {
            let data = await promises.readFile(this.path,'utf-8')
            let dataJS = JSON.parse(data)
            return dataJS
        } catch (error) {
            console.log(error)
        }
    }

    async getProductById(id) {
        try {
            let data = await promises.readFile(this.path,'utf-8')
            let dataJS = JSON.parse(data)

            const productById = dataJS.find(product => product.id === id)

            return productById

        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(id, objeto) {
        try {
            let data = await promises.readFile(this.path,'utf-8')
            let dataJS = JSON.parse(data)

            const productById = dataJS.find(product => product.id === id)

            productById = objeto
            productById.id = id
            dataJS.splice((id - 1), 1, productById)

            await promises.writeFile(this.path, `${JSON.stringify(dataJS, null, 5)}`, 'utf-8')

        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(id) {
        try {
            let data = await promises.readFile(this.path,'utf-8')
            let dataJS = JSON.parse(data)
            dataJS.splice((id - 1), 1)

            await promises.writeFile(this.path, `${JSON.stringify(dataJS, null, 5)}`, 'utf-8')

        } catch (error) {
            console.log(error)
        }
    }
}
export default ProductManager;