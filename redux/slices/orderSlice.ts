import { OrderPayload, OrderState } from "@/types/order";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: OrderState = {
    loading: false,
    success: false,
    error: null,
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

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        resetOrderState: (state) =>{
            state.loading = false;
            state.success = false;
            state.error = null;
        }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(postSingleOrder.pending, (state) =>{
            state.loading = true;
            state.success = false;
            state.error = null;
        })
        .addCase(postSingleOrder.fulfilled, (state) =>{
            state.loading = false;
            state.success = true;
        })
        .addCase(postSingleOrder.rejected, (state, action) =>{
            state.loading = false;
            state.success = false;
            state.error = action.payload as string;
        })
    }
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;