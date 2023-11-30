import { Router } from "express";
import { productManager } from "../server.js";

const socketViewsRouter = Router();

const viewsRouter = (io) => {
  socketViewsRouter.get("/", async (req, res) => {
    res.render("home", await productManager.getProducts());
  });

  socketViewsRouter.get("/realtimeproducts", async (req, res) => {
    res.render("realTimeProducts", {});
    let products = await productManager.getProducts();

    io.on("connection", (socket) => {
      io.emit("dataUpdated", products);
      console.log("Cliente conectado");
      socket.on("updateProductList", async (message) => {
        products = await productManager.getProducts();
        io.emit("dataUpdated", products);
      });
    });
  });

  return socketViewsRouter;
};

export default viewsRouter;
