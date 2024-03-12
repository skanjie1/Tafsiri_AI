import React from "react";
import HomeImg from "../assets/images/HomeImg.png";

const Home = () => {
    return (
        <div className="container mx-auto bg-white">
            <div className="grid md:grid-cols-2 gap-4">
                <div className="mt-[5rem]">
                    <img className="md:h-[640px] w-[500px] sm:h-full" alt="People" src={HomeImg}/>
                </div>

                <div className="md:mt-[5rem] sm:mt-[2rem]">
                    <p className="font-poppins font-normal text-black text-[53px]">
                        Welcome to TafsiriAI!
                        Your #1 AI KSL translator
                        app!
                    </p>

                    <p className="font-poppins font-normal text-[20px] text-[#21383E] md:mt-10 sm:mt-3">
                        To begin, tell us where you come from:
                    </p>


                    <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown"
                            className="mt-8 text-[#6D6D6D] bg-[#EDEDED] font-poppins font-normal rounded-full text-[20px] px-14 py-2.5 text-center inline-flex items-center border-2 border-[#9D9D9D]"
                            type="button">Nairobi
                        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                        </svg>
                    </button>


                    {/* <div id="dropdown"*/}
                    {/*     className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">*/}
                    {/*    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200"*/}
                    {/*        aria-labelledby="dropdownDefaultButton">*/}
                    {/*        <li>*/}
                    {/*            <a href="#"*/}
                    {/*               className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <a href="#"*/}
                    {/*               className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>*/}
                    {/*        </li>*/}
                           {/* <li> */}
                    {/*            <a href="#"*/}
                    {/*               className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <a href="#"*/}
                    {/*               className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign*/}
                    {/*                out</a>*/}
                    {/*        </li>*/}
                    {/*    </ul>*/}
                    {/*</div> */}
                </div>
            </div>
        </div>
    )
}

export default Home;