import React from "react";
import { BrowserRouter as Router, Route, Routes }  from "react-router-dom";
import Navbar from "./Navbar";
import About from "./About";
import Home from "./Home";
import Contact from "./Contact";
import Login from "./Login";
import Signup from "./Signup";
import WebcamComponent from "./Translate";
import Start from "./Start";
import Options from "./Options";
import Responsive from "./Response";
import BitTranslate from "./Bittranslate";
import Bitmoji from "./Bitmoji";


function App() {
  return (
      <div className="App">
        <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/start" element={<Start/>}/>
            <Route path="/options" element={<Options/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/translate" element={<WebcamComponent/>}/>
            <Route path="/response" element={<Responsive/>}/>
            <Route path="/bittranslate" element={<BitTranslate/>}/>
            <Route path="/bitmoji" element={<Bitmoji/>}/>
          </Routes>
      </div>
    );
}
export default App;
