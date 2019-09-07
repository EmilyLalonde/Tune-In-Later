import "./FavoritesContainer.css";
import React from "react";
import Album from "../Album/Album";

const FavoritesContainer = ({ favorites, handleFavorite }) => {
  const favoriteAlbumCards = favorites.map(album => {
    return <Album albumData={album} handleFavorite={handleFavorite}/>;
  });

  return (
    <section className="FavoritesContainer">
        {favoriteAlbumCards}
    </section>
    );
};

export default FavoritesContainer;
