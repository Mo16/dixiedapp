import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fromNetwork: "",
    fromCurrency: "",
    toNetwork: "",
    toCurrency: "",
    fromAmount: null,
    address: "",
};


export const orderDataSlice = createSlice({
    name: 'orderData',
    initialState,
    reducers: {
        setOrderData: (state, action) => {
    
            return {
                ...state,
                ...action.payload
            };
        },
    },
});

export const { setOrderData } = orderDataSlice.actions;

export default orderDataSlice.reducer;
