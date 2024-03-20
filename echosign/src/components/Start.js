import React from "react";
import HomeImg3 from "../assets/images/HomeImg3.png";

const Start = () => {
    return (
        <div className="container mx-auto bg-white">
            <div className="grid md:grid-cols-2 gap-4">
                <div className="mt-[5rem] flex justify-center md:justify-start">
                    <img className="md:h-[640px] w-[500px] sm:h-full" alt="HomeImg3" src={HomeImg3}/>
                </div>

                <div className="md:mt-[8rem] sm:mt-[2rem]">
                    <p className="font-poppins font-normal text-black text-[53px]">
                        Welcome to TafsiriAI!
                        Your #1 AI KSL translator
                        app!
                    </p>

                    <p className="font-poppins font-normal text-[20px] text-[#21383E] md:mt-10 sm:mt-3">
                        Lovely! To continue press start
                    </p>

                    <div>
                        <a href="/translate"
                           className="w-[150px] mt-8 text-white bg-[#FF6868] font-poppins font-normal rounded-full text-[20px] justify-center py-2.5 text-center inline-flex items-center border-[#FF6868]">
                            START
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Start;