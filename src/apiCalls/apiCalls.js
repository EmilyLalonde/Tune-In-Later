export const getAlbums = async (id) => {
  const url = `https://itunes.apple.com/search?term=music&genreId=${id}&limit=4`
  const response = await fetch(url);
  if(!response.ok) {
    throw new Error('There was an error getting your albums')
  }
  const albums = await response.json();
  return albums.results
}

export const getArtistAlbums = async (artist) => {
  const url = `https://itunes.apple.com/search?term=music&term=${artist}&limit=12`
  const response = await fetch(url);
  if(!response.ok) {
    throw new Error('There was an error getting your albums')
  }
  const albums = await response.json();
  return albums.results
}
