import React from "react";
import CardContainer from "./CardContainer";
import './AlbumContainer.css'; 
const AlbumContainer = ({ titles, launchData }) => {
  return (
    <div className="container">
      <h2 className="album-title">{titles}</h2>
      <div className="album-card-container">
        <CardContainer launchData={launchData} />
      </div>
    </div>
  );
};

export default AlbumContainer;
