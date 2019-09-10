import React from 'react';
import { shallow } from 'enzyme'
import Nav from './Nav';

describe('Nav', () => {

  let wrapper;
  beforeEach(() => {
  const mockCurrentUser = {id: 1, name: 'Joe Tester', email: 'joe@email.com'};
  const mockLogoutUser = jest.fn();

    wrapper = shallow(<Nav 
      currentUser={mockCurrentUser}
      handleLogout={mockLogoutUser}
    />)
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
})