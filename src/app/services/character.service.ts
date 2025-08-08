import { Injectable, signal } from '@angular/core';
import { Character } from '../models/character';
import charactersData from '../data/characters.json';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private readonly _characters = signal<Character[]>(charactersData);

  public readonly characters = this._characters.asReadonly();
}
