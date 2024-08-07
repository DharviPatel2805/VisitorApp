import React from "react";
import { BrowserRouter ,Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Visitor from "./pages/Visitor";
import ThankYou from "./pages/ThankYou";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/visitor" element={<Visitor/>} />
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Login />} />
        <Route path="/thank-you" element={<ThankYou />} />
    </Routes>
    </BrowserRouter>
  );
};

export default App;
