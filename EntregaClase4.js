const fs = require("fs");
const archivo = "productos.txt";

class Contenedor {
  constructor(title, price, thumbail) {
    this.title = title;
    this.price = price;
    this.thumbail = thumbail;
  }
  getAll = async () => {
    try {
      const readContent = await fs.promises.readFile(archivo, "utf-8");
      const products = JSON.parse(readContent);
      return products;
    } catch (error) {
      console.log("No se pudo leer el archivo: ", error);
    }
  };

  save = async (product) => {
    try {
      if (fs.existsSync(archivo)) {
        const content = await this.getAll();
        const lastId = content.length;
        let newProduct = {
          id: lastId + 1,
          ...product,
        };
        content.push(newProduct);
        await fs.promises.writeFile(archivo, JSON.stringify(content, null, 2));
        return lastId + 1;
      } else {
        const newProduct = {
          id: 1,
          ...product,
        };
        await fs.promises.writeFile(
          archivo,
          JSON.stringify([newProduct], null, 2)
        );
        return 1;
      }
    } catch (error) {
      console.log(error);
    }
  };
  getById = async (id) => {
    try {
      if (fs.existsSync(archivo)) {
        const content = await this.getAll();
        const product = content.find((item) => item.id === id);
        return product;
      }
    } catch (error) {
      console.log("No se pudo encontrar el producto:", error);
    }
  };
  deleteById = async (id) => {
    try {
      const content = await this.getAll();
      const newProducts = content.filter((item) => item.id !== id);
      await fs.promises.writeFile(
        archivo,
        JSON.stringify(newProducts, null, 2)
      );
    } catch (error) {
      console("No se ha podido eliminar el producto: ", error);
    }
  };
  deleteAll = async () => {
    try {
      await fs.promises.writeFile(archivo, JSON.stringify([]));
    } catch (error) {
      console.log("No se ha podido borrar todos los productos: ", error);
    }
  };
}
let contenedor = new Contenedor(archivo);
let product1 = new Contenedor("papas", 150, "https://asdasd.jpg");
let product2 = new Contenedor("cebolla", 330, "https://qweqwe.jpg");
let product3 = new Contenedor("tomate", 200, "https://zxczxc.jpg");

method = async () => {
  await contenedor.save(product1);
  await contenedor.save(product2);
  await contenedor.save(product3);

  const resultByID = await contenedor.getById(3);
  console.log("Resultado por Id", resultByID);
  //await contenedor.deleteById(2);
  //await contenedor.deleteAll();
};
method();
