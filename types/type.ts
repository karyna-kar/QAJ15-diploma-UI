export interface CartItemRequest {
  product_id: string;
  quantity: number;
}

export interface Product {
  id: string;
  name: string;
  in_stock: boolean;
  price: number;
  description: string;
}

export interface FavouriteProduct {
  id: string;
  user_id: string;
  product_id: string;
  product: Product;
}

export interface FavouriteProductRequest {
  product_id: string;
}
