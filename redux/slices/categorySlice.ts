import { Category, CreateCategoryArgs, DeleteCategoryArgs, DeleteCategoryRejectValue, initialState } from "@/types/category";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

export const saveCategory = createAsyncThunk<
  Category,
  CreateCategoryArgs,
  { rejectValue: string }
>("categories/saveCategory", async ({ formData, categoryId }, thunkApi) => {
  try {
    const payload = {
      ...formData,
      parentCategory: formData.parentCategory?._id ?? null,
      image: formData.image ?? undefined,
    };

    const response = categoryId
      ? await axiosInstance.put(`/api/categories/${categoryId}`, payload)
      : await axiosInstance.post(`/api/categories`, payload);

    return response.data.category as Category;
  } catch (err: any) {
    return thunkApi.rejectWithValue(
      err.response?.data?.message || "Failed to save category",
    );
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
      .addCase(deleteCategory.rejected, (state, action) => {})
      .addCase(saveCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(
          (c) => c._id === action.payload._id,
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        } else {
          state.categories.push(action.payload);
        }
      })
      .addCase(saveCategory.rejected, (state, action) => {
        state.error = action.payload || "Failed to save category";
      });
  },
});

export const { clearCategories, setSelectedCategory } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
