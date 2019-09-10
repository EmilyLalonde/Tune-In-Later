import React from 'react';
import { shallow } from 'enzyme'
import { WelcomeContainer } from './WelcomeContainer';

describe('WelcomeContainer', () => {
  let wrapper;
  beforeEach(() => {
    const mockAlbums = [{}]
    const mockFavorites = [{}]
    const mockHandleFavorites = jest.fn();

    wrapper = shallow(<WelcomeContainer
      albums={mockAlbums}
      favorites={mockFavorites}
      handleFavorites={mockHandleFavorites}
    />)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})