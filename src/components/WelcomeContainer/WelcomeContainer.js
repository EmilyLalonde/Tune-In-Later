import "./WelcomeContainer.css";
import React from "react";
import Album from "../Album/Album";
import { connect } from 'react-redux';

const WelcomeContainer = ({ albums, handleFavorite, favorites }) => {
  const favs = favorites
  console.log('favorites', favorites)
  const idsOfAllFavs = []
  if(favs){  
    favs.forEach(fav => idsOfAllFavs.push(fav.album_id))
  }
  
  const isThisAFav = (album) =>{
  if(idsOfAllFavs.includes(album.collectionId)){
    return true
  }else {
    return false
  }
}
  const albumCards = albums.map(album => {
    return <Album isFav={isThisAFav(album)} key={album.collectionId} albumData={album} handleFavorite={handleFavorite} />;
  });

  return <section className="WelcomeContainer">{albumCards}</section>;
};

const mapStateToProps = state => ({
  favorites: state.favorites
})

export default connect(mapStateToProps)(WelcomeContainer);
