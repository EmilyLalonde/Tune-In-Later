import React from 'react';
import { shallow } from 'enzyme'
import { App } from './App';

describe('App', () => {

  let wrapper;
  beforeEach(() => {;
    const mockGetAlbums = jest.fn();
    const mockCreateUser = jest.fn();
    const mockLoginUser = jest.fn();
    const mockAddToFavorites = jest.fn();
    const mockGetFavorites = jest.fn();
    const mockDeleteFavorite = jest.fn();

    wrapper = shallow(<App 
      getAlbums={mockGetAlbums}
      createUser={mockCreateUser}
      loginUser={mockLoginUser}
      addToFavorites={mockAddToFavorites}
      getFavorites={mockGetFavorites}
      deleteFavorite={mockDeleteFavorite}
    />)
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  });
})
