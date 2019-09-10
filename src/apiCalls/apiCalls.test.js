import React from "react";
import { shallow } from "enzyme";
import {
  getAlbums,
  getArtistAlbums,
  loginUser,
  createUser,
  addToFavorites,
  deleteFavorite,
  getFavorites
} from "./apiCalls";

describe("getAlbums", () => {
  let mockResponse;
  const mockAlbumId = 1071;

  beforeEach(() => {
    mockResponse = [
      {
        artistId: 4022281,
        artistName: "Rick Ross",
        artworkUrl100:
          "https://is2-ssl.mzstatic.com/image/thumb/Music128/v4/a8/fc/39/a8fc39b7-3c90-9c5b-5b58-cc6a460662c4/source/100x100bb.jpg",
        collectionId: 1440784451,
        collectionName: "Teflon Don",
        releaseDate: "2010-07-20"
      }
    ];
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });
    });
  });

  it("should call fetch with the correct url", () => {
    getAlbums(mockAlbumId);
    expect(window.fetch).toHaveBeenCalledWith(
      `https://itunes.apple.com/search?term=music&genreId=${mockAlbumId}&limit=5`
    );
  });

  it("should return an array of albums", () => {
    expect(getAlbums(mockAlbumId)).resolves.toEqual(mockResponse);
  });

  it("should return an error if response is not okay", () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      });
    });
    expect(getAlbums(mockAlbumId)).rejects.toEqual(
      Error("There was an error getting your albums")
    );
  });

  it("should return an error if the promise rejects", () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject({
        message: "Server is down."
      });
    });
    expect(getAlbums(mockAlbumId)).rejects.toEqual({
      message: "Server is down."
    });
  });
});

describe("getArtistAlbums", () => {
  let mockResponse;
  const mockArtist = "Rick Ross";

  beforeEach(() => {
    mockResponse = [
      {
        artistId: 4022281,
        artistName: "Rick Ross",
        artworkUrl100:
          "https://is2-ssl.mzstatic.com/image/thumb/Music128/v4/a8/fc/39/a8fc39b7-3c90-9c5b-5b58-cc6a460662c4/source/100x100bb.jpg",
        collectionId: 1440784451,
        collectionName: "Teflon Don",
        releaseDate: "2010-07-20"
      }
    ];
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });
    });

    it("should be called with the correct url", () => {
      getArtistAlbums(mockArtist);
      expect(window.fetch).toHaveBeenCalledWith(
        `https://itunes.apple.com/search?term=music&term=${mockArtist}&limit=12`
      );
    });

    it("should return an array of the search artists albums", () => {
      expect(getArtistAlbums(mockArtist)).resolves.toEqual(mockResponse);
    });

    it("should return an error if response is not okay", () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });

      expect(getAlbums(mockArtist)).rejects.toEqual(
        Error("There was an error getting your albums")
      );
    });

    it("should return an error if the promise rejects", () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject({
          message: "Server is down."
        });
      });
      expect(getAlbums(mockArtist)).rejects.toEqual({
        message: "Server is down."
      });
    });
  });
});

describe("loginUser", () => {
  let mockUser;

  beforeEach(() => {
    mockUser = {
      id: 1,
      name: "Emily",
      email: "emily@isawesome.com"
    };

    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(1)
      });
    });
  });

  it("should call fetch with the correct url", () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...mockUser })
    };
    loginUser(mockUser);
    expect(window.fetch).toHaveBeenCalledWith(
      "http://localhost:3001/api/v1/login/",
      options
    );
  });

  it('should return the id of the person being logged in', () => {
    expect(loginUser(mockUser)).resolves.toEqual(1)
  })

  it('should return an error if the promise resolves but the property ok isnt true', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      })
    })
    expect(loginUser(mockUser)).rejects.toEqual(Error('Email and passwords do not match'))
  })

  it('should return an error if the server is down', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('fetch failed'))
    })
    expect(loginUser(mockUser)).rejects.toEqual(Error('fetch failed'))
  })
});

describe("createUser", () => {
  let mockNewUser;

  beforeEach(() => {
    mockNewUser = {
      id: 1,
      name: "Emily",
      email: "emily@isawesome.com"
    };

    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(1)
      });
    });
  });

  it("should call fetch with the correct url", () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...mockNewUser })
    };
    createUser(mockNewUser);
    expect(window.fetch).toHaveBeenCalledWith(
      "http://localhost:3001/api/v1/users/",
      options
    );
  });

  it('should return the id of the user created', () => {
    expect(createUser(mockNewUser)).resolves.toEqual(1)
  })

  it('should return an error if the promise resolves but the property ok isnt true', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      })
    })
    expect(createUser(mockNewUser)).rejects.toEqual(Error('Email has already been used'))
  })

  it('should return an error if the server is down', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('fetch failed'))
    })
    expect(createUser(mockNewUser)).rejects.toEqual(Error('fetch failed'))
  })
});

describe("addToFavorites", () => {
  let mockFavorites;
  let mockId;

  beforeEach(() => {
    mockFavorites = [
      {
        artistId: 4022281,
        artistName: "Rick Ross",
        artworkUrl100:
          "https://is2-ssl.mzstatic.com/image/thumb/Music128/v4/a8/fc/39/a8fc39b7-3c90-9c5b-5b58-cc6a460662c4/source/100x100bb.jpg",
        collectionId: 1440784451,
        collectionName: "Teflon Don",
        releaseDate: "2010-07-20"
      }
    ];

    mockId = 1

    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(1)
      });
    });
  });

  it("should call fetch with the correct url", () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...mockFavorites })
    };
    addToFavorites(mockFavorites, mockId);
    expect(window.fetch).toHaveBeenCalledWith(
      `http://localhost:3001/api/v1/users/${mockId}/albumfavorites/`,
      options
    );
  });

  it('should add a new album to the favorites array', () => {
    expect(addToFavorites(mockFavorites, mockId)).resolves.toEqual(1)
  })

  it('should return an error if the promise resolves but the property ok isnt true', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      })
    })
    expect(addToFavorites(mockFavorites, mockId)).rejects.toEqual(Error('There was an error saving your favorites'))
  })

  it('should return an error if the server is down', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('fetch failed'))
    })
    expect(addToFavorites(mockFavorites, mockId)).rejects.toEqual(Error('fetch failed'))
  })
});

describe("getFavorites", () => {
  let mockResponse;
  let mockId;

  beforeEach(() => {
    mockResponse = [
      {
        artistId: 4022281,
        artistName: "Rick Ross",
        artworkUrl100:
          "https://is2-ssl.mzstatic.com/image/thumb/Music128/v4/a8/fc/39/a8fc39b7-3c90-9c5b-5b58-cc6a460662c4/source/100x100bb.jpg",
        collectionId: 1440784451,
        collectionName: "Teflon Don",
        releaseDate: "2010-07-20"
      }
    ];

    mockId = 1

    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });
    });
  });

  it("should call fetch with the correct url", () => {
    getFavorites(mockId);
    expect(window.fetch).toHaveBeenCalledWith(
      `http://localhost:3001/api/v1/users/${mockId.mockId}/albumfavorites/`
    );
  });

  it("should return an array of favorited albums for the current user", () => {
    expect(getFavorites(mockId)).resolves.toEqual(mockResponse);
  });

  it("should return an error if response is not okay", () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      });
    });
    expect(getFavorites(mockId)).rejects.toEqual(
      Error("There was an error saving your favorites")
    );
  });

  it("should return an error if the promise rejects", () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject({
        message: "Server is down."
      });
    });
    expect(getFavorites(mockId)).rejects.toEqual({
      message: "Server is down."
    });
  });
});

describe("deleteFavorite", () => {
  let mockId = 1
  let mockAlbumId = 1043

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(1)
      });
    });
  })

  it('should call fetch with the correct url', () => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    };
    deleteFavorite(mockAlbumId, mockId);
    expect(window.fetch).toHaveBeenCalledWith(
      `http://localhost:3001/api/v1/users/${mockId}/albumfavorites/${mockAlbumId}`,
      options
    );
  })
  it('should return an error if the promise resolves but the property ok isnt true', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      })
    })
    expect(deleteFavorite(mockAlbumId, mockId)).rejects.toEqual(Error('There was an error deleting the favorite'))
  })

  it('should return an error if the server is down', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('fetch failed'))
    })
    expect(deleteFavorite(mockAlbumId, mockId)).rejects.toEqual(Error('fetch failed'))
  })
});