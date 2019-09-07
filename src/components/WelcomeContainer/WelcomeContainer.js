import "./WelcomeContainer.css";
import React from "react";
import Album from "../Album/Album";

const WelcomeContainer = ({ albums, handleFavorite }) => {
  const albumCards = albums.map(album => {
    return <Album albumData={album} handleFavorite={handleFavorite} />;
  });

  return <section className="WelcomeContainer">{albumCards}</section>;
};

export default WelcomeContainer;
