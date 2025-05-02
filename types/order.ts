export interface orderItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  image: string;
}
[];

export interface shippingInfo {
    fullName: string;
    address: string;
    city: string;
    postCode: string;
    country: string;
    phone: string
}

export interface OrderPayload {
    productId: string;
    quantity: number;
    totalAmount: number;
    shippingInfo: shippingInfo;
  }
  
export  interface OrderState {
    loading: boolean;
    success: boolean;
    error: string | null;
  }
