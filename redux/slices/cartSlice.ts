import { CartState } from "@/types/cart";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AddToCartArgs {
  productId: string;
  quantity: number;
}

const initialState: CartState = {
   cart: [],
   loading: false,
   error: null
}

export const addToCart = createAsyncThunk(
  "cart/addtocart",
  async ({ productId, quantity }: AddToCartArgs, thunkApi) => {
    try {
      const res = await axiosInstance.post(
        "/api/cart",
        { productId, quantity },
        { withCredentials: true }
      );
      return res.data.cart;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Add to cart failed"
      );
    }
  }
);


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        resetCart(state) {
            state.cart = [];
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) =>{
        builder
          .addCase(addToCart.pending, (state) =>{
            state.loading = true;
            state.error = null;
          })
          .addCase(addToCart.fulfilled, (state, action) =>{
            state.loading = false;
            state.cart = action.payload;
          })
          .addCase(addToCart.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.payload as string;
          })
    }
});


export const { resetCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;