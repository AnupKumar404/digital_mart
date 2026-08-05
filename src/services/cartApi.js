import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { httpClient } from "../configs/httpClient.js";

export const cartApi = createApi({
    reducerPath: "cartApi",
    baseQuery: fetchBaseQuery({
        baseUrl: httpClient.baseURL,
    }),

    tagTypes: ["Cart"],

    endpoints: (builder) => ({
    getCartItems: builder.query({
        query: () => '/api/v1/cart/items',
        providesTags: ["Cart"],
    }),

    updateCart: builder.mutation({

        query: (product) => ({
            url: `/api/v1/cart/items`,
            method: 'PUT',
            body: product,
        }),
        invalidatesTags: ["Cart"],
    }),

    addToCart: builder.mutation({
        query: (product) => ({
            url: `/api/v1/cart`,
            method: 'POST',
            body: product,
        }),
        invalidatesTags: ["Cart"],
    }),

    removeCartItem: builder.mutation({
        query: (productId) => ({
            url: `/api/v1/cart/items/${productId}`,
            method: 'DELETE',
        }),
        invalidatesTags: ["Cart"],
    }),

})
});


export const { useGetCartItemsQuery, useAddToCartMutation, useUpdateCartMutation, useRemoveCartItemMutation } = cartApi;
