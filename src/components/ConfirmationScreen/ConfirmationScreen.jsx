import React from "react";
import { useSelector, useDispatch } from "react-redux";
import OrderDetail from "../OrderDetail/OrderDetail";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { setOrderData } from "../../features/orderData/orderDataSlice";
import { setChangeNowData } from "../../features/changeNowData/changeNowDataSlice";

const SCREENS = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
    SIX: 6,
    SEVEN: 7,
    EIGHT: 8, // New screen
};

const ConfirmationScreen = ({ handleEdit, navigateTo }) => {
    const orderData = useSelector((state) => state.orderData);
    const dispatch = useDispatch(); // Hook for dispatching actions

    const createOrder = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "x-changenow-api-key":
                    "ffdef7d61213cca007e5da70255e8f428e9fe20ca31f3cd99b748a0863c524d8",
            },
        };

        const data = {
            fromCurrency: orderData.fromCurrency,
            toCurrency: orderData.toCurrency,
            fromNetwork: orderData.fromNetwork,
            toNetwork: orderData.toNetwork,
            fromAmount: orderData.fromAmount,
            toAmount: orderData.toAmount,
            address: orderData.address,
        };

        try {
            const response = await axios.post(
                "https://api.changenow.io/v2/exchange",
                data,
                config
            );
            return response.data;
        } catch (error) {
            console.error("Error during API call:", error);
            throw error;
        }
    };

    const mutation = useMutation({
        mutationFn: createOrder,
        onSuccess: (data) => {
            dispatch(
                setChangeNowData({
                    fromAmount: data.fromAmount,
                    fromCurrency: data.fromCurrency,
                    fromNetwork: data.fromNetwork,
                    id: data.id,
                    payinAddress: data.payinAddress,
                    payoutAddress: data.payoutAddress,
                    toAmount: data.toAmount,
                    toCurrency: data.toCurrency,
                    toNetwork: data.toNetwork,
                })
            ); // Save order ID or other relevant data
            navigateTo(SCREENS.EIGHT); // Navigate to screen 8 on success
        },
    });

    const handlePost = () => {
        mutation.mutate();
    };

    function truncate(word) {
        if (word.length < 12) {
            return word;
        } else {
            return `${word.slice(0, 6)}...${word.slice(-5)}`;
        }
    }

    return (
        <div>
            <h1 className="text-3xl mb-2 text-white">Confirm your order</h1>
            <OrderDetail
                editValue={handleEdit}
                screen={SCREENS.FIVE}
                title={"Receiver Address"}
                data={truncate(orderData.address)}
            />
            <OrderDetail
                editValue={handleEdit}
                screen={SCREENS.ONE}
                title={"From Network"}
                data={orderData.fromNetwork.toUpperCase()}
            />
            <OrderDetail
                editValue={handleEdit}
                screen={SCREENS.TWO}
                title={"From Currency"}
                data={orderData.fromCurrency.toUpperCase()}
            />
            <OrderDetail
                editValue={handleEdit}
                screen={SCREENS.THREE}
                title={"To Network"}
                data={orderData.toNetwork.toUpperCase()}
            />
            <OrderDetail
                editValue={handleEdit}
                screen={SCREENS.FOUR}
                title={"To Currency"}
                data={orderData.toCurrency.toUpperCase()}
            />
            <OrderDetail
                editValue={handleEdit}
                screen={SCREENS.SIX}
                title={"Sending Amount (Excl. Fees)"}
                data={orderData.fromAmount}
            />
            <button
                onClick={handlePost}
                className="mt-4 bg-slate-400 w-full p-2 rounded-sm text-white font-bold hover:bg-blue-800 transition-all ease-in-out "
            >
                {mutation.isLoading ? "Processing..." : "Create Order"}
            </button>
            {mutation.isError && (
                <p>Error: {mutation.error.response.data.message}</p>
            )}
            {mutation.isSuccess && <p>Order Created Successfully!</p>}
        </div>
    );
};

export default ConfirmationScreen;
