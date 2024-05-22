import React, { useRef, useEffect, useState, useCallback } from 'react';
import HomeImg4 from "../assets/images/HomeImg4.png";
import { FaMicrophone } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const WebcamComponent = () => {
    const videoRef = useRef();
    const [sign, setSign] = useState('');
    const [isVideoOn, setIsVideoOn] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { region } = location.state || { region: 'Nairobi' };

    const captureImageAndSendToServer = useCallback(() => {
        if (isVideoOn && videoRef.current) {
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
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        };
        startVideo();

        const interval = setInterval(captureImageAndSendToServer, 2000);

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
            clearInterval(interval);
        };
    }, [captureImageAndSendToServer]);

    const handleSpeech = () => {
        const speech = new SpeechSynthesisUtterance(sign);
        window.speechSynthesis.speak(speech);
    };

    const respondSign = () => {
        navigate('/response', { state: { region } });
    };

    return (
        <div className="container mx-auto bg-white">
            <div className="grid md:grid-cols-2 gap-4">
                <div className="mt-[5rem] flex justify-center md:justify-start">
                    <img className="md:h-[550px] w-[300px] sm:h-full" alt="HomeImg4" src={HomeImg4} />
                </div>
                <div className="translation-output md:mt-[5rem] sm:mt-[2rem] flex flex-col items-center sm:items-start">
                    <div className="mt-[2rem] mx-auto sm:justify-start">
                        <video ref={videoRef} autoPlay playsInline width="640" height="480"></video>
                        <div className="flex items-center mt-4">
                            <label className="switch flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only" checked={isVideoOn} onChange={() => setIsVideoOn(!isVideoOn)} />
                                <div className={`toggle bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full ${isVideoOn ? 'translate-x-5 bg-green-500' : 'translate-x-0 bg-gray-400'} transition-transform duration-200 ease-in-out`}></div>
                            </label>
                        </div>
                        <p className="font-poppins font-normal mt-4 text-[18px] text-[#121212]">Output:</p>
                        <p className="font-poppins font-normal mt-2 text-[25px] text-[#8b4513]">{sign}</p>
                        <button onClick={handleSpeech} className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                            <FaMicrophone size="1.5em" />
                        </button>
                        <button onClick={respondSign}
                            className="w-[150px] mt-8 text-white bg-[#FF6868] font-poppins font-normal rounded-full text-[20px] justify-center py-2.5 text-center inline-flex items-center border-[#FF6868]">
                            RESPOND
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WebcamComponent;
