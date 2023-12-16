import { Router } from 'express';
import Products from '../dao/dbManagers/products.manager.js';
import Carts from '../dao/dbManagers/carts.manager.js';

const router = Router ();

const productsManager = new Products();
const cartsManager = new Carts();

router.get('/products-view', async(req,res)=>{
    try {
        const products = await productsManager.readProducts();
        console.log("los prodcuts",products)
        res.render('products', {products});
    } catch (error) {
        console.error(error.message);
    }
});

router.get('/carts-view', async(req,res)=>{
    try {
        const carts = await cartsManager.readCarts();
        res.render('carts', {carts});
    } catch (error) {
        console.error(error.message);
    }
});

router.get('/', (req, res) => {
    res.render('chat');
   
});

export default router;