import { Router } from "express";
import Carts from '../dao/dbManagers/carts.manager.js';
//import CartManager from "../managers/CartManager.js";

const cartRouter = Router ();
const cartsManager = new Carts();


cartRouter.get("/", async (req, res) =>{
    try {
        const carts = await cartsManager.readCarts();
        res.send({status: 'success', payload: carts});
    } catch (error) {
        res.status(500).send({status: 'error', message: error.message})
    }
    
})

cartRouter.post("/", async (req,res)=>{
    try {
        res.send(await cartsManager.writeCarts())
    } catch (error) {
        res.status(500).send({status: 'error', message: error.message})

    }

});

cartRouter.post("/:cid/products/:pid", async (req, res) =>{
    try {
        let cartId =req.params.cid
        let productId =req.params.pid
        res.send(await cartsManager.addProductInCart(cartId, productId))
    } catch (error) {
        res.status(500).send({status: 'error', message: error.message})

    }

});



cartRouter.put('/:id', async(req,res) =>{
    try {
        const [products] = req.body;
        const {id} = req.params;

        const result = await cartsManager.update(id, products)
        res.send({status: 'success', payload: result});
    } catch (error) {
        res.status(500).send({status: 'error', message: error.message})
    }
});

cartRouter.get("/:id", async (req, res) =>{
    let id = req.params.id  //ojo es un string 
    res.send(await carts.getCartsById(id))
 
 });



export default cartRouter;

