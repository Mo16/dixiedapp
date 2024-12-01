import React from "react";

const OrderDetail = ({ title, data, screen, editValue }) => {
    return (
        <div className="flex align-middle text-center items-center justify-between text-white text-lg m-3 ">
            <p className="flex-1 text-left">{title.toUpperCase()}</p>
            <p className="font-semibold flex-1 text-right">{data}</p>

            <button
                onClick={() => editValue(screen)}
                className="flex-grow-0 self-center m-3 px-1 rounded-md text-sm bg-slate-400  text-white font-bold hover:bg-blue-800 transition-all ease-in-out"
            >
                Edit
            </button>
        </div>
    );
};

export default OrderDetail;
