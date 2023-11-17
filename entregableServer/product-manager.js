const fs = require('fs');

class ProductManager {
  constructor() {
    this.products = [];
    this.productsFile = 'products.json';
  }

  async getProducts() {
    try {
      const data = await fs.promises.readFile(this.productsFile, 'utf-8');
      this.products = JSON.parse(data);
    } catch (error) {
      this.products = [];
    }
    return this.products;
  }

  async addProduct(product) {
    await this.getProducts();
    const productId = this.generateUniqueId();
    const newProduct = { id: productId, ...product };
    this.products.push(newProduct);
    await fs.promises.writeFile(this.productsFile, JSON.stringify(this.products));
    return newProduct;
  }

  async getProductById(id) {
    await this.getProducts();
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    return product;
  }

  async updateProduct(id, updatedFields) {
    await this.getProducts();
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      throw new Error('Producto no encontrado');
    }
    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updatedFields,
    };
    await fs.promises.writeFile(this.productsFile, JSON.stringify(this.products, null, 2));
    return this.products[productIndex];
  }

  async deleteProduct(id) {
    await this.getProducts();
    const initialLength = this.products.length;
    this.products = this.products.filter((product) => product.id !== id);
    if (this.products.length === initialLength) {
      throw new Error('Producto no encontrado');
    }
    await fs.promises.writeFile(this.productsFile, JSON.stringify(this.products, null, 2));
  }

  generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
}

// Crear instancia de ProductManager
const productManager = new ProductManager();

// Obtener productos (debe devolver un arreglo vacío [])
productManager.getProducts().then((products) => console.log(products));

// Agregar un producto
const newProduct = {
  title: 'producto prueba',
  description: 'Este es un producto prueba',
  price: 200,
  thumbnail: 'https://firebasestorage.googleapis.com/v0/b/baseaff-8d2a8.appspot.com/o/buda.jpg?alt=media&token=c97c7757-9dcd-426b-bf40-a185835502e2',
  code: 'abc123',
  stock: 25,
};

productManager
  .addProduct(newProduct)
  .then((addedProduct) => {
    console.log('Producto agregado:', addedProduct);
    return productManager.getProducts();
  })
  .then((products) => {
    console.log('Productos:', products);
    return productManager.getProductById(products[0].id);
  })
  .then((productById) => {
    console.log('Producto por ID:', productById);
    return productManager.updateProduct(productById.id, { price: 250 });
  })
  .then((updatedProduct) => {
    console.log('Producto actualizado:', updatedProduct);
    return productManager.deleteProduct(updatedProduct.id);
  })
  .then(() => console.log('Producto eliminado exitosamente'))
  .catch((error) => console.error(error));


