import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ handleSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(query);
    setQuery('');
  };

  return (
    <nav className="navbar">
      <div className='part-one'>
        <h2 className="navbar-title">RHYTHMIC</h2>
      </div>
      <div className='part-two'>
        <form role="search" method="get" className="search-form form" onSubmit={handleSubmit}>
          <label>
            <span className="screen-reader-text">Search for...</span>
            <input type="search" className="search-field" placeholder="Search..." value={query}
              onChange={(e) => setQuery(e.target.value)} />
          </label>
          {/* <input type="submit" className="search-submit button" value="&#xf002" /> */}
          <button className="search-submit button">
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;