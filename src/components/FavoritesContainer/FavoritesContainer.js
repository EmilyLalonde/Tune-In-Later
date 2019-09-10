import "./FavoritesContainer.css";
import React from "react";
import Album from "../Album/Album";
import { connect } from 'react-redux';

export const FavoritesContainer = ({ favorites, handleFavorite }) => {
  console.log('in FC', handleFavorite)
  const idsOfAllFavs = [];
  if(favorites){  
    favorites.forEach(fav => idsOfAllFavs.push(fav.album_id))
  }
  
  const isThisAFav = (album) =>{
  if(idsOfAllFavs.includes(album.album_id)){
    return true
  }else {
    return false
  }
}
  const favoriteAlbumCards = favorites.map(album => {
    return <Album isFav={isThisAFav(album)} key={album.collectionId} albumData={album} handleFavorite={handleFavorite}/>;
  });

  return (
    <section className="FavoritesContainer">
        {favoriteAlbumCards}
    </section>
    );
};

const mapStateToProps = state => ({
  favorites: state.favorites
})

export default connect(mapStateToProps)(FavoritesContainer);