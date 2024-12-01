import React from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderDetailRow from "../OrderDetailRow/OrderDetailRow";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { setChangeNowData } from "../../features/changeNowData/changeNowDataSlice"; // Ensure you have this action

const OrderScreen = ({ id }) => {
    const dispatch = useDispatch();
    const changeNowData = useSelector((state) => state.changeNowData);
    const orderId = id || changeNowData.id;

    const fetchData = async () => {
        const url = `https://api.changenow.io/v2/exchange/by-id?id=${orderId}`;
        const response = await axios.get(url, {
            headers: {
                "x-changenow-api-key":
                    "ffdef7d61213cca007e5da70255e8f428e9fe20ca31f3cd99b748a0863c524d8",
                "Content-Type": "application/json",
            },
        });
        return response.data;
    };

    const { data: orderStatus, isSuccess } = useQuery({
        queryKey: ["orderStatus", orderId],
        queryFn: fetchData,
        enabled: !!orderId,
        refetchInterval: 1000,
    });

    React.useEffect(() => {
        if (isSuccess && id) {
            dispatch(setChangeNowData(orderStatus));
        }
    }, [isSuccess, orderStatus, id, dispatch]);

    const displayData = id && isSuccess ? orderStatus : changeNowData;
    console.log(displayData);

    const truncate = (word) => {
        if (word.length < 12) {
            return word;
        } else {
            return `${word.slice(0, 6)}...${word.slice(-5)}`;
        }
    };

    return (
        <div>
            <p className="text-white m-3">
                Please send{" "}
                <span className="font-bold">
                    {displayData.toAmount}{" "}
                    {displayData.fromCurrency.toUpperCase()}
                </span>{" "}
                to <span className="font-bold">{displayData.payinAddress}</span>
            </p>
            <p className="text-white font-medium">
                Your order details are below{" "}
            </p>

            <OrderDetailRow
                title={"Receiver Address"}
                data={truncate(displayData.payoutAddress)}
                address={displayData.payoutAddress}
            />
            <OrderDetailRow
                title={"From Network"}
                data={displayData.fromNetwork.toUpperCase()}
            />
            <OrderDetailRow
                title={"From Currency"}
                data={displayData.fromCurrency.toUpperCase()}
            />
            <OrderDetailRow
                title={"To Network"}
                data={displayData.toNetwork.toUpperCase()}
            />
            <OrderDetailRow
                title={"To Currency"}
                data={displayData.toCurrency.toUpperCase()}
            />

            {id ? (
                <OrderDetailRow
                    title={"Receiving Amount"}
                    data={displayData.expectedAmountTo}
                />
            ) : (
                <OrderDetailRow
                    title={"Receiving Amount"}
                    data={displayData.toAmount}
                />
            )}

            <h1 className="text-white">
                Status:{" "}
                <span className="font-bold">
                    {orderStatus?.status.toUpperCase() || "Loading..."}
                </span>
                <p>Order ID: {displayData.id}</p>
            </h1>
        </div>
    );
};

export default OrderScreen;
