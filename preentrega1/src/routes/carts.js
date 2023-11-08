import {Router} from 'express';
import ProductManager from '../productManager.js';
import CartManager from '../cartManager.js';

const router = Router();

const productManager = new ProductManager
const cartManager = new CartManager

router.get('/', async (req, res) => {
    try {
        const carts = await cartManager.getCartProducts()
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({error: 'Error de servidor'})
    }
});

router.post('/', async (req, res) => {
    try {
        const cart = await cartManager.createCart()
        if (cart) {
            res.status(200).json({mensaje: `Carro creado con id: ${cart.id}`})
        } else {
            res.status(500).json({error: 'Error al crear carro'})
        }
    } catch (error) {
        res.status(500).json({error: 'Error de servidor'})
    }
})

router.get('/:cid', async (req, res) => {
    const { cid } = req.params

    try {
        let arPC = []
        const cartProducts = await cartManager.getCartProducts(cid)
        await cartProducts.forEach(async (element) => {
            try {
                let product = await productManager.getProductById(element.id)
                product.quantity = element.quantity
                arPC = [...arPC, product]

                if (cartProducts.length == arPC.length) {
                    res.status(200).json(arPC);
                }
            } catch (error) {
                res.status(404).json({error: 'No encontrado'})   
            }
        });
    } catch (error) {
        res.status(500).json({error: 'Error de servidor'})
    }
}); 

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params
    try {
        await cartManager.uploadProduct(cid, pid)
        res.status(200).json({mensaje: 'Producto agregado al carro'});
    } catch (error) {
        res.status(500).json({error: 'Error de servidor'})
    }
});

export default router;
