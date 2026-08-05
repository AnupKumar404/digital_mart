import { configureStore } from "@reduxjs/toolkit";
import cart from './CartSlice'
import { cartApi } from "../services/cartApi";

export const store = configureStore({
    reducer: {
        cart,
        [cartApi.reducerPath]: cartApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cartApi.middleware),
})

export default store;