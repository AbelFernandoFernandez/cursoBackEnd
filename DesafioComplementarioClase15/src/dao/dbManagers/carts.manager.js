import {cartsModel} from '../dbManagers/models/carts.model.js';
import Products from './products.manager.js';

const allProducts = new Products();

export default class Carts {
    constructor(){
        console.log("Trabajando los carritos con DB")
    }

    readCarts = async () =>{ //getAll
        const carts = await cartsModel.find().lean();
        return carts;

    }

    writeCarts = async (cart) => { //save
        console.log("que llego a write", cart);
        const result = await cartsModel.create({cart});
        return result; 

    }


    update = async (id, cart) =>{
        const result = await cartsModel.updateOne({_id: id}, cart);
        return result;
    }



    getCartsById = async (id)=>{
        try {

            let carts = await this.readCarts();
            let cartsById = carts.find(cart => cart.id === id)
            if(!cartsById) return "Carrito No encontrado"
            
            return cartsById;
        } catch (error) {
            console.log(error)
        }

 
    }

    addProductInCart = async (cartId, productId) =>{


            let carts = await this.readCarts();
            let cartsById = carts.find(cart => cart._id.toString() === cartId)

            if(!cartsById) return "Carrito No encontrado"
            let productsManag = await allProducts.readProducts();
            let productsById = productsManag.find(prod => prod._id.toString() === productId)
            if(!productsById) return "Producto No encontrado" 
    
            //Ya existe ? , le sumo uno a la cantidad.
            let cartFilter = carts.filter(cart=> cart._id.toString() != cartId) 
    
            if(cartsById.products.some(prod => prod._id.toString() ===productId)){
                console.log("entro aqui")
                let productCart = cartsById.products.find(prod => prod._id.toString() ===productId)
                productCart.quantity++
                let cart = [cartsById, ...cartFilter] //
                await cartsModel.updateOne({_id: cartId}, cartsById)
                //await cartsModel.create(concatCart);
                return "Cantidad del producto existente actualizado"
            }
    
            cartsById.products.push({_id:productsById._id, quantity:1})  
            
            let cart = [ cartsById, ...cartFilter]
            await cartsModel.updateOne({_id: cartId}, cartsById)
            //await cartsModel.create(concatCart);
            return "Producto agregado al carrito"

    }
}