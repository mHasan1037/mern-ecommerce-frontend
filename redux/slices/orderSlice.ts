import { CartOrderPayload, OrderPayload, OrderState } from "@/types/order";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: OrderState = {
    loading: false,
    singleOrderLoading: false,
    cartOrderLoading: false,
    success: false,
    error: null,
    orders: [],
    currentOrder: null
}

export const postSingleOrder = createAsyncThunk(
    "order/singleOrder",
    async (orderData: OrderPayload, { rejectWithValue }) =>{
        try{
           const res = await axiosInstance.post("/api/orders/direct", orderData);
           return res.data;
        }catch(err: any){
           return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
)

export const postCartOrders = createAsyncThunk(
    "order/cartOrders",
    async (orderData: CartOrderPayload, { rejectWithValue }) =>{
        try{
           const res = await axiosInstance.post("/api/orders", orderData);
           return res.data;
        }catch(err: any){
           return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
)

export const getCurrentUserOrders = createAsyncThunk(
    "order/currentUserOrder",
    async (_, {rejectWithValue}) =>{
        try{
           const res = await axiosInstance.get('/api/orders');
           return res.data.orders;
        }catch(err: any){
           return rejectWithValue(err.response?.data?.message || err.message)
        }
    }
)

export const getOrderById = createAsyncThunk(
    "order/orderById",
    async (orderId: string, { rejectWithValue }) =>{
        try{
           const res = await axiosInstance.get(`/api/orders/${orderId}`);
           return res.data.order
        }catch(err: any){
           return rejectWithValue(err.response?.data?.message || err.message)
        }
    }
)

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        resetOrderState: (state) =>{
            state.loading = false;
            state.singleOrderLoading = false;
            state.cartOrderLoading = false;
            state.success = false;
            state.error = null;
        }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(postSingleOrder.pending, (state) =>{
            state.singleOrderLoading = true;
            state.success = false;
            state.error = null;
        })
        .addCase(postSingleOrder.fulfilled, (state) =>{
            state.singleOrderLoading = false;
            state.success = true;
            state.error = null;
        })
        .addCase(postSingleOrder.rejected, (state, action) =>{
            state.singleOrderLoading = false;
            state.success = false;
            state.error = action.payload as string;
        })
        .addCase(postCartOrders.pending, (state) =>{
            state.cartOrderLoading = true;
            state.success = false;
            state.error = null;
        })
        .addCase(postCartOrders.fulfilled, (state, action) =>{
            state.cartOrderLoading = false;
            state.success = true;
            state.error = null;
        })
        .addCase(postCartOrders.rejected, (state, action) =>{
            state.cartOrderLoading = false;
            state.success = false;
            state.error = action.payload as string;
        })
        .addCase(getCurrentUserOrders.pending, (state) =>{
            state.success = false;
            state.error = null;
        })
        .addCase(getCurrentUserOrders.fulfilled, (state, action) =>{
            state.loading = false;
            state.success = true;
            state.orders = action.payload
        })
        .addCase(getCurrentUserOrders.rejected, (state, action) =>{
            state.loading = false;
            state.success = false;
            state.error = action.payload as string;
        })
        .addCase(getOrderById.fulfilled, (state, action) =>{
            state.loading = false;
            state.success = true;
            state.currentOrder = action.payload
        })
    }
});

export const { resetOrderState } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;