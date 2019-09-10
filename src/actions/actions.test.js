import { 
  createTheUser, 
  loginTheUser, 
  logoutUser,
  getTheFavorites,
  handleAdd,
  handleDelete
} from '../actions';

describe('actions', () => {

  it('should return the correct action object for the action type - createTheUser', () => {
    const mockUser = {id: 3, name: 'Joe Tester', email: 'joe@email.com'}
    const result = createTheUser(mockUser);
    const expected = {
      type: 'CREATE_USER',
      user: mockUser
    }
    expect(result).toEqual(expected);
  });

  it('should return the correct action object for the action type - loginTheUser', () => {
    const mockUser = { id: 3, name: 'Joe Tester', email: 'joe@email.com' }
    const result = loginTheUser(mockUser);
    const expected = {
      type: 'LOGIN_USER',
      user: mockUser
    }
    expect(result).toEqual(expected);
  });

  it('should return the correct action object for the action type - logoutUser', () => {
    const result = logoutUser()
    const expected = {
      type: 'LOGOUT_USER'
    }
    expect(result).toEqual(expected);
  });

  it('should return the correct action object for the action type - getTheFavorites', () => {
    const mockAlbumData = {artist: 'Band', album: "Album"}
    const result = getTheFavorites(mockAlbumData);
    const expected = {
      type: 'GET_FAVORITES',
      favorites: mockAlbumData
    }
    expect(result).toEqual(expected);
  });

  it('should return the correct action object for the action type - handleAdd', () => {
    const mockAlbumData = { artist: 'Band', album: "Album" }
    const result = handleAdd(mockAlbumData);
    const expected = {
      type: 'HANDLE_ADD',
      albumData : mockAlbumData
    }
    expect(result).toEqual(expected);
  });

  it('should return the correct action object for the action type - handleDelete', () => {
    const mockAlbumData = { artist: 'Band', album: "Album" }
    const result = handleDelete(mockAlbumData);
    const expected = {
      type: 'HANDLE_DELETE',
      albumData: mockAlbumData
    }
    expect(result).toEqual(expected);
  });
});