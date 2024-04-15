import React, { useRef, useEffect } from 'react';
import HomeImg4 from "../assets/images/HomeImg4.png";

const WebcamComponent = () => {
    const videoRef = useRef();

    useEffect(() => {
        const constraints = { video: true };

        const startVideo = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                videoRef.current.srcObject = stream;
            } catch (err) {
                console.error('Error accessing webcam:', err);
            }
        };

        startVideo();

        return () => {
            if (videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject;
                const tracks = stream.getTracks();

                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <div className="container mx-auto bg-white">
            <div className="grid md:grid-cols-2 gap-4">
                <div className="mt-[5rem] flex justify-center md:justify-start">
                    <img className="md:h-[550px] w-[300px] sm:h-full" alt="HomeImg4" src={HomeImg4}/>
                </div>

                <div className="md:mt-[5rem] sm:mt-[2rem] flex flex-col items-center sm:items-start">
                    <p className="font-poppins font-normal text-[18px] text-[#121212]">Translating...</p>
                    <div className="mt-[2rem] mx-auto sm:justify-start">
                        <video ref={videoRef} autoPlay playsInline width="640" height="480"></video>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default WebcamComponent;
