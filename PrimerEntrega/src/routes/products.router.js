import { Router } from "express";
import { productManager } from "../server.js";

const productRouter = Router();

productRouter.get('/', async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts()
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
        const products = await productManager.getProductById(pid)
        res.json(products)
    } catch (error) {
        console.log(error);
    }
});

productRouter.post('/', async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock } = req.body;
        const response = await productManager.addProduct({ title, description, price, thumbnail, code, stock })
        res.json(response)
    } catch (error) {
        console.log(error);
    }
});

productRouter.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const { title, description, price, thumbnail, code, stock } = req.body;
        const response = await productManager.updateProduct(pid, { title, description, price, thumbnail, code, stock })
        res.json(response)
    } catch (error) {
        console.log(error);
    }
});

productRouter.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        await productManager.deleteProduct(pid)
    } catch (error) {
        console.log(error);
    }
});

export { productRouter }