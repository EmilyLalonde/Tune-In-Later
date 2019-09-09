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

export const getTheFavorites = albumData => ({
  type: 'GET_FAVORITE',
  albumData
})

export const handleAdd = albumData => ({
  type: 'HANDLE_ADD',
  albumData
})

export const handleDelete = albumData => ({
  type: 'HANDLE_DELETE',
  albumData
})