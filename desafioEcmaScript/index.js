// *  Creando clase con ES avanzado
class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if(!title || !description || !price || !thumbnail || !code || !stock) {
      return console.log(`Es obligatorio completar todos los campos`);
    }

    const product = {
      id: this.#generateId(),
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    }

    const productExists = this.products.find((p) => p.code === product.code);
        if (productExists) {
          return console.log("¡¡ERROR codigo repetido!!");
        } else {
          this.products.push(product);
        }
  }

  #generateId() {
    const id =
      this.products.length === 0
        ? 1
        : this.products[this.products.length - 1].id + 1;
    return id;
  }

  getProducts() {
    const allProducts = [...this.products];
    return allProducts;
  }

  getProductsById(id) {
    const productID = this.products.find((p) => p.id === id);

    if (productID) {
      return productID;
    } else {
      return "Not found";
    }
  }
}

// creacion de instancia de clase 
const productManager = new ProductManager();

console.log(productManager.getProducts());

productManager.addProduct(
  "Producto de prueba",
  "Este es un producto de prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

console.log(productManager.getProducts());

productManager.addProduct(
  "Producto de prueba",
  "Este es un producto de prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

console.log(productManager.getProductsById(1));
console.log(productManager.getProductsById(2));
