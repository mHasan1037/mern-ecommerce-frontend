export interface wishlist {
    name: string;
    price: number;
    _id: string;
    stock: number;
    images: {
      altText: string;
      public_id: string;
      url: string;
      _id: string;
    }[];
  }
  
export  interface WishListState {
      wishlist: wishlist[];
      loading: boolean;
      error: string | null;
  }