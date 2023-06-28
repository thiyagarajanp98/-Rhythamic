import React from 'react';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AlbumDetails from './AlbumDetails';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/album/:id" element={<AlbumDetails />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
