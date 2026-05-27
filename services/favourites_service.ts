import { RestfulController } from '../controllers/controller';
import { FavouriteProduct } from '../types/type';

export class FavouritesService {
  constructor(private favouritesController: RestfulController) {}

  async getAllFavoritesProducts(): Promise<FavouriteProduct[]> {
    const response = await this.favouritesController.getAllFavoritesProducts();
    const allFavoritesProducts = await response.json();
    return allFavoritesProducts;
  }

  async cleanFavoritesList() {
    const allFavoritesProducts = await this.getAllFavoritesProducts();
    if (allFavoritesProducts.length > 0) {
      await Promise.all(allFavoritesProducts.map((el: FavouriteProduct) => this.favouritesController.deleteFavoriteProduct(el.id)));
    }
  }

  async addToFavoritesList(productID: string) {
    const requestPayload = {
      product_id: productID
    };
    await this.favouritesController.addProductToFavorites(requestPayload);
  }
}
