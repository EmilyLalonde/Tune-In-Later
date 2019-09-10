import React from "react";
import { shallow, mount } from "enzyme";
import { App } from "./App";
import { MemoryRouter } from "react-router";
import Nav from "../Nav/Nav";
import WelcomeContainer from "../WelcomeContainer/WelcomeContainer";
import FavoritesContainer from "../FavoritesContainer/FavoritesContainer";
import LoginForm from '../LoginForm/LoginForm';
import Album from '../Album/Album'
import CreateUserForm from '../CreateUserForm/CreateUserForm'

describe("App", () => {
  let wrapper;
  let newWrapper;
  beforeEach(() => {
    const mockGetAlbums = jest.fn();
    const mockCreateUser = jest.fn();
    const mockLoginUser = jest.fn();
    const mockAddToFavorites = jest.fn();
    const mockGetFavorites = jest.fn();
    const mockDeleteFavorite = jest.fn();

    wrapper = shallow(
      <App
        getAlbums={mockGetAlbums}
        createUser={mockCreateUser}
        loginUser={mockLoginUser}
        addToFavorites={mockAddToFavorites}
        getFavorites={mockGetFavorites}
        deleteFavorite={mockDeleteFavorite}
      />
    );
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("App Routes", () => {
  let wrapper;

  it("will make a Login Form when App is called", () => {
    wrapper = mount(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(LoginForm)).toHaveLength(1);
    expect(wrapper.find(Album)).toHaveLength(0);
    expect(wrapper.find(CreateUserForm)).toHaveLength(0);
    expect(wrapper.find(FavoritesContainer)).toHaveLength(0);
    expect(wrapper.find(WelcomeContainer)).toHaveLength(0);
  });
  
  it("will make a Create User Form when Create User is called", () => {
    wrapper = mount(
      <MemoryRouter initialEntries={["/create-user"]}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(CreateUserForm)).toHaveLength(1);
    expect(wrapper.find(Album)).toHaveLength(0);
    expect(wrapper.find(LoginForm)).toHaveLength(0);
    expect(wrapper.find(FavoritesContainer)).toHaveLength(0);
    expect(wrapper.find(WelcomeContainer)).toHaveLength(0);
  });

  it("will make a Favorites when Favorites is called", () => {
    const store = {favorites: []}

    wrapper = shallow(<FavoritesContainer store={store}/>).dive()
    // newWrapper = shallow(
    //   <MemoryRouter initialEntries={["/favorites"]}>
    //     <FavoritesContainer />
    //   </MemoryRouter>
    // );
    expect(newWrapper.find(CreateUserForm)).toHaveLength(0);
    expect(newWrapper.find(Album)).toHaveLength(0);
    expect(newWrapper.find(LoginForm)).toHaveLength(0);
    expect(newWrapper.find(FavoritesContainer)).toHaveLength(1);
    expect(newWrapper.find(WelcomeContainer)).toHaveLength(0);
  });
});
