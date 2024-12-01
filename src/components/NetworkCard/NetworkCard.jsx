import React from "react";

const NetworkCard = ({ imageUrl, name }) => {
    return (
        <div className="flex flex-col cursor-pointer items-center py-2 border border-gray-200 rounded-lg hover:bg-gray-100 text-white hover:text-black transition duration-100 ease-in-out">
            <img src={imageUrl} alt={name} className="w-16 p-0 rounded-full" />
            <p className="mt-2 text-center text-sm font-semibold">{name.toUpperCase()}</p>
        </div>
    );
};

export default NetworkCard;
