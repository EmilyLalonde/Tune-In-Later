import React from 'react';
import { shallow } from 'enzyme'
import Album from './Album';

describe('Album', () => {

  let wrapper;
  beforeEach(() => {
    const mockAlbumData = { 
      "artistId": 4022281, 
      "artistName": "Rick Ross", 
      "artworkUrl100": "https://is2-ssl.mzstatic.com/image/thumb/Music128/v4/a8/fc/39/a8fc39b7-3c90-9c5b-5b58-cc6a460662c4/source/100x100bb.jpg",
      "collectionId": 1440784451, 
      "collectionName": "Teflon Don", 
      "releaseDate": "2010-07-20" };
    const mockHandleFavorite = jest.fn();
    const mockIsFav = true;

    wrapper = shallow(<Album 
      albumData={mockAlbumData}
      handleFavorite={mockHandleFavorite}
      isFav={mockIsFav}
    />)
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
})