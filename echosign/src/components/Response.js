import React, { useState } from "react";
import Thanks from "../assets/images/Thankyou.svg";
import Yes from "../assets/images/Yes.svg";
import Sorry from "../assets/images/Sorry.svg";
import Yikes from "../assets/images/Yikes.svg";
import Hellogif from "../assets/gifs/hello.mp4";
import Nothing from "../assets/gifs/nothing.mp4";
import Annoying from "../assets/gifs/annoying.mp4";
import Uuh from "../assets/gifs/donno.mp4";
import Fake from "../assets/gifs/fake.mp4";
import Forget from "../assets/gifs/forget.mp4";
import Hope from "../assets/gifs/hope.mp4";
import Ignore from "../assets/gifs/ignore.mp4";
import { IoIosArrowDropdown, IoIosArrowBack } from "react-icons/io";
import { IoMdFunnel } from "react-icons/io";
import Modal from 'react-modal';

const Responsive = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedSign, setSelectedSign] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSigns, setFilteredSigns] = useState([]);
    const [filterType, setFilterType] = useState('all'); // 'all', 'image', 'video'

    const signs = [
        { name: 'Hello', gloss: 'HELLO', translation: 'hi, hey, gesture, greeting', type: 'video', source: Hellogif },
        { name: 'Absolutely Nothing', gloss: 'NOTHING', translation: 'all out, depleted, empty', type: 'video', source: Nothing },
        { name: 'Annoying', gloss: 'ANNOYING', translation: 'irritating, bothersome, pesky', type: 'video', source: Annoying },
        { name: 'I dont know', gloss: 'DON\'T KNOW', translation: 'uncertain, unsure, clueless', type: 'video', source: Uuh },
        { name: 'Fake', gloss: 'FAKE', translation: 'not real, counterfeit, imitation', type: 'video', source: Fake },
        { name: 'Hope', gloss: 'HOPE', translation: 'aspiration, desire, wish', type: 'video', source: Hope },
        { name: 'Forget', gloss: 'FORGET', translation: 'unremember, overlook, neglect', type: 'video', source: Forget },
        { name: 'Ignore', gloss: 'IGNORE', translation: 'disregard, overlook, neglect', type: 'video', source: Ignore },
        { name: 'Thank You', gloss: 'THANK YOU', translation: 'gratitude, appreciation, grateful', type: 'image', source: Thanks },
        { name: 'Yes', gloss: 'YES', translation: 'affirmative, agree, okay', type: 'image', source: Yes },
        { name: 'No', gloss: 'NO', translation: 'negative, disagree, decline', type: 'image', source: Thanks },
        { name: 'Sorry', gloss: 'SORRY', translation: 'apology, regret, remorse', type: 'image', source: Sorry },
        { name: 'Ok', gloss: 'OK', translation: 'fine, all right, acceptable', type: 'image', source: Thanks },
        { name: 'Yikes', gloss: 'YIKES', translation: 'surprise, shock, fear', type: 'image', source: Yikes },
        { name: 'Happy', gloss: 'HAPPY', translation: 'joyful, cheerful, content', type: 'image', source: Thanks },
    ];

    const openModal = (sign) => {
        setSelectedSign(sign);
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        filterSigns(query, filterType);
    }

    const cycleFilterType = () => {
        const nextFilter = filterType === 'all' ? 'image' : filterType === 'image' ? 'video' : 'all';
        setFilterType(nextFilter);
        filterSigns(searchQuery, nextFilter);
    }

    const filterSigns = (query, type) => {
        let filtered = signs;
        if (query) {
            filtered = filtered.filter(sign => 
                sign.name.toLowerCase().includes(query.toLowerCase()) ||
                sign.translation.toLowerCase().includes(query.toLowerCase())
            );
        }
        if (type !== 'all') {
            filtered = filtered.filter(sign => sign.type === type);
        }
        setFilteredSigns(filtered);
    }

    const customStyles = {
        content: {
            width: '80%',
            maxWidth: '800px',
            height: '80%',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none'
        }
    };

    const displayedSigns = searchQuery || filterType !== 'all' ? filteredSigns : signs;

    return (
        <div className="font-poppins relative justify-items-center">
            <div className="flex justify-end mr-20 mt-10">
                <input
                    className="border-none bg-gray-200 h-10 mr-2 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                    type="search"
                    name="search"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <div className="flex items-center">
                    <IoMdFunnel
                        className="text-xl cursor-pointer"
                        onClick={cycleFilterType}
                    />
                    <span className="ml-2 text-sm text-gray-600">
                        {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 justify-items-center mx-4 sm:mx-10 mt-2">
                {displayedSigns.map((sign, index) => (
                    <div
                        key={index}
                        className="cursor-pointer hover:bg-transparent"
                        onClick={() => openModal(sign)}
                    >
                        {sign.type === 'image' ? (
                            <img
                                className="transform transition duration-500 ease-in-out hover:scale-110 mt-10"
                                src={sign.source}
                                alt={sign.name}
                            />
                        ) : (
                            <video
                                className="transform transition duration-500 ease-in-out hover:scale-110 mt-10"
                                src={sign.source}
                                alt={sign.name}
                                loop
                                muted
                            />
                        )}
                        <p className="mt-4 text-center">{sign.name}</p>
                        <p className="mt-4 text-center text-[#808080] text-[15px]">Gloss: {sign.gloss}</p>
                        <p className="mt-4 text-center text-[#8b4513] text-[10px]">{sign.translation}</p>
                    </div>
                ))}
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Sign Modal"
                style={customStyles}
            >
                <button onClick={closeModal} className="flex flex-auto">
                    <IoIosArrowBack className="mt-1"/> back
                </button>
                {selectedSign && selectedSign.type === 'image' ? (
                    <img src={selectedSign.source} alt="Selected" className="w-[100%] max-w-[600px] h-[80%] max-h-[600px]" />
                ) : selectedSign && selectedSign.type === 'video' ? (
                    <video src={selectedSign.source} alt="Selected" className="w-[100%] max-w-[600px] h-[80%] max-h-[600px]" controls autoPlay loop />
                ) : null}
                {selectedSign && (
                    <div className="text-center mt-4">
                        <p className="text-lg font-semibold">{selectedSign.gloss}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Responsive;
