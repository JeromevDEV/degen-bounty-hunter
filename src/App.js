import React, {useState, useEffect} from "react";
import {
    Pre,
    Navigation,
    Footer,
    Home,
    About,
    Hunt,
    Roadmap,
    Whitepaper,
} from "./components";
import GenZero from "./components/GenZero"
import Claim from "./components/Claim"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./style.css";
import "./App.css";

import ScrollToTop from "./components/ScrollToTop";

function App() {
    const [load, upadateLoad] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            upadateLoad(false);
        }, 1200);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Router>
            <Pre load={load}/>
            <div className="App" id={load ? "no-scroll" : "scroll"}>
                <Navigation/>
                <ScrollToTop/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/hunt" element={<Hunt/>}/>
                    <Route path="/roadmap" element={<Roadmap/>}/>
                    <Route path="/whitepaper" element={<Whitepaper/>}/>
                    <Route path="/genZero" element={<GenZero/>}/>
                    <Route path="/claim" element={<Claim/>}/>
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
