import axiosInstance from "@/utils/axiosInstance";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface ProductSummary {
  _id: string;
  name: string;
}

interface RecentOrder {
  id: string;
  status: string;
  placedAt: string;
  orderItems: ProductSummary[];
}

interface User {
  id: string;
  email: string;
  name: string;
  isVerified: boolean;
  isAdmin: boolean;
  recentOrder?: RecentOrder;
  totalCancelledOrders?: number;
  totalDeliveredOrders?: number;
  totalSpent?: string;
}

interface AuthState {
  user: User | null;
  adminViewedUser: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading?: boolean;
  passwordChangeStatus?: "idle" | "loading" | "succeeded" | "failed";
  passwordChangeError?: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  passwordChangeStatus: "idle",
  passwordChangeError: null,
  adminViewedUser: null,
  loading: false
};

export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/api/user/me", {
        withCredentials: true,
      });
      return {
        user: res.data.user,
        isAuthenticated: res.data.is_auth,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue("Not authenticated");
    }
  }
);

export const getUserById = createAsyncThunk(
    "auth/userById",
    async (id: string, thunkAPI) =>{
        try{
           const res = await axiosInstance.get(`/api/user/${id}/profile`, {
            withCredentials: true
           });
           return res.data.user
        }catch(error){
            return thunkAPI.rejectWithValue("Not authenticated");
        }
    }
)

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (
    formData: { password: string; password_confirmation: string },
    thunkAPI
  ) => {
    try {
      const res = await axiosInstance.post(
        "/api/user/change-password",
        formData,
        {
          withCredentials: true,
        }
      );
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Password change failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<Partial<AuthState>>) {
      state.user = action.payload.user ?? null;
      state.accessToken = action.payload.accessToken ?? null;
      state.refreshToken = action.payload.refreshToken ?? null;
      state.isAuthenticated = !!action.payload.user;
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.adminViewedUser = null;
      state.passwordChangeStatus = "idle";
      state.passwordChangeError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUser.pending, (state) =>{
      state.loading = true;
    })
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.loading = false;
    });
    builder.addCase(loadUser.rejected, (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.passwordChangeStatus = "succeeded";
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.passwordChangeStatus = "failed";
      state.passwordChangeError = action.payload as string;
    });
    builder.addCase(getUserById.pending, (state) =>{
      state.loading = true;
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.loading = false;
      state.adminViewedUser = action.payload;
    });
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
