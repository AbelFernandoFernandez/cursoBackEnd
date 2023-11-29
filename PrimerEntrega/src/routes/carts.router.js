import { Router } from 'express';
import CartManager  from '../managers/cartManager.js';

const cartsRouter = Router();

cartsRouter.post('/', async (req, res) => {
  try {
    const response = await CartManager.newCart()
    res.json(response)
  } catch (error) {
    res.send('No se pudo crear carrito')
  }
});

cartsRouter.get('/:cid', async (req, res) => {
  const { cid } = req.params
  try {
    const response = await CartManager.getCartProducts(cid)
    res.json(response)
  } catch (error) {
    res.send('No se pudo enviar productos al carrito')
  }
});

cartsRouter.post('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  try {
    await CartManager.addProductToCart(cid, pid)
    res.send('Producto agregado')
  } catch (error) {
    res.send('No se guardo el producto en el carrito')
  }
});


export { cartsRouter }