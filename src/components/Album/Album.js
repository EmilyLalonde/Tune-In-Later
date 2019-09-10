import "./Album.css";
import React from "react";

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
      <h2 className="album-name"><p className="label">Artist:</p> {albumData.artistName || albumData.artist_name}</h2>
      <h3><p className="label">Album:</p> {albumData.collectionName || albumData.album_name}</h3>
      <h3><p className="label">Release Date:</p> {(albumData.releaseDate || albumData.release_date).substring(0,4)}</h3>
      </div>
      </div>
    </article>
    </div>
  );
};

export default Album;
