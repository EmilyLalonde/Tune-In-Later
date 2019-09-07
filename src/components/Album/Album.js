import "./Album.css";
import React from "react";

const Album = ({ albumData, handleFavorite, }) => {
  // console.log('handlefav', handleFavorite)
  return (
    <article className='Album'>
      <h2>{albumData.artistName}</h2>
      <p>{albumData.releaseDate.substring(0,4)}</p>
      <p>{albumData.collectionName}</p>
      <img src={albumData.artworkUrl100} alt="" className="coverArt"/>
      <button onClick={(e) => handleFavorite(e, albumData)}>Save for later</button>
    </article>
  );
};

export default Album;
