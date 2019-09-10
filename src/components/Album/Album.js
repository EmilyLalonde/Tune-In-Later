import "./Album.css";
import React from "react";
import PropTypes from 'prop-types'

const Album = ({ albumData, handleFavorite, isFav }) => {
  return (
    <div className="card-border">
      <button className={isFav ? 'favorite' : 'notFavorite'} onClick={() => handleFavorite(albumData)}></button>
    <article className='Album'>
      <div className="card">
      <div className="card-front">
      <img src={albumData.artworkUrl100 || albumData.artwork_url} alt="album cover art" className="coverArt"/>
      </div>
      <div className="card-back">
      <h2 className="album-name">{albumData.artistName || albumData.artist_name}</h2>
      <p>{(albumData.releaseDate || albumData.release_date).substring(0,4)}</p>
      <p>{albumData.collectionName || albumData.album_name}</p>
      </div>
      </div>
    </article>
    </div>
  );
};

export default Album;

Album.propTypes = {
  albumData: PropTypes.object,
  handleFavorite: PropTypes.func,
  isFav: PropTypes.bool
}