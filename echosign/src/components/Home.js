import React, { useState } from "react";
import HomeImg from "../assets/images/HomeImg.png";
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState("");

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleRegionSelect = async (region) => {
        setSelectedRegion(region);
        setDropdownOpen(false);

        try {
            const response = await fetch('http://localhost:5000/select_region', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ region })
            });

            const data = await response.json();
            if (response.ok) {
                navigate('/options', { state: { region } }); // Navigate to options page
            } else {
                alert(data.error); // Show error message if region selection fails
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error selecting region');
        }
    };

    return (
        <div className="container mx-auto bg-white">
            <div className="grid md:grid-cols-2 gap-4">
                <div className="mt-[5rem] flex justify-center md:justify-start">
                    <img className="md:h-[640px] w-[500px] sm:h-full" alt="HomeImg" src={HomeImg}/>
                </div>
                <div className="md:mt-[8rem] sm:mt-[2rem]">
                    <p className="font-poppins font-normal text-black text-[53px]">
                        Welcome to TafsiriAI!
                        Your #1 AI KSL translator app!
                    </p>
                    <p className="font-poppins font-normal text-[20px] text-[#21383E] md:mt-10 sm:mt-3">To begin, tell us where you come from:</p>
                    <button onClick={toggleDropdown} className="mt-8 text-[#6D6D6D] bg-[#EDEDED] font-poppins font-normal rounded-full text-[20px] px-14 py-2.5 text-center inline-flex items-center border-2 border-[#9D9D9D]">Select Region
                        <svg className="w-2.5 h-2.5 ml-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l4 4 4-4" />
                        </svg>
                    </button>
                    {dropdownOpen && (
                        <div className="bg-[#EDEDED] divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                <li><button onClick={() => handleRegionSelect('Nairobi')} className="block px-4 py-2 w-full text-left hover:bg-white">Nairobi</button></li>
                                <li><button onClick={() => handleRegionSelect('Coastal')} className="block px-4 py-2 w-full text-left hover:bg-white">Coastal</button></li>
                                <li><button onClick={() => handleRegionSelect('Western')} className="block px-4 py-2 w-full text-left hover:bg-white">Western</button></li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
