import fs from 'fs'

class CartManager {
    #ruta = '../public/carts.json'

    constructor() {
        this.path = this.#ruta;
    }

    async createCart() {
        let cart = {}

        if (fs.existsSync(this.path)) {
            let data = await fs.promises.readFile(this.path, 'utf-8')
            let dataJS = JSON.parse(data)

            cart.id = dataJS[dataJS.length - 1].id + 1
            cart.products = []
            dataJS.push(cart)

            await fs.promises.writeFile(this.path, `${JSON.stringify(dataJS, null, 5)}`, 'utf-8')
        } else {
            cart.id = 1
            cart.products = []
            const arC = [cart]

            await fs.promises.writeFile(this.path, `${JSON.stringify(arC, null, 5)}`, 'utf-8')
        }
    }

    async uploadProduct (cid, pid) {
        try {
            let data = await fs.promises.readFile(this.path, 'utf-8')
            let dataJS = JSON.parse(data)
            let carro = dataJS[cid - 1]
            let ind = carro.products.findIndex(product => product.id == pid)

            if (ind !== -1) {
                let product = carro.products[ind]
                product.quantity++
                carro.products[ind] = product
            } else {
                let product = {}
                product.id = pid
                product.quantity = 1
                carro.products = [...carro.products, product]
            }

            dataJS[cid - 1] = carro

            await fs.promises.writeFile(this.path, JSON.stringify(dataJS, null, 5), 'utf-8')
        } catch (error) {
            console.log(error);
        }
    }

    async getCartProducts(cid) {
        try {
            let data = await fs.promises.readFile(this.path, 'utf-8')
            let dataJS = JSON.parse(data)
            let carro = dataJS[cid - 1]

            return carro.products
        } catch (error) {
            console.log(error);
        }
    }
}
export default CartManager;