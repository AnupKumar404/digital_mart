import {createSlice} from '@reduxjs/toolkit'
import { act } from 'react'
import { httpClient } from '../configs/HttpClient'

const CartSlice = createSlice({
    name: 'cart',
    initialState: [],

    reducers: {

        add(state, action){
            state.push(action.payload)
        },

        remove(state, action){
            return state.filter((item) => item.id !== action.payload)
        },

        update(state, action){
            const {productId, newQuantity} = action.payload;
            const itemIndex = state.findIndex((item) => item.id === productId);
            if (itemIndex !== -1) {
                state[itemIndex].quantity = newQuantity;
            }
        }
    }
})

export const {add, remove, update} = CartSlice.actions;
export default CartSlice.reducer;