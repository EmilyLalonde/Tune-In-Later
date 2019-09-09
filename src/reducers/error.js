export const errorReducer = (state=null, action) => {
  switch(action.type) {
    case 'LOGIN_USER':
      return action.user
      default:
        return state
  }
}