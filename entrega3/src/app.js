import express from 'express'
import ProductManager from "./productManager.js"

const app = express()
const productManager = new ProductManager
const PORT = 3000

app.get("/", (req, res) => {
    res.send("Hola mundo en un servidor Express")
})

app.get("/products", async (req, res) => {
    const {limit} = req.query
    try {
        const data = await productManager.getProducts()
        limit ? res.send(data.filter(product => product.id <= limit)) : res.send(data)
    } catch (error) {
        console.log(error)
    }
})

app.get("/products/:pid", async (req, res) => {
    const pid = req.params.pid
    try {
        const data = await productManager.getProducts()
        pid ? res.send(data.find(product => product.id == pid)) : res.send(data)
    } catch (error) {
        console.log(error)
    }
})

app.listen(PORT, (err) => {
    if(err) console.log(err)
    console.log(`servidor http://localhost:${PORT} arriba`)
})