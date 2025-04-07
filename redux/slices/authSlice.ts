import axiosInstance from "@/utils/axiosInstance";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface User{
    id: string;
    email: string;
    name: string;
    isVerified: boolean;
    isAdmin: boolean;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
}

export const loadUser = createAsyncThunk(
    "auth/loadUser",
    async (_, thunkAPI) =>{
        try{
           const res = await axiosInstance.get('/api/user/me', {
            withCredentials: true
           });
           return {
            user: res.data.user,
            isAuthenticated: res.data.is_auth
           }
        }catch (error){
            return thunkAPI.rejectWithValue("Not authenticated");
        }
    }
)


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<AuthState>){
            return {...state, ...action.payload}
        },
        logout(state){
            return initialState;
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(loadUser.fulfilled, (state, action)=>{
            state.user = action.payload.user;
            state.isAuthenticated = action.payload.isAuthenticated;
        });
        builder.addCase(loadUser.rejected, (state) =>{
            state.user = null;
            state.isAuthenticated = false;
        })
    }
});

export const { loginSuccess, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;