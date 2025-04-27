import { ProductFilters, ProductResponse, ProductState } from "@/types/product";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: ProductState = {
  productsInfo: null,
  loading: false,
  error: null,
  singleProduct: null,
  singleLoading: false,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (filters: ProductFilters = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();

      if (filters.category) params.append("category", filters.category);
      if (filters.search) params.append("search", filters.search);
      if (filters.minPrice !== undefined)
        params.append("minPrice", filters.minPrice.toString());
      if (filters.maxPrice !== undefined)
        params.append("maxPrice", filters.maxPrice.toString());
      if (filters.sort) params.append("sort", filters.sort);
      if (filters.page !== undefined)
        params.append("page", filters.page.toString());
      if (filters.limit !== undefined)
        params.append("limit", filters.limit.toString());
      if (filters.is_featured !== undefined)
        params.append("is_featured", filters.is_featured.toString());

      const res = await axiosInstance.get(`/api/products?${params.toString()}`);
      return res.data as ProductResponse;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/api/products/${id}`);
      return res.data.product;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.productsInfo = null;
      state.loading = false;
      state.error = null;
      state.singleProduct = null;   
      state.singleLoading = false;
    },
    updateSingleProduct: (state, action) => {
      state.singleProduct = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.productsInfo = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.singleLoading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.singleLoading = false;
        state.singleProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.singleLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProducts, updateSingleProduct } = productSlice.actions;
export const productReducer = productSlice.reducer;

