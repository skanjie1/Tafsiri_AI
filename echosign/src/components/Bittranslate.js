import React, { useState } from 'react';
import Bitmoji from './Bitmoji';
import Rectangle from "../assets/images/ContactRectangle.png";


function BitTranslate() {
    const [inputText, setInputText] = useState("");
    const [translatedWords, setTranslatedWords] = useState([]);

    const translateText = () => {
        const words = inputText.trim().toLowerCase().split(/\s+/);
        setTranslatedWords(words);
    };

    return (
        <div className="min-h-screen flex flex-col items-center mt-10 bg-white">
            <h1 className="text-[25px] font-poppins mb-4">Text to Sign Translator</h1>
            <img src={Rectangle} alt="Rectangle" className="mx-auto"/>
            <textarea
                className="w-full max-w-lg mt-6 p-4 border border-gray-300 rounded-lg mb-4"
                placeholder="Enter text to translate..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
            />
            <button
                className="px-6 py-2 bg-[#d3d3d3] text-white rounded-full"
                onClick={translateText}
            >
                Translate
            </button>
            <div className="mt-6 flex flex-wrap justify-center">
                {translatedWords.map((word, index) => (
                    <Bitmoji key={index} word={word} />
                ))}
            </div>
        </div>
    );
}

export default BitTranslate;
