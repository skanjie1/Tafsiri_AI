import { Routes, Route }  from "react-router-dom";
import Navbar from "./Navbar";
import About from "./About";
import Home from "./Home";
import Contact from "./Contact";
import Login from "./Login";
import Signup from "./Signup";
import WebcamComponent from "./Translate";


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/translate" element={<WebcamComponent/>}/>
      </Routes>
    </div>
  );
}

export default App;
