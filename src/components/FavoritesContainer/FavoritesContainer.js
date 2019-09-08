import "./FavoritesContainer.css";
import React from "react";
import Album from "../Album/Album";

const FavoritesContainer = ({ favorites, handleFavorite }) => {
  const favs = favorites.favorites;
  const idsOfAllFavs = []
  if(favs){  
    favs.forEach(fav => idsOfAllFavs.push(fav.album_id))
  }
  
  const isThisAFav = (album) =>{
  if(idsOfAllFavs.includes(album.album_id)){
    return true
  }else {
    return false
  }
}
  const favoriteAlbumCards = favs.map(album => {
    return <Album isFav={isThisAFav(album)} key={album.collectionId} albumData={album} handleFavorite={handleFavorite}/>;
  });

  return (
    <section className="FavoritesContainer">
        {favoriteAlbumCards}
    </section>
    );
};

export default FavoritesContainer;
