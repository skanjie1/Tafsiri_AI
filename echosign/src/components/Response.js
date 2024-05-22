import React, { useState, useEffect } from "react";
import Hello from "../assets/images/Hello.png";
import Thanks from "../assets/images/Thankyou.png";
import Yes from "../assets/images/Yes.png";
import Sorry from "../assets/images/Sorry.png";
import Yikes from "../assets/images/Yikes.png";
import { IoIosArrowDropdown, IoIosArrowBack } from "react-icons/io";
import Modal from 'react-modal';
// import { useLocation } from 'react-router-dom';


const Responsive = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const openModal = (image) => {
        setSelectedImage(image);
        setModalIsOpen(true);
      }

  const closeModal = () => {
    setModalIsOpen(false);
  }
  const customStyles = {
    content: {
      width: '100%',
      height: '70%',
      margin: 'auto',
      display: 'absolute',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      border:'none'
    }
  };
  return (
    <div className="relative justify-items-center">
      <div className="flex justify-end mr-20 mt-10">
        <input
          className="border-none bg-gray-200 h-10 mr-8 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="search"
          name="search"
          placeholder="Search"
        />
      </div>
      <p className="text-gray-400 ml-4 sm:ml-28">
        Reply to: <span className="text-black">Hello!</span>
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 justify-items-center mx-4 sm:mx-10 mt-4 ">
      <div className=" cursor-pointer hover:bg-transparent" onClick={() => openModal(Hello)}>
          <img
            className="transform transition duration-500 ease-in-out hover:scale-110"
            src={Hello}
            alt="placeholder hover:bg-transparent"
          />
          <p className="mt-4 text-center cursor-pointer">Hello</p>
          {/* <Link href="about" rel="stylesheet" /> */}
        </div>
        <div className=" cursor-pointer hover:bg-transparent" onClick={() => openModal(Thanks)}>
          <img
            src={Thanks}
            alt="placeholder"
            className="transform transition duration-500 ease-in-out hover:scale-110 cursor-pointer"
          />
          <p className="mt-4 text-center">Thank You</p>
        </div>
        <div className=" cursor-pointer hover:bg-transparent" onClick={() => openModal(Yes)}>
          <img
            src={Yes}
            alt="placeholder"
            className="transform transition duration-500 ease-in-out hover:scale-110"
          />
          <p className="mt-4 text-center">Yes</p>
        </div>
        <div className=" cursor-pointer hover:bg-transparent" onClick={() => openModal(Yes)}>
          <img
            src={Thanks}
            alt="placeholder"
            className="transform transition duration-500 ease-in-out hover:scale-110"
          />
          <p className="mt-4 text-center">No</p>
        </div>
        <div className="mt-10 cursor-pointer hover:bg-transparent" onClick={() => openModal(Sorry)}>
          <img
            src={Sorry}
            alt="placeholder"
            className="transform transition duration-500 ease-in-out hover:scale-110"
          />
          <p className="mt-4 text-center">Sorry</p>
        </div>
        <div className="mt-10 cursor-pointer hover:bg-transparent" onClick={() => openModal(Thanks)}>
          <img
            src={Thanks}
            alt="placeholder"
            className="transform transition duration-500 ease-in-out hover:scale-110"
          />
          <p className="mt-4 text-center">ok</p>
        </div>
        <div className="mt-10 cursor-pointer hover:bg-transparent" onClick={() => openModal(Yikes)}>
          <img
            src={Yikes}
            alt="placeholder"
            className="transform transition duration-500 ease-in-out hover:scale-110"
          />
          <p className="mt-4 text-center">Yikes</p>
        </div>
        <div className="mt-10 cursor-pointer hover:bg-transparent" onClick={() => openModal(Thanks)}>
          <img
            src={Thanks}
            alt="placeholder"
            className="transform transition duration-500 ease-in-out hover:scale-110"
          />
          <p className="mt-4 text-center">Happy</p>
        </div>
      </div>
      <div className="mt-18 flex justify-center mx-4 sm:mx-20r">
        <div className="border-t border-gray-300 w-full sm:w-1/2 ml-4 sm:ml-28 my-4"></div>
        <IoIosArrowDropdown className="text-5xl text-gray-400 mx-4 cursor-pointer" />
        <div className="border-t border-gray-300 w-full sm:w-1/2 mr-4 sm:mr-24 my-4"></div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <button onClick={closeModal} className="flex flex-auto"> <IoIosArrowBack className="mt-1"/> back</button>
        {selectedImage && <img src={selectedImage} alt="Selected" className="w-[100%] h-[94%]" />}
      </Modal>
    </div>
  );
};

export default Responsive;