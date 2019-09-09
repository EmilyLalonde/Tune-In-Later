export const createTheUser = user => ({
  type: 'CREATE_USER',
  user
})

export const loginTheUser = user => ({
  type: 'LOGIN_USER',
  user
})

export const logoutUser = () => ({
  type: 'LOGOUT_USER'
})

export const getTheFavorites = favorites => ({
  type: 'GET_FAVORITES',
  favorites
})

export const handleAdd = albumData => ({
  type: 'HANDLE_ADD',
  albumData
})

export const handleDelete = albumData => ({
  type: 'HANDLE_DELETE',
  albumData
})