import React from 'react';
import { shallow } from 'enzyme'
import CreateUserForm from './CreateUserForm';

describe('CreateUserForm', () => {

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CreateUserForm />)
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
})