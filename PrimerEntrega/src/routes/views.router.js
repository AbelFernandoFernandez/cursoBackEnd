import { Router } from "express";
import ProductManager from "../managers/productManager.js";

const ProductMan = new ProductManager('src/data/products.json');
const socketViewsRouter = Router();

const viewsRouter = (io) => {
  socketViewsRouter.get("/", async (req, res) => {
    res.render("home", await ProductMan.getProducts());
  });

  socketViewsRouter.get("/realtimeproducts", async (req, res) => {
    res.render("realTimeProducts", {});
    let products = await ProductMan.getProducts();

    io.on("connection", (socket) => {
      io.emit("dataUpdated", products);
      console.log("Cliente conectado");
      socket.on("updateProductList", async (message) => {
        products = await ProductMan.getProducts();
        io.emit("dataUpdated", products);
      });
    });
  });

  return socketViewsRouter;
};

export default viewsRouter;
