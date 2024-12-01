import React, { useState } from "react";
import logo from "./logo.png";
import Select from "../../components/Select/Select";
const Homepage = () => {
    const [value, setValue] = useState("");

    return (
        <div className="flex bg-blue-300 justify-center items-center flex-col md:flex-row  ">
            <div className="lg:w-1/2 justify-center md:mt-6 ">
                <h1 className="text-center love-ya-like-a-sister text-darkblue mb-2 lg:text-9xl text-5xl">
                    Dixie Bridge
                </h1>
                <img className="w-2/6 m-auto" src={logo} alt="" />
            </div>
            <div className="lg:w-1/2 text-center">
                <div className="flex-1 m-auto text-cente ">
                    <Select />
                </div>
  
            </div>
        </div>
    );
};

export default Homepage;
