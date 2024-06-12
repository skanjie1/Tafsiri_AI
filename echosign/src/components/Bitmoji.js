// src/Bitmoji.js
import React from 'react';
import helloGif from '../assets/gifs/hello.mp4';
import annoyingGif from '../assets/gifs/annoying.mp4';

const bitmojiMap = {
    "hello": { type: "video", src: helloGif, gloss: "HELLO" },
    "annoying": { type: "video", src: annoyingGif, gloss: "ANNOYING" },
};

function Bitmoji({ word }) {
    const media = bitmojiMap[word];

    if (!media) {
        return <span className="m-2 p-2 text-gray-700">{`[${word}]`}</span>;
    }

    return (
        <div className="m-2 p-2 text-center">
            {media.type === "video" ? (
                <video
                    src={media.src}
                    alt={word}
                    className="w-90 h-80 m-2"
                    autoPlay
                    loop
                    muted
                />
            ) : (
                <img
                    src={media.src}
                    alt={word}
                    className="w-90 h-80 m-2"
                />
            )}
            <p className="text-sm font-poppins font-semibold mt-3">{media.gloss}</p>
        </div>
    );
}

export default Bitmoji;
