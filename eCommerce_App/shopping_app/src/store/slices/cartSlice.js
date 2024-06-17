import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    wishList: [],
    items: [],
    filteredData: [],
    totalQuantity: 0,
    totalPrice: 0
}

const cartDataSlice = createSlice({
    name: 'cartData',
    initialState: initialState,
    reducers: {

        setProductData(state, action) {
            state.items = action.payload;
            state.filteredData = action.payload;
        },

        addToCart(state, action) {
            const index = state.cart.findIndex((item) => item.id === action.payload.id);
            if (index >= 0) {
                state.cart[index].quantity += 1;
            }
            else {
                state.cart.push(action.payload);
            }
        },

        removeFromCart(state, action) {
            state.cart = state.cart.filter(item => item.id !== action.payload);
        },

        setFinalAmount(state) {
            const { totalQuant, totalPrice } = state.cart.reduce((acc, item) => {
                const { totalQuant, totalPrice } = acc;
                const quantity = parseInt(item.quantity);
                const price = parseInt(item.price);

                return {
                    totalQuant: totalQuant + quantity,
                    totalPrice: totalPrice + (quantity * price)
                };
            }, { totalQuant: 0, totalPrice: 0 });

            state.totalQuantity = totalQuant;
            state.totalPrice = totalPrice;
        },

        increaseQuantity(state, action) {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload) {
                    return { ...item, quantity: item.quantity + 1 }
                }
                return item;
            })
        },

        decreaseQuantity(state, action) {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload) {
                    if (item.quantity === 1) {
                        return item;
                    }
                    return { ...item, quantity: item.quantity - 1 }
                }
                return item;
            });
        },

        addToWishList(state, action) {
            const index = state.wishList.findIndex((item) => item.id === action.payload.id);
            if (index >= 0) {
                alert("Item already exists");
            }
            else {
                state.wishList.push(action.payload);
            }
        },

        removeFromWishList(state, action) {
            state.wishList = state.wishList.filter(item => item.id !== action.payload);
        },

        setFilteredData(state, action) {
            const updatedData = state.items.filter(product =>
                product.title.toLowerCase().includes(action.payload.toLowerCase())
            );
            state.filteredData = updatedData;
        },

    }
})

export const { addToCart, removeFromCart, setFinalAmount, increaseQuantity, decreaseQuantity, setProductData, addToWishList, removeFromWishList, setFilteredData } = cartDataSlice.actions;

export default cartDataSlice;

