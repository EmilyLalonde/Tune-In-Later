import "./FavoritesContainer.css";
import React from "react";
import Album from "../Album/Album";

const FavoritesContainer = ({ favorites, handleFavorite }) => {
  const allFavs = favorites.favorites;
  console.log(favorites)
  const favoriteAlbumCards = allFavs.map(album => {
    return <Album key={album.collectionId} albumData={album} handleFavorite={handleFavorite}/>;
  });

  return (
    <section className="FavoritesContainer">
        {favoriteAlbumCards}
    </section>
    );
};

export default FavoritesContainer;
