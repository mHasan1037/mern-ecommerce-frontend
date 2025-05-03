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

  export interface Order {
    _id: string;
    user: string;
    orderItems: orderItem[];
    shippingInfo: shippingInfo;
    totalAmount: number;
    paymentMethod: string;
    status: string;
  }
  
export  interface OrderState {
    loading: boolean;
    singleOrderLoading: boolean;
     cartOrderLoading: boolean;
    success: boolean;
    error: string | null;
    orders: Order[];
  }


  export interface CartOrderPayload {
    shippingInfo: shippingInfo;
    totalAmount: number;
  }