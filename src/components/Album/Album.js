import "./Album.css";
import React from "react";

const Album = ({ albumData, handleFavorite, }) => {
  return (
    <article className='Album'>
      <h2>{albumData.artistName || albumData.artist_name}</h2>
      <p>{(albumData.releaseDate || albumData.release_date).substring(0,4)}</p>
      <p>{albumData.collectionName || albumData.album_name}</p>
      <img src={albumData.artworkUrl100 || albumData.artwork_url} alt="album cover art" className="coverArt"/>
      <button onClick={(e) => handleFavorite(e, albumData)}>Save for later</button>
    </article>
  );
};

export default Album;
