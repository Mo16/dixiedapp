import { configureStore } from '@reduxjs/toolkit'
import orderDataReducer from "../features/orderData/orderDataSlice"
import changeNowDataReducer from "../features/changeNowData/changeNowDataSlice"
export const store = configureStore({
    reducer: {
        orderData: orderDataReducer,
        changeNowData: changeNowDataReducer,
    },
  })