import { Router } from "express";
import  ProductManager  from "../managers/productManager";

const productRouter = Router();

productRouter.get('/', async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await ProductManager.getProducts()
        if (limit) {
            const limitedProduct = products.slice(0, limit)
            return res.json(limitedProduct)
        }

        return res.json(products)

    } catch (error) {
        console.log(error);
    }
});

productRouter.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const products = await ProductManager.getProductById(pid)
        if (!products){
            return res.send('Producto no encontrado')
        }
        res.json(products)
    } catch (error) {
        console.log(error);
        return res.send({error: error.message})
    }
});

productRouter.post('/', async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock } = req.body;
        const response = await ProductManager.addProduct({ title, description, price, thumbnail, code, stock })
        res.json(response)
    } catch (error) {
        console.log(error);
        return res.send({error:error.message})
    }
});

productRouter.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const { title, description, price, thumbnail, code, stock } = req.body;
        const response = await ProductManager.updateProduct(pid, { title, description, price, thumbnail, code, stock })
        res.json(response)
    } catch (error) {
        console.log(error);
    }
});

productRouter.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        await ProductManager.deleteProduct(pid)
    } catch (error) {
        console.log(error);
    }
});

export { productRouter }