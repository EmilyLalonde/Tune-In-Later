import "./FavoritesContainer.css";
import React from "react";
import Album from "../Album/Album";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FilterForm from '../FilterForm/FilterForm';

const FavoritesContainer = ({ favorites, handleFavorite }) => {
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

  let favoriteAlbumCards = [];
  const filterByGenre = (genre) => {
    const filteredFavorites = favorites.filter(favorite => favorite.primary_genre_name === genre)
    favoriteAlbumCards = filteredFavorites.map(album => {
      return <Album isFav={isThisAFav(album)} key={album.collectionId + 'fave'} albumData={album} handleFavorite={handleFavorite}/>;
    });
  }

  return (
    <section className="FavoritesContainer">
      <FilterForm filterByGenre={filterByGenre}/>
      {favoriteAlbumCards}
    </section>
    );
};

const mapStateToProps = state => ({
  favorites: state.favorites
})

export default connect(mapStateToProps)(FavoritesContainer);

FavoritesContainer.propTypes = {
  favorites: PropTypes.array,
  handleFavorite: PropTypes.func,
}