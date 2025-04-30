export interface CartItem {
    product: string;  
    quantity: number;
  }
  
  export interface CartState {
    cart: CartItem[];
    loading: boolean;
    error: string | null;
  }