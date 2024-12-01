import React, { useState } from "react";
import NetworkCard from "../NetworkCard/NetworkCard";
import cryptoPairs from "../../data/coindata";

const SelectNetwork = ({ onSelectNetwork }) => {
    const uniqueNetworks = Array.from(new Set(cryptoPairs.map((coin) => coin.network)));

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const networksPerPage = 9;

    const filteredNetworks = uniqueNetworks.filter((network) =>
        network.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const pageCount = Math.ceil(filteredNetworks.length / networksPerPage);
    const indexOfLastNetwork = currentPage * networksPerPage;
    const indexOfFirstNetwork = indexOfLastNetwork - networksPerPage;
    const currentNetworks = filteredNetworks.slice(indexOfFirstNetwork, indexOfLastNetwork);

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, pageCount));
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search networks"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2  rounded mt-4 mb-2" 
            />
            <div className="grid grid-cols-3 gap-3 p-4">
                {currentNetworks.length > 0 ? (
                    currentNetworks.map((network) => {
                        const { image } = cryptoPairs.find((coin) => coin.network === network);
                        return (
                            <div key={network} onClick={() => onSelectNetwork(network)}>
                                <NetworkCard name={network} imageUrl={image} />
                            </div>
                        );
                    })
                ) : (
                    <p>No networks found.</p>
                )}
            </div>
            {filteredNetworks.length > networksPerPage && (
                <div className="flex justify-center space-x-4 mt-4">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Previous
                    </button>
                    <p className="text-white font-bold py-2">
                        {currentPage} / {pageCount}
                    </p>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === pageCount}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default SelectNetwork;
