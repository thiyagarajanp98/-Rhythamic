import React from 'react';
import './Sidebar.css';


function Sidebar() {
  return (
    <div className="sidebar">
        <div className="sidebar-header">
        <h2 className="sidebar-title">BROWSE</h2>
      </div>
      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <a href="#" className="sidebar-link">
          New Releases
          </a>
        </li>
        <li className="sidebar-item">
          <a href="#" className="sidebar-link">
          Top Charts
          </a>
        </li>
        <li className="sidebar-item">
          <a href="#" className="sidebar-link">
          Top Playlists
          </a>
        </li>
        <li className="sidebar-item">
          <a href="#" className="sidebar-link">
          Top Artists
          </a>
        </li>
      </ul>
      <div className="sidebar-header">
        <h2 className="sidebar-title">LIBRARY</h2>
      </div>
      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <a href="#" className="sidebar-link">
          Songs
          </a>
        </li>
        <li className="sidebar-item">
          <a href="#" className="sidebar-link">
          Albums
          </a>
        </li>
        <li className="sidebar-item">
          <a href="#" className="sidebar-link">
          Artists
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
