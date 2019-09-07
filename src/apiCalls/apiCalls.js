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

export const loginUser = async user => {
  const url = "http://localhost:3001/api/v1/login/";
  const options = {
    method: "POST",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({...user})
  }
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('There was an error getting your albums')
  }
  const loginResponse = await response.json();
  return loginResponse
}