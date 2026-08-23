import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Category {
  _id: string;
  name: string;
  description: string;
  image: {
    url: string;
    public_id?: string;
  };
  parentCategory: {
    _id: string;
    name: string;
  } | null;
  isDeleted?: boolean;
}

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
  selectedCategory: string | null;
}

interface DeleteCategoryArgs {
  categoryId: string;
  reassignTo?: string;
}

interface DeleteCategoryRejectValue {
  message: string;
  productCount?: number;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
  selectedCategory: null,
};

export const fetchCategories = createAsyncThunk(
  "categories/fetch",
  async () => {
    const response = await axiosInstance.get("/api/categories");
    return response.data.categories as Category[];
  },
);

export const deleteCategory = createAsyncThunk<
  string,
  DeleteCategoryArgs,
  { rejectValue: DeleteCategoryRejectValue  }
>("categories/deleteCategory", async ({ categoryId, reassignTo }, thunkApi) => {
  try {
    await axiosInstance.delete(`api/categories/${categoryId}`, {
      withCredentials: true,
      data: reassignTo ? { reassignTo } : undefined,
    });
    return categoryId;
  } catch (err: any) {
    return thunkApi.rejectWithValue({
      message: err.response?.data?.message || "Failed to delete category",
      productCount: err.response?.data?.productCount,
    });
  }
});

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearCategories(state) {
      state.categories = [];
      state.error = null;
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
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
        state.error = action.error.message || "Failed to fetch categories";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (item) => item._id !== action.payload,
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => { });
  },
});

export const { clearCategories, setSelectedCategory } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
