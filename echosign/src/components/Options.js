import React from "react";
// import HomeImg2 from "../assets/images/HomeImg2.png";
import HomeImg from "../assets/images/HomeImg.png";


const Options = () => {
    return (
        <div className="container mx-auto bg-white">
            <div className="grid md:grid-cols-2">
                {/* <div className="mt-[2rem] flex justify-center md:justify-start">
                    <img className="md:h-[600px] w-[380px] sm:h-full" alt="HomeImg2" src={HomeImg2}/>
                </div> */}
                <div className="mt-[5rem] flex justify-center md:justify-start">
                    <img className="md:h-[640px] w-[500px] sm:h-full" alt="HomeImg" src={HomeImg}/>
                </div>

                <div className="md:mt-[8rem] sm:mt-[2rem]">
                    <p className="font-poppins font-normal text-black text-[53px]">
                        Welcome to TafsiriAI!
                        Your #1 AI KSL translator
                        app!
                    </p>

                    <p className="font-poppins font-normal text-[20px] text-[#21383E] md:mt-10 sm:mt-3">
                        What do you wish to do?
                    </p>

                    <div className="grid md:grid-cols-3">
                        <div>
                            <a href="/start"
                               className="w-[220px] mt-8 text-[#6D6D6D] bg-[#EDEDED] font-poppins font-normal rounded-full text-[18px] justify-center py-2.5 text-center inline-flex items-center border-2 border-[#9D9D9D]">
                                Translate KSL
                            </a>
                        </div>

                        <div className="md:flex justify-around items-center">
                            <p className="text-[#121212] mt-[2rem] font-poppins font-normal text-[18px]">or</p>
                        </div>

                        <div>
                            <a href="/start"
                               className="w-[220px] mt-8 text-[#6D6D6D] bg-[#EDEDED] font-poppins font-normal rounded-full text-[18px] justify-center py-2.5 text-center inline-flex items-center border-2 border-[#9D9D9D]">
                                Translate Text
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Options;