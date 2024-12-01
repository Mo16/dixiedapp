import React from 'react';
import { AiFillCopy } from 'react-icons/ai';

const CopyComponent = ({ title, data, address }) => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(address).then(() => {
            console.log('Data copied to clipboard');
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
    };

    return (
        <div className="flex align-middle text-center items-center justify-between text-white text-lg m-3 ">
            <p className="flex-1 text-left">{title.toUpperCase()}</p>
            <p className="font-semibold flex-1 text-right">{data}</p>

            <button onClick={copyToClipboard} className="flex-grow-0 self-center m-3 p-1 text-white rounded-md text-sm bg-slate-400 font-bold hover:bg-blue-800 transition-all ease-in-out">
                <AiFillCopy />
            </button>
        </div>
    );
};

export default CopyComponent;
