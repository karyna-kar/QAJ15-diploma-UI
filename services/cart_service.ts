import { RestfulController } from '../controllers/controller';

export class CartService {
  constructor(private cartController: RestfulController) {}

  async fillCartWithProducts(cartId: string, productIds: string[]) {
    for (const productId of productIds) {
      await this.cartController.addProductToCart(cartId, {
        product_id: productId,
        quantity: 1
      });
    }
  }
}
