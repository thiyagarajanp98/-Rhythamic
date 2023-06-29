import React from "react";
import './CardContainer.css';
import { Link } from "react-router-dom";
const CardContainer = ({ launchData }) => {
  return (
    <div className="card-container">
      {launchData.map((album, index) => (
        <Link to="/album" state={album}key={index}>
          <span >
            <div className="album-card">
              <img src={album.image.replace('150x150.jpg', '500x500.jpg')} alt={album.title} className="album-image" />
            </div>
            <span className="album-details">
              {album.title.replaceAll('&quot;', '"')}
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
};

export default CardContainer;
