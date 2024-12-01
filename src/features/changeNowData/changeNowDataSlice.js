import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fromAmount: null,
    fromCurrency: "",
    fromNetwork: "",
    id: "",
    payinAddress: "",
    payoutAddress: "",
    toAmount: null,
    toCurrency: "",
    toNetwork: "",
};

export const changeNowDataSlice = createSlice({
    name: "changeNowDataSlice",
    initialState,
    reducers: {
        setChangeNowData: (state, action) => {
            return {
                ...state,
                ...action.payload,
            };
        },
    },
});

export const { setChangeNowData } = changeNowDataSlice.actions;

export default changeNowDataSlice.reducer;
