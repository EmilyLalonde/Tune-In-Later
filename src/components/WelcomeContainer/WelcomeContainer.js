import "./WelcomeContainer.css";
import React from "react";
import Album from "../Album/Album";

const WelcomeContainer = ({ albums }) => {
  const albumCards = albums.map(album => {
    return <Album albumData={album} />;
  });

  return <section className="WelcomeContainer">{albumCards}</section>;
};

export default WelcomeContainer;
