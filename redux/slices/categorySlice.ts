import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Category{
    _id: string;
    name: string;
    description: string;
    image: {
        url: string;
        public_id?: string;
    };
    parentCategory: string | null;
    isDeleted?: boolean;
}

interface CategoryState {
    categories: Category[];
    loading: boolean;
    error: string | null;
    selectedCategory: string | null;
}

const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: null,
    selectedCategory: null,
}

export const fetchCategories = createAsyncThunk(
    "categories/fetch",
    async () => {
        const response = await axiosInstance.get('/api/categories');
        return response.data.categories as Category[];
    }
)

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        clearCategories(state){
            state.categories= [];
            state.error = null;
        },
        setSelectedCategory(state, action) {
            state.selectedCategory = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload;
          })
          .addCase(fetchCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch categories';
          })
    }
})

export const { clearCategories, setSelectedCategory } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;