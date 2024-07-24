import React from 'react';
import helloGif from '../assets/gifs/hello.mp4';
import annoyingGif from '../assets/gifs/annoying.mp4';
import donno from '../assets/gifs/donno.mp4';
import ignore from '../assets/gifs/ignore.mp4';
import nothing from '../assets/gifs/nothing.mp4';
import hope from '../assets/gifs/hope.mp4';
import forget from '../assets/gifs/forget.mp4';
import fake from '../assets/gifs/fake.mp4';
import daughter from '../assets/gifs/daughter.mp4';
import yesterday from '../assets/gifs/yesterday.mp4'
import birth from '../assets/gifs/birth.mp4';
import upset from '../assets/gifs/upset.mp4';

const bitmojiMap = {
    "hello": { type: "video", src: helloGif, gloss: "HELLO" },
    "annoying": { type: "video", src: annoyingGif, gloss: "ANNOYING" },
    "i dont know": { type: "video", src: donno, gloss: "DON'T KNOW" },
    "ignore": { type: "video", src: ignore, gloss: "IGNORE" },
    "nothing": { type: "video", src: nothing, gloss: "NOTHING" },
    "hope": { type: "video", src: hope, gloss: "HOPE" },
    "forget": { type: "video", src: forget, gloss: "FORGET" },
    "fake": { type: "video", src: fake, gloss: "FAKE" },
    "daughter": { type: "video", src: daughter, gloss: "DAUGHTER" },
    "yesterday": { type: "video", src: yesterday, gloss: "YESTERDAY" },
    "birth": { type: "video", src: birth, gloss: "BIRTH" },
    "upset": { type: "video", src: upset, gloss: "UPSET" },
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
