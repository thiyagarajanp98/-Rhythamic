import React from "react";
import './CardContainer.css'; 
const CardContainer = ({ launchData, onClick }) => {
  return (
    <div className="card-container">
      {launchData.map((album,index) => (
        <span key={index} onClick={()=>onClick([album.id,album.type])}>
          <div className="album-card">
            <img src={album.image.replace('150x150.jpg', '500x500.jpg')} alt={album.title} className="album-image" />
          </div>
          <span className="album-details">
            {album.title.replaceAll('&quot;', '"')}
          </span>
        </span>
      ))}
    </div>
  );
};

export default CardContainer;
