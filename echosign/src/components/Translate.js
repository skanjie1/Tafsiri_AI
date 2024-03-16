import React, { useRef, useEffect } from 'react';
import translate from "../assets/images/translate.png";

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
        <div className="mt-[3rem]">
            <img className="md:h-[640px] w-[350px] sm:h-full" alt="People" src={translate}/>
        </div>
        

        <div>
        <p className="font-poppins font-normal text-black text-[18px] mt-[3rem]">
                    Translating...
                    </p>
            <div className='mt-[4rem]'>
            <video ref={videoRef} autoPlay playsInline width="640" height="480"></video>
            </div>
        </div>
        
        </div>
        </div>
    );
};

export default WebcamComponent;
