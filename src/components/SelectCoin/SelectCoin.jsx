import React, { useState } from "react";
import { useSelector } from "react-redux";
import coindata from "../../data/coindata";
import NetworkCard from "../NetworkCard/NetworkCard";

const SelectCoin = ({ onSelectCoin, transferDirection }) => {
    let network;
    if (transferDirection === "FROM") {
        network = useSelector((state) => state.orderData.fromNetwork);
    } else if (transferDirection === "TO") {
        network = useSelector((state) => state.orderData.toNetwork);
    }

    const itemsPerPage = 9;
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredData = coindata
        .filter((coin) => coin.network === network)
        .filter((coin) =>
            coin.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

    const pageCount = Math.ceil(filteredData.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const handlePreviousPage = () => {
        setCurrentPage((currentPage) => Math.max(1, currentPage - 1));
    };

    const handleNextPage = () => {
        setCurrentPage((currentPage) => Math.min(pageCount, currentPage + 1));
    };

    const handleSelectCoin = (ticker) => {
        console.log(ticker);
        onSelectCoin(ticker);
    };

    return (
        <div>
            <div className="p-4">
                <input
                    type="text"
                    placeholder="Search coin"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 mb-4 rounded "


                />
            </div>
            <div className="grid grid-cols-3 gap-4 p-4">
                {currentItems.length > 0 ? (
                    currentItems.map((coin) => (
                        <div
                            key={coin.ticker}
                            onClick={() => handleSelectCoin(coin.ticker)}
                            className="cursor-pointer"
                        >
                            <NetworkCard
                                imageUrl={coin.image}
                                name={coin.name}
                            />
                        </div>
                    ))
                ) : (
                    <p>No coins found for the selected network.</p>
                )}
            </div>
            <div className="flex justify-center space-x-4 mt-4">
                {filteredData.length > itemsPerPage && (
                    <>
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Previous
                        </button>
                        <p className="text-white font-bold py-2">
                            {currentPage} /{" "}
                            {Math.ceil(filteredData.length / itemsPerPage)}
                        </p>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === pageCount}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Next
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default SelectCoin;
