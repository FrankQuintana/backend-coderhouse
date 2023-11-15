import express from 'express';
import handlebars from "express-handlebars";
import { Server } from "socket.io";

import productsRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';
import viewsRouter from './routes/views.js';
import __dirname from "./utils.js";
import ProductManager from './productManager.js';

const app = express();
const PORT = 3000;

const productManager = new ProductManager

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/public', express.static(__dirname+'/public'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const httpServer = app.listen(PORT, (err) => {
  if(err) console.log(err)
  console.log(`servidor http://localhost:${PORT} arriba`)
});

httpServer.on

const socketServer = new Server(httpServer);

let productos;

socketServer.on('connection', async socket => {
  console.log('nuevo cliente, conectado...!!')

  try {
    productos = await productManager.getProducts();
    socket.emit('mensajeServer', productos);
  } catch (error) {
    console.log(error)
  }

  socket.on('product', async data => {
    console.log('data: ', data);

    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      thumbnail,
      category
    } = data
    if (title == '' || description == '' || code == '' || price == '' || status == '' || stock == '' || thumbnail == '' || category == '') {
      res.send({aviso: 'Datos invalidos'});
    } else {
      try {
          await productManager.addProduct(title, description, code, price, status, stock, thumbnail, category);
          let datos = await productManager.getProducts();
          socketServer.emit('productoAgregado', datos);
      } catch (error) {
          res.status(500).json({error: 'Error de servidor'})
      }  
    }
  });

  socket.on('deleteProduct', async data => {
    try {
      await productManager.deleteProduct(data);
      let datos = await productManager.getProducts();
      socketServer.emit('productoEliminado', datos);
    } catch (error) {
      res.status(500).json({error: 'Error de servidor'})
    }
  })
})



// app.get("/", (req, res) => { 
//   res.setHeader("Content-Type", "text/plain");
//   res.status(200).send('Servidor online');
// });