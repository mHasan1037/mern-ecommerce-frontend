import { WishListState } from "@/types/wishlist";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: WishListState = {
    wishlist: [],
    loading: false,
    error: null,
}

export const fetchWishlist = createAsyncThunk(
    "wishlist/fetchWishlist",
    async (_, thunkApi) => {
      try{
        const res = await axiosInstance.get('/api/wishlist', { withCredentials: true })
        return res.data.wishlist;  
    }catch(error: any){
        return thunkApi.rejectWithValue(error.response.data.message)
      }  
    }
)

export const addToWishList = createAsyncThunk(
    "wishlist/addToWishlist",
    async (productId: string, thunkApi) => {
        try{
          const res = await axiosInstance.post(`/api/wishlist/${productId}`, {}, { withCredentials: true })
          return res.data.wishlist;
        }catch (error: any){
          return thunkApi.rejectWithValue(error.response.data.message)
        }
    }
)

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (productId: string, thunkApi) =>{
    try{
      const res = await axiosInstance.delete(`/api/wishlist/${productId}`, { withCredentials: true})
      return productId;
    }catch(error: any){
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
)

export const clearWishlist = createAsyncThunk(
  "wishlist/clearwishlist",
  async (_, thunkApi) =>{
    try{
       const res = await axiosInstance.delete('/api/wishlist', { withCredentials: true })
       return res.data.message;
    }catch(error: any){
       return thunkApi.rejectWithValue(error.response.data.message)
    }
  }
)

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
      resetWishlist(state){
        state.wishlist = [];
        state.loading = false;
        state.error = null;
      }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchWishlist.pending, (state) => {
            state.loading = true
          })
          .addCase(fetchWishlist.fulfilled, (state, action) =>{
            state.loading = false;
            state.wishlist = action.payload;
          })
          .addCase(fetchWishlist.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.payload as string;
          })
          .addCase(addToWishList.fulfilled, (state, action) => {
            state.wishlist = action.payload;
          })
          .addCase(removeFromWishlist.fulfilled, (state, action) =>{
            state.wishlist = state.wishlist.filter(item => item._id !== action.payload)
          })
          .addCase(clearWishlist.fulfilled, (state) =>{
            state.wishlist = []
          })
    }
})

export const { resetWishlist } = wishlistSlice.actions;
export const wishListReducer = wishlistSlice.reducer;