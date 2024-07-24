import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: []
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { _id } = action.payload;
            const existingProductIndex = state.products.findIndex(product => product._id === _id);
            if (existingProductIndex !== -1) {
                state.products[existingProductIndex].amount += 1;
            } else {
                state.products.push({ ...action.payload, amount: 1 });
            }
        },
        clearCart: (state) => {
            state.products = [];
        },
        incrementProductAmount: (state, action) => {
            const { _id } = action.payload;
            const existingProduct = state.products.find(product => product._id === _id);
            if (existingProduct) {
                existingProduct.amount += 1;
            }
        },
        decrementProductAmount: (state, action) => {
            const { _id } = action.payload;
            const existingProductIndex = state.products.findIndex(product => product._id === _id);
            if (existingProductIndex !== -1) {
                state.products[existingProductIndex].amount -= 1;
                if (state.products[existingProductIndex].amount === 0) {
                    state.products.splice(existingProductIndex, 1); // Retirer l'article du panier si la quantité atteint zéro
                }
            }
        }
    }
});

export const cartProducts = state => state.cart.products;

export const { addToCart, clearCart, incrementProductAmount, decrementProductAmount } = cartSlice.actions;

export default cartSlice.reducer;
