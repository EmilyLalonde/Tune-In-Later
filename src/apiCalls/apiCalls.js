// export const getUsers = async () => {
//   const url = ''
//   const response = await fetch(url);
//   if(!response.ok) {
//     throw new Error('There was an error getting your information')
//   }
//   const users = await response.json();
//   return users
// }



export const getAlbums = async () => {
  const url = 'https://itunes.apple.com/search?term=jack+johnson&entity=album'
  const response = await fetch(url);
  if(!response.ok) {
    throw new Error('There was an error getting your albums')
  }
  const albums = await response.json();
  return albums.results
}

