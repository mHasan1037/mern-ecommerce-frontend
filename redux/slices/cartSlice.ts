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

export const fetchCartList = createAsyncThunk(
    "cart/fetchCartList",
    async(_, thunkApi) =>{
        try{
           const res = await axiosInstance.get("/api/cart", {
            withCredentials: true,
           });
           return res.data.cart;
        }catch(error: any){
           return thunkApi.rejectWithValue(
            error.response?.data?.message || "Failed to fetch cart"
           )
        }
    }
)

export const deleteCart = createAsyncThunk(
  "cart/deleteCart",
  async(id: string, thunkApi) =>{
    try{
      await axiosInstance.delete(`/api/cart/${id}`, {withCredentials: true});
      return id;
    }catch(error: any){
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to delete cart"
      )
    }
  }
)

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async(_, thunkApi) =>{
    try{
      const res = await axiosInstance.delete("/api/cart", { withCredentials: true });
      return res.data.cart;
    }catch(err: any){
      return thunkApi.rejectWithValue(
        err.response?.data?.message || "Failed to delete cart"
      )
    }
  }
)

export const updateCartQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ productId, quantity }: AddToCartArgs, thunkApi) => {
    try {
      const res = await axiosInstance.put(
        `/api/cart/${productId}`,
        { quantity },
        { withCredentials: true }
      );
      return res.data.cart;
    } catch (err: any) {
      return thunkApi.rejectWithValue(
        err.response?.data?.message || "Failed to update cart quantity"
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
          .addCase(fetchCartList.pending, (state) =>{
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchCartList.fulfilled, (state, action) =>{
            state.loading = false;
            state.cart = action.payload.filter((item: any) => item.product !== null);
          })
          .addCase(fetchCartList.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.payload as string;
          })
          .addCase(deleteCart.pending, (state) =>{
            state.loading = true;
            state.error = null;
          })
          .addCase(deleteCart.fulfilled, (state, action) =>{
            state.loading = false;
            state.cart = state.cart.filter(item => item.product && item.product?._id !== action.payload);
          })
          .addCase(deleteCart.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.payload as string;
          })
          .addCase(clearCart.pending, (state) =>{
            state.loading = true;
            state.error = null;
          })
          .addCase(clearCart.fulfilled, (state, action) =>{
            state.loading = false;
            state.cart = action.payload.cart;
          })
          .addCase(clearCart.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.payload as string;
          })
          .addCase(updateCartQuantity.pending, (state) =>{
            state.loading = true;
            state.error = null;
          })
          .addCase(updateCartQuantity.fulfilled, (state, action) =>{
            state.loading = false;
            state.cart = action.payload;
          })
          .addCase(updateCartQuantity.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.payload as string;
          })
    }
});


export const { resetCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;