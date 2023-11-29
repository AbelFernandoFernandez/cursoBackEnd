import express from "express";
import __dirname from './utils.js'
// import  ProductManager  from "./managers/productManager.js";
// import  CartManager  from "./managers/cartManager.js"
import { cartsRouter } from "./routes/carts.router.js";
import { productRouter } from "./routes/products.router.js"
import { Server } from "socket.io";
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.router.js'
import path from 'path'

const PORT = 8080;
const app = express();
const httpServer=app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Escuchando en el puerto ${PORT}`);
});

// const productManager = new ProductManager;
// const cartManager = new CartManager;
const socketServer = new Server(httpServer)



app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '\\views')
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/products', productRouter)
app.use('/api/carts', cartsRouter)
app.use('/', viewsRouter(socketServer))


