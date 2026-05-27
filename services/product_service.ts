import { RestfulController } from '../controllers/controller';
import { Product } from '../types/type';

export class ProductService {
  constructor(private productController: RestfulController) {}

  async getAllProducts(): Promise<Product[]> {
    const response = await this.productController.getAllProducts();
    const allProducts = await response.json();
    return allProducts.data;
  }

  async filterInStockProducts(products: Product[], inStock: boolean): Promise<Product[]> {
    const filteredProducts = products.filter((product: any) => product.in_stock === inStock);
    return filteredProducts;
  }

  async getRandomProduct(products: Product[]) {
    const randomIndex = Math.floor(Math.random() * products.length);
    const randomProduct = products[randomIndex];
    return randomProduct;
  }

  async getRandomProductIDs(products: Product[], productCount: number = 1) {
    let randomProductsIDs = [];
    for (let i = 0; i < productCount; i++) {
      const randomIndex = Math.floor(Math.random() * products.length);
      const randomProductsID = products[randomIndex].id;
      randomProductsIDs.push(randomProductsID);
    }
    return randomProductsIDs;
  }
}
