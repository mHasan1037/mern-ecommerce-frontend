import { ProductType } from "./product";

export interface CartItem {
    _id: string,
    product: ProductType;  
    quantity: number;
  }
  
  export interface CartState {
    cart: CartItem[];
    loading: boolean;
    error: string | null;
  }