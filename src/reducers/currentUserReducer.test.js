 import { currentUserReducer } from '../reducers/currentUser';

describe('currentUserReducer', () => {

  let mockState, mockUser;
  beforeEach(() => {
    mockState = null;
    mockUser = {id: 3, name: 'User Name1', email: 'user@email.com'}
  })

  it('should return the right version of state from reducer - login user', () => {
    const mockAction = {
      type: 'LOGIN_USER',
      user: mockUser
    }
    const result = currentUserReducer(mockState, mockAction);
    const expected = mockUser;
    expect(result).toEqual(expected)
  });

  it('should return the right version of state from reducer - logout user', () => {
    const mockAction = {
      type: 'LOGOUT_USER',
      user: mockUser
    }
    const result = currentUserReducer(mockState, mockAction);
    const expected = null;
    expect(result).toEqual(expected)
  });

  it('should return the right version of state from reducer - create user', () => {
    const mockAction = {
      type: 'CREATE_USER',
      user: mockUser
    }
    const result = currentUserReducer(mockState, mockAction);
    const expected = mockUser;
    expect(result).toEqual(expected)
  });

  it('should return the right version of state from reducer - bad action name', () => {
    const mockAction = {
      type: 'BAD_ACTION',
      user: mockUser
    }
    const result = currentUserReducer(undefined, mockAction);
    const expected = null;
    expect(result).toEqual(expected)
  });

});