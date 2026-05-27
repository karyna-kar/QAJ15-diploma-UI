import { APIRequestContext } from '@playwright/test';
import { CartItemRequest, FavouriteProductRequest } from '../types/type';
import { AuthHelper } from '../helpers/authHelper';

export class RestfulController {
  private request: APIRequestContext;
  private baseUrl: string;
  private token?: string;

  constructor(request: APIRequestContext, baseUrl: string) {
    this.request = request;
    this.baseUrl = baseUrl;
    this.token = AuthHelper.readExistingToken();
  }

  async addProductToCart(cartId: string, cartPayload: CartItemRequest | {}) {
    return this.request.post(`${this.baseUrl}/${cartId}`, {
      data: cartPayload,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${this.token}` }
    });
  }

  async getAllProducts() {
    return this.request.get(this.baseUrl + '/products');
  }

  async getAllFavoritesProducts() {
    return this.request.get(this.baseUrl + '/favorites', {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  async deleteFavoriteProduct(favouriteProductID: string) {
    return this.request.delete(this.baseUrl + '/favorites/' + favouriteProductID, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  async addProductToFavorites(favoritePayload: FavouriteProductRequest) {
    return this.request.post(this.baseUrl + '/favorites', {
      data: favoritePayload,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${this.token}` }
    });
  }
}
