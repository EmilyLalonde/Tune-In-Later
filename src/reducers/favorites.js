export const favoriteReducer = (state=[], action) => {
  switch(action.type) {
    case 'HANDLE_ADD':
      return [...state, action.albumData]
    case 'HANDLE_DELETE':
      const remainingAlbums = state.filter(album => {
        return album.id !== action.albumData.id
      })
      return remainingAlbums
    case 'GET_FAVORITES':
      return action.albumData
    default:
      return state
  }
}