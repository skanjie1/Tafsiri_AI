import React, { useRef, useEffect, useState } from 'react';
import HomeImg4 from "../assets/images/HomeImg4.png";
import axios from 'axios'; 

const WebcamComponent = () => {
    const videoRef = useRef();
    const [sign, setSign] = useState('');

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

        const interval = setInterval(() => {
            captureImageAndSendToServer();
        }, 2000); // Capture image every 2 seconds

        return () => {
            if (videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject;
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }
            clearInterval(interval);
        };
    }, []);

    const captureImageAndSendToServer = () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(blob => {
            const formData = new FormData();
            formData.append('image', blob);
            axios.post('http://localhost:5000/process_image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                setSign(response.data.sign);
            }).catch(error => console.error('Error:', error));
        }, 'image/jpeg');
    };

    return (
        <div className="container mx-auto bg-white">
            <div className="grid md:grid-cols-2 gap-4">
                <div className="mt-[5rem] flex justify-center md:justify-start">
                    <img className="md:h-[550px] w-[300px] sm:h-full" alt="HomeImg4" src={HomeImg4}/>
                </div>

                <div className="md:mt-[5rem] sm:mt-[2rem] flex flex-col items-center sm:items-start">
                    <div className="mt-[2rem] mx-auto sm:justify-start">
                    <video ref={videoRef} autoPlay playsInline width="640" height="480"></video>
                    <p className="font-poppins font-normal mt-[2rem] text-[18px] text-[#121212]">Output: </p>
                    <p className="font-poppins font-normal mt-[1rem] text=[50px] text-[#8b4513]">{sign}</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default WebcamComponent;

