import { makeAutoObservable, runInAction } from 'mobx';
import { APIError, Character } from '../types/api';

class CharacterStore {
  character: Character | null = null;
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getCharacter = async (id: number) => {
    try {
      this.error = null;
      this.isLoading = true;
      const response: Response = await fetch('https://rickandmortyapi.com/api/character/' + id);

      if (!response.ok) {
        const apiError: APIError = await response.json();
        runInAction(() => {
          this.error = apiError.error;
          this.isLoading = false;
        });
        return;
      }

      const character: Character = await response.json();
      runInAction(() => {
        this.character = character;
        this.isLoading = false;
      });
    } catch (error) {
      this.isLoading = false;
      if (error instanceof TypeError) this.error = error.message;
      else this.error = 'Oops! We have an Error.';
    }
  };

  clearCharacter = () => {
    this.character = null;
  };
}

export default new CharacterStore();
