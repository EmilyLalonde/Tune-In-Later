import { favoriteReducer } from '../reducers/favorites';

describe('favoriteReducer', () => {

  let mockState, mockAlbumData;
  beforeEach(() => {
    mockState = [];
    mockAlbumData = {artist: 'Band', title: 'Album Name', id: 1234}
  })

  it('should return the right version of state from reducer - handle add', () => {
    const mockAction = {
      type: 'HANDLE_ADD',
      albumData: mockAlbumData
    }
    const result = favoriteReducer(mockState, mockAction);
    const expected = [mockAlbumData];
    expect(result).toEqual(expected)
  });

  it('should return the right version of state from reducer - handle delete', () => {
    const mockAction = {
      type: 'HANDLE_DELETE',
      albumData: mockAlbumData
    }
    const result = favoriteReducer(mockState, mockAction);
    const expected = [];
    expect(result).toEqual(expected)
  });

  it('should return the right version of state from reducer - get favorites', () => {
    const mockAction = {
      type: 'GET_FAVORITES',
      albumData: mockState
    }
    const result = favoriteReducer(mockState, mockAction);
    const expected = mockState;
    expect(result).toEqual(expected)
  });

  it('should return the right version of state from reducer - bad action name', () => {
    const mockAction = {
      type: 'BAD_ACTION',
      albumData: mockAlbumData
    }
    const result = favoriteReducer(undefined, mockAction);
    const expected = [];
    expect(result).toEqual(expected)
  });

});