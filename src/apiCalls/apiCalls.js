export const getAlbums = async (id) => {
  const url = `https://itunes.apple.com/search?term=music&genreId=${id}&limit=5`
  const response = await fetch(url);
  if(!response.ok) {
    throw new Error('There was an error getting your albums')
  }
  const albums = await response.json();
  return albums.results
}

export const getArtistAlbums = async (artist) => {
  const url = `https://itunes.apple.com/search?term=music&term=${artist}&limit=5`
  const response = await fetch(url);
  if(!response.ok) {
    throw new Error('There was an error getting your albums')
  }
  const albums = await response.json();
  console.log('getArtistAlbums',albums.results)
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
    throw new Error('Email and passwords do not match')
  }
  const loginResponse = await response.json();
  return loginResponse
}

export const createUser = async user => {
  const url = "http://localhost:3001/api/v1/users/";
  const options = {
    method: "POST",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({...user})
  }
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Email has already been used')
  }
  const createUserResponse = await response.json();
  return createUserResponse
}

export const addToFavorites = async (favorite, id) => {
  const url = `http://localhost:3001/api/v1/users/${id}/albumfavorites/`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({...favorite})
  }
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('There was an error saving your favorites')
  }
  const addFavsResponse = await response.json();
  return addFavsResponse
}

export const deleteFavorite = async (albumId, id) => {
  // console.log('fire deleteFavorite', albumId, id)
  const url = `http://localhost:3001/api/v1/users/${id}/albumfavorites/${albumId}`;
  // console.log('delete url', url)
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  }
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('There was an error deleting the favorite')
  }
}


export const getFavorites = async (user) => {
  const url = `http://localhost:3001/api/v1/users/${user.id}/albumfavorites/`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('There was an error saving your favorites')
  }
  const getFavsResponse = await response.json();
  return getFavsResponse
}
