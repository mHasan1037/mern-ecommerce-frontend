import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { categoryReducer } from "./slices/categorySlice";
import { productReducer } from "./slices/productSlice";
import { wishListReducer } from "./slices/wishListSlice";
import { cartReducer } from "./slices/cartSlice";
import { orderReducer } from "./slices/orderSlice";


export const store = configureStore({
    reducer: {
       auth: authReducer,
       categories: categoryReducer,
       products: productReducer,
       wishlist: wishListReducer,
       cart: cartReducer,
       order: orderReducer
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;