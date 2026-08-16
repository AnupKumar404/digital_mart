import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { httpClient } from "../configs/HttpClient.js";

export const cartApi = createApi({
    reducerPath: "cartApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://dailyveggies4u.com',
    }),

    tagTypes: ["Cart", "Product"],

    endpoints: (builder) => ({
    getCartItems: builder.query({
        query: () => '/api/v1/cart/items',
        withCredentials: true,
        providesTags: ["Cart"],
    }),


    getProductById: builder.query({
        query: (productId) => `/api/v1/products/${productId}`,
        providesTags: ["Product"],
    }),

    updateCart: builder.mutation({

        query: (product) => ({
            url: `/api/v1/cart/items`,
            method: 'PUT',
            body: product,
        }),
        withCredentials: true,
        invalidatesTags: ["Cart"],
    }),

    addToCart: builder.mutation({
        query: (product) => ({
            url: `/api/v1/cart`,
            method: 'POST',
            body: product,
        }),
        withCredentials: true,
        invalidatesTags: ["Cart"],
    }),

    removeCartItem: builder.mutation({
        query: (productId) => ({
            url: `/api/v1/cart/items/${productId}`,
            method: 'DELETE',
        }),
        withCredentials: true,
        invalidatesTags: ["Cart"],
    }),

})
});


export const { useGetCartItemsQuery, useAddToCartMutation, useUpdateCartMutation, useRemoveCartItemMutation, useGetProductByIdQuery} = cartApi;
