// const router = express.Router();
import { Router } from "express";
import ProductManager from "../productManager.js";

const router = Router();
const productManager = new ProductManager

router.get('/', async (req, res) => {
    const {limit} = req.params

    try {
        const data = await productManager.getProducts()
        limit ? res.send(data.filter(product => product.id <= limit)) : res.status(200).json(data);
    } catch (error) {
        res.status(500).json({error: 'Error de servidor'})
    }
});

router.get('/:pid', async (req, res) => {
    const { pid } = req.params

    try {
        const data = await productManager.getProducts()
        pid ? res.send(data.filter(product => product.id == pid)) : res.send(data);
    } catch (error) {
        res.status(500).json({error: 'Error de servidor'})
    }
});

router.post('/', async (req, res) => {
    const {
        title,
        description,
        code,
        price,
        status,
        stock,
        thumbnail,
        category
    } = req.body
// #$%¨*()_||
    if (title == undefined || description == undefined || code == undefined || price == undefined || status == undefined || stock == undefined || thumbnail == undefined || category == undefined) {
        res.send({aviso: 'Datos invalidos'});
    } else {
        try {
            await productManager.addProduct(title, description, code, price, status, stock, thumbnail, category)
            res.send({aviso: 'Producto agregado'});
        } catch (error) {
            res.status(500).json({error: 'Error de servidor'})
        }
    }
});

router.put('/:pid', async (req, res) => {
    const { pid } = req.params
    const {
        title,
        description,
        code,
        price,
        status,
        stock,
        thumbnail,
        category
    } = req.body
    if (title == undefined || description == undefined || code == undefined || price == undefined || status == undefined || stock == undefined || thumbnail == undefined || category == undefined) {
        res.send({aviso: 'Datos invalidos'});
    } else {
        let obj = {
            title,
            description,
            code,
            price,
            status,
            stock,
            thumbnail,
            category  
        }
        try {
            await productManager.updateProduct(pid, obj)
            res.send({aviso: 'Producto actualizado'});
        } catch (error) {
            res.status(500).json({error: 'Error de servidor'})
        }
    }
});

router.delete('/:pid', async (req, res) => {
    const { pid } = req.params

    try {
        await productManager.deleteProduct(pid)
        res.send({aviso: 'Producto eliminado'});
    } catch (error) {
        res.status(500).json({error: 'Error de servidor'})
    }
});

export default router;