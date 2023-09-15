import { create } from 'zustand';

export const useStore = create((set) => ({
  sort: false,
  likedCharacters: [],
  changeSort: () =>
    set((state) => ({
      sort: !state.sort
    })),
  addFavouriteCharacter: (name, id) =>
    set((state) => ({
      likedCharacters: [...state.likedCharacters, { name, id }]
    })),
  deleteFavouriteCharacter: (name) =>
    set((state) => ({
      likedCharacters: state.likedCharacters.filter((object) => object.name !== name)
    }))
}));
