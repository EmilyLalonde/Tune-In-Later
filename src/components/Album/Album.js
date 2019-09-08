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


// album_id: 253618023
// album_name: "Platinum & Gold Collection"
// artist_name: "Gladys Knight & The Pips"
// artwork_url: "https://is2-ssl.mzstatic.com/image/thumb/Music/v4/ec/3d/3a/ec3d3a4d-39a4-1704-61a7-25338873ca7c/source/100x100bb.jpg"
// content_advisory_rating: "notExplicit"
// id: 10
// primary_genre_name: "R&B/Soul"
// release_date: