import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrderData } from "../../features/orderData/orderDataSlice";
import SelectNetwork from "../SelectNetwork/SelectNetwork";
import SelectCoin from "../SelectCoin/SelectCoin";
import InputScreen from "../InputScreen/InputScreen";
import ConfirmationScreen from "../ConfirmationScreen/ConfirmationScreen";
import OrderScreen from "../OrderScreen/OrderScreen";
import { motion, AnimatePresence, color } from "framer-motion";

const SCREENS = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
    SIX: 6,
    SEVEN: 7,
    EIGHT: 8,
    NINE: 9,
};

const Select = () => {
    const orderData = useSelector((state) => state.orderData);
    const [currentScreen, setCurrentScreen] = useState(SCREENS.ONE);
    const dispatch = useDispatch();
    const [value, setValue] = useState("");

    const navigateTo = (screen) => {
        setCurrentScreen(screen);
    };

    const screenVariants = {
        initial: { opacity: 0, x: 100 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -100 },
    };

    const handleSelectFromNetwork = (fromNetwork) => {
        dispatch(setOrderData({ fromNetwork }));
        if (orderData.fromAmount == null) {
            navigateTo(SCREENS.TWO);
        } else {
            navigateTo(SCREENS.SEVEN);
        }
    };

    const handleSelectToNetwork = (toNetwork) => {
        dispatch(setOrderData({ toNetwork }));
        if (orderData.fromAmount == null) {
            navigateTo(SCREENS.FOUR);
        } else {
            navigateTo(SCREENS.SEVEN);
        }
    };

    const handleSelectFromCoin = (fromCurrency) => {
        dispatch(setOrderData({ fromCurrency }));
        if (orderData.fromAmount == null) {
            navigateTo(SCREENS.THREE);
        } else {
            navigateTo(SCREENS.SEVEN);
        }
    };

    const handleSelectToCoin = (toCurrency) => {
        dispatch(setOrderData({ toCurrency }));
        if (orderData.fromAmount == null) {
            navigateTo(SCREENS.FIVE);
        } else {
            navigateTo(SCREENS.SEVEN);
        }
    };

    const handleAddress = (address) => {
        dispatch(setOrderData({ address }));
        if (orderData.fromAmount == null) {
            navigateTo(SCREENS.SIX);
        } else {
            navigateTo(SCREENS.SEVEN);
        }
    };

    const handleSendAmount = (fromAmount) => {
        dispatch(setOrderData({ fromAmount }));
        navigateTo(SCREENS.SEVEN);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigateTo(SCREENS.NINE);
    };

    const handleEdit = (screen) => {
        navigateTo(screen);
    };

    const screenTexts = {
        [SCREENS.ONE]: "Select the network to send from",
        [SCREENS.TWO]: "Select the coin you want to send",
        [SCREENS.THREE]: "Select the Network you want to receive",
        [SCREENS.FOUR]: "Select the coin you want to receive",
        [SCREENS.FIVE]: `Enter the ${
            orderData.toNetwork ? orderData.toNetwork.toUpperCase() : ""
        } wallet address to deposit to`,
        [SCREENS.SIX]: `Enter the amount of ${
            orderData.fromCurrency ? orderData.fromCurrency.toUpperCase() : ""
        } to send in ${
            orderData.fromNetwork ? orderData.fromNetwork.toUpperCase() : ""
        }`,
        [SCREENS.EIGHT]: "Transfer your payment",
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={currentScreen}
                variants={screenVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
            >
                <div className="text-center m-7 p-4 bg-blue-500 rounded-xl">
                    <h1 className="text-white text-4xl">
                        {screenTexts[currentScreen]}
                    </h1>

                    {currentScreen === SCREENS.ONE && (
                        <SelectNetwork
                            onSelectNetwork={handleSelectFromNetwork}
                        />
                    )}
                    {currentScreen === SCREENS.TWO && (
                        <SelectCoin
                            transferDirection={"FROM"}
                            onSelectCoin={handleSelectFromCoin}
                        />
                    )}
                    {currentScreen === SCREENS.THREE && (
                        <SelectNetwork
                            onSelectNetwork={handleSelectToNetwork}
                        />
                    )}
                    {currentScreen === SCREENS.FOUR && (
                        <SelectCoin
                            transferDirection={"TO"}
                            onSelectCoin={handleSelectToCoin}
                        />
                    )}
                    {currentScreen === SCREENS.FIVE && (
                        <InputScreen handleAddress={handleAddress} />
                    )}
                    {currentScreen === SCREENS.SIX && (
                        <InputScreen handleAddress={handleSendAmount} />
                    )}
                    {currentScreen === SCREENS.SEVEN && (
                        <ConfirmationScreen
                            handleEdit={handleEdit}
                            navigateTo={navigateTo}
                        />
                    )}
                    {currentScreen === SCREENS.EIGHT && <OrderScreen />}
                    {currentScreen === SCREENS.NINE && (
                        <OrderScreen id={value} />
                    )}

                    {currentScreen === SCREENS.ONE && (
                        <div className="text-center p-4 flex-col flex bg-blue-500 rounded-xl">
                            <button
                                onClick={handleSubmit}
                                className="mt-4 bg-darkblue w-full p-2 rounded-sm text-white font-bold hover:bg-blue-800 transition-all ease-in-out"
                            >
                                Check order status
                            </button>

                            <input
                                type="text"
                                placeholder="Order ID"
                                className="w-full p-2 mt-4 rounded-sm"
                                onChange={(e) => setValue(e.target.value)}
                            />
                        </div>
                    )}
                    Created by <a style={{color: "orange"}} href="https://mochoudhury.dev">Mo</a>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Select;
