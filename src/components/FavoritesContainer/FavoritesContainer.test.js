import React from 'react';
import { shallow } from 'enzyme'
import { FavoritesContainer } from './FavoritesContainer';

describe('FavoritesContainer', () => {
  let wrapper;
  beforeEach(() => {
    const mockAlbums = [{}]
    const mockFavorites = [{}]
    const mockHandleFavorites = jest.fn();

    wrapper = shallow(<FavoritesContainer 
      albums={mockAlbums}
      favorites={mockFavorites}
      handleFavorites={mockHandleFavorites}
    />)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})