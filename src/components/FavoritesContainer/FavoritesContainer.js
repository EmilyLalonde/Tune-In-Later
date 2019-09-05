import "./FavoritesContainer.css";
import React from "react";
import Album from "../Album/Album";

const FavoritesContainer = ({ albums }) => {
  const albumCards = albums.map(album => {
    return <Album albumData={album} />;
  });

  return (
    <section className="FavoritesContainer">
        {albumCards}
    </section>
    );
};

export default FavoritesContainer;
