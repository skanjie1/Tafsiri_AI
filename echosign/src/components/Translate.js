import React, { useRef, useEffect, useState, useCallback } from 'react';
import HomeImg4 from "../assets/images/HomeImg4.png";
import { useLocation } from 'react-router-dom';
import { FaMicrophone } from 'react-icons/fa'; // Import microphone icon

const WebcamComponent = () => {
    const videoRef = useRef();
    const [sign, setSign] = useState('');
    const [isVideoOn, setIsVideoOn] = useState(false); // State to track if video processing is enabled
    const location = useLocation();
    const { region } = location.state || { region: 'Nairobi' };

    const captureImageAndSendToServer = useCallback(() => {
        if (isVideoOn) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            canvas.toBlob(blob => {
                const formData = new FormData();
                formData.append('image', blob);
                formData.append('region', region);

                console.log("Sending region:", region);

                fetch('http://localhost:5000/process_image', {
                    method: 'POST',
                    body: formData,
                }).then(response => response.json())
                .then(data => {
                    setSign(data.sign);
                }).catch(error => console.error('Error:', error));
            }, 'image/jpeg');
        }
    }, [region, isVideoOn]);

    useEffect(() => {
        const constraints = { video: true };
        const startVideo = async () => {
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            videoRef.current.srcObject = stream;
        };
        startVideo();

        const interval = setInterval(captureImageAndSendToServer, 2000);

        return () => {
            const tracks = videoRef.current.srcObject?.getTracks() || [];
            tracks.forEach(track => track.stop());
            clearInterval(interval);
        };
    }, [captureImageAndSendToServer]);

    const handleSpeech = () => {
        const speech = new SpeechSynthesisUtterance(sign);
        window.speechSynthesis.speak(speech);
    };

    return (
        <div className="container mx-auto bg-white">
            <div className="grid md:grid-cols-2 gap-4">
                <div className="mt-[5rem] flex justify-center md:justify-start">
                    <img className="md:h-[550px] w-[300px] sm:h-full" alt="HomeImg4" src={HomeImg4}/>
                </div>
                <div className="translation-output md:mt-[5rem] sm:mt-[2rem] flex flex-col items-center sm:items-start">
                    <div className="mt-[2rem] mx-auto sm:justify-start">
                        <video ref={videoRef} autoPlay playsInline width="640" height="480"></video>
                        <div className="flex items-center mt-4">
                            <label className="switch flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only" checked={isVideoOn} onChange={() => setIsVideoOn(!isVideoOn)}/>
                                <div className={`toggle bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full ${isVideoOn ? 'translate-x-5 bg-green-500' : 'translate-x-0 bg-gray-400'} transition-transform duration-200 ease-in-out`}></div>
                            </label>
                        </div>
                        <p className="font-poppins font-normal mt-4 text-[18px] text-[#121212]">Output:</p>
                        <p className="font-poppins font-normal mt-2 text-[25px] text-[#8b4513]">{sign}</p>
                            <button onClick={handleSpeech} className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                                <FaMicrophone size="1.5em" />
                            </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WebcamComponent;
