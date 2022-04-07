import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home"
import Game from "../pages/Game"
import Finish from "../pages/Finish"


function Router(){
    return(
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="game" element={<Game />} />
        <Route path="finish" element={<Finish />} />
      </Routes>
    );
}

export default Router;