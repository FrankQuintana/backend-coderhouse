import Router from 'express';
import ProductManager from '../productManager.js';

const router = Router();

const productManager = new ProductManager;

router.get('/products', async (req, res) => {
    try {
        const productos = await productManager.getProducts();
        let datos = { productos }

        res.render('home', datos)
    } catch (error) {
        console.log(error)
    }
});

router.get('/timeproducts', (req, res) => {
    res.render('timeProducts');
});

export default router;