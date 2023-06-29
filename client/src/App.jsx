import React from 'react';
import UHome from './UHome';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AlbumDetails from './AlbumDetails';
import Sidebar from './Sidebar';
import Navbar from './Navbar';



const App = () => {
  return (
    <Router>
      <Sidebar />
      <Navbar /*handleSearch={handleSearch} *//>
      <Routes>
        <Route path="/" element={<UHome />}></Route>
        <Route path="/album" element={<AlbumDetails />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
