import { makeAutoObservable, runInAction } from 'mobx';
import { Character, Info } from '../types/api';

class CharactersStore {
  characters: Character[] | null = null;
  isLoading = false;
  error: string | null = null;
  pages?: number;
  initCharacters: Character[] | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getCharacters = async (page: number | string | null, name: string | null = null) => {
    try {
      const baseUrl = new URL('https://rickandmortyapi.com/api/character/');

      if (name) baseUrl.searchParams.set('name', name);
      if (page) baseUrl.searchParams.set('page', page.toString());

      this.error = null;
      this.isLoading = true;

      const response: Response = await fetch(baseUrl.toString());
      const characters: Info<Character[]> = await response.json();

      if (!response.ok) {
        runInAction(() => {
          this.isLoading = false;
          if (response.status === 404) return (this.error = 'Character not exist');
          this.error = 'Ops, we have an error';
        });
        return;
      }

      runInAction(() => {
        if (characters.info) this.pages = characters.info.pages;
        if (characters.results) {
          this.characters = characters.results;
          if (!this.initCharacters) this.initCharacters = characters.results;
        }
        this.isLoading = false;
      });
    } catch (error) {
      this.isLoading = false;
      if (error instanceof TypeError) this.error = error.message;
      else this.error = 'Oops! We have an Error.';
    }
  };
}

export default new CharactersStore();
