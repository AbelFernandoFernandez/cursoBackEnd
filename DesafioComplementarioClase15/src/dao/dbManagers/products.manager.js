import { productsModel } from '../dbManagers/models/products.model.js';

export default class Products {

    constructor() {
        console.log('Trabajando productos con DB')
    }

    readProducts = async () => { //getAll
        const products = await productsModel.find().lean();
        return products;
    }

    writeProducts = async (product) => { //save        
        const result = await productsModel.create(product);
        return result;

    }

    getProductsById = async (id) => {
        console.log("el id q llega", id);
        let products = await this.readProducts();
        let productsById = products.find(prod => prod._id.toString() === id)
        if (!productsById) return "Producto No encontrado"
        return productsById;
    }

    deleteProduct = async (id) => {
        const result = await productsModel.deleteOne({ _id: id });
        return result;
    }


    updatedProducts = async (id, product) => {
        const result = await productsModel.updateOne({ _id: id }, product);
        return result;

    }



}

