const express = require('express');
const fs = require('fs/promises');
const app = express();
const PORT = 8080;

app.get('/products', async (req, res) => {
  try {
    const data = await fs.readFile('products.json', 'utf-8');
    const productos = JSON.parse(data);

    const limit = parseInt(req.query.limit);

    const resultado = limit ? productos.slice(0, limit) : productos;

    res.json(resultado);
  } catch (error) {
    console.error('Error al leer el archivo de productos:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

app.get('/products/:pid', async (req, res) => {
  try {
    // Leer el archivo de productos
    const data = await fs.readFile('products.json', 'utf-8');
    const productos = JSON.parse(data);

    const productId = parseInt(req.params.pid);

    const productoEncontrado = productos.find((producto) => producto.id === productId);

    if (productoEncontrado) {
      res.json(productoEncontrado);
    } else {
      res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error al leer el archivo de productos:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
