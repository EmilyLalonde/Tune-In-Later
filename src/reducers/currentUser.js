export const currentUserReducer = (state=null, action) => {
  switch(action.type) {
    case 'LOGIN_USER':
      return action.user
    case 'LOGOUT_USER':
      return state
    case 'CREATE_USER':
      return action.user
      default:
        return state
  }
}