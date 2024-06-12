import React, { useRef, useEffect, useState, useCallback } from 'react';
import HomeImg4 from "../assets/images/HomeImg4.png";
import { FaMicrophone } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const WebcamComponent = () => {
    const videoRef = useRef();
    const [sign, setSign] = useState('');
    const [isVideoOn, setIsVideoOn] = useState(false);
    const [mode, setMode] = useState('short'); // 'short' or 'sentence'
    const [translations, setTranslations] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();
    const { region } = location.state || { region: 'Nairobi' };

    const captureImageAndSendToServer = useCallback(() => {
        if (isVideoOn && videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
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
                    if (mode === 'short') {
                        setSign(data.sign);
                    } else if (mode === 'sentence') {
                        setTranslations(prev => [...prev, data.sign]);
                    }
                }).catch(error => console.error('Error:', error));
            }, 'image/jpeg');
        }
    }, [region, mode, isVideoOn]);

    useEffect(() => {
        let stream;
        const startVideo = async () => {
            const constraints = { video: true };
            stream = await navigator.mediaDevices.getUserMedia(constraints);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        };

        if (isVideoOn) {
            startVideo();
            if (mode === 'short') {
                const interval = setInterval(captureImageAndSendToServer, 2000);
                return () => clearInterval(interval);
            } else if (mode === 'sentence') {
                setTranslations([]); // Clear previous translations
                captureImageAndSendToServer();
                const timeout = setTimeout(() => captureImageAndSendToServer(), 4000); // Generate twice
                return () => clearTimeout(timeout);
            }
        } else {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
                videoRef.current.srcObject = null;
            }
        }
    }, [isVideoOn, captureImageAndSendToServer, mode]);

    const handleSpeech = () => {
        const speech = new SpeechSynthesisUtterance(mode === 'short' ? sign : translations.join(' '));
        window.speechSynthesis.speak(speech);
    };

    const respondSign = () => {
        navigate('/response', { state: { region } });
    };

    return (
        <div className="container mx-auto bg-white flex justify-center items-start min-h-screen pt-10 mt-10">
            <div className="grid md:grid-cols-2 gap-4 items-center">
                <div className="flex justify-center md:justify-start">
                    <img className="md:h-[550px] w-[300px] sm:h-full" alt="HomeImg4" src={HomeImg4} />
                </div>
                <div className="translation-output flex flex-col items-center sm:items-start">
                    <div className="mt-[1rem] mx-auto sm:justify-start">
                        <div className="relative w-[550px] h-[400px] bg-gray-200 flex items-center justify-center">
                            {isVideoOn ? (
                                <video ref={videoRef} autoPlay playsInline className="absolute inset-0 w-full h-full object-cover" />
                            ) : (
                                <p className="text-gray-600">Click toggle to begin translation</p>
                            )}
                        </div>
                        <div className="flex items-center mt-4">
                            <label className="switch flex items-center cursor-pointer mr-4">
                                <input type="checkbox" className="sr-only" checked={isVideoOn} onChange={() => setIsVideoOn(!isVideoOn)} />
                                <div className={`toggle bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full relative`}>
                                    <div className={`absolute left-0 top-0 h-5 w-5 rounded-full shadow-md transform transition-transform duration-200 ease-in-out bg-white ${isVideoOn ? 'translate-x-5 bg-green-300' : 'translate-x-0'}`}></div>
                                </div>
                            </label>
                            <select
                                className="bg-gray-200 text-[#21383E] border border-gray-300 rounded-full py-2 px-2"
                                value={mode}
                                onChange={(e) => setMode(e.target.value)}
                            >
                                <option value="short">Short Structure</option>
                                <option value="sentence">Sentence</option>
                            </select>
                        </div>
                        <p className="font-poppins font-normal mt-4 text-[18px] text-[#121212]">Output:</p>
                        <div className="flex items-center mt-2 flex-wrap">
                            {mode === 'short' ? (
                                <>
                                    <p className="font-poppins font-normal text-[25px] text-[#8b4513]">{sign}</p>
                                    <button onClick={handleSpeech} className="ml-2 text-black">
                                        <FaMicrophone size="1.5em" />
                                    </button>
                                </>
                            ) : (
                                <>
                                    {translations.map((translation, index) => (
                                        <p key={index} className="font-poppins font-normal text-[25px] text-[#8b4513] mr-2">{translation}</p>
                                    ))}
                                    {translations.length > 0 && (
                                        <button onClick={handleSpeech} className="ml-2 text-black">
                                            <FaMicrophone size="1.5em" />
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                        <button onClick={respondSign}
                            className="w-[150px] mt-10 text-[#21383E] bg-[#d3d3d3] font-poppins font-normal rounded-full text-[18px] justify-center py-2.5 text-center items-center border-[#9D9D9D]">
                            respond
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WebcamComponent;
