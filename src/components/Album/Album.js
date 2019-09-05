import "./Album.css";
import React from "react";

const Album = ({ albumData }) => {
  return (
    <article className='Album'>
      <h2>{albumData.artistName}</h2>
      <p>{albumData.releaseDate.substring(0,4)}</p>
      <p>{albumData.collectionName}</p>
      <img src={albumData.artworkUrl100} alt="" />
    </article>
  );
};

export default Album;
