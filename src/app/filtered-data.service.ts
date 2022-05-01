import { Injectable } from '@angular/core';
import { AthleteEntry } from './models/athlete-entry';

@Injectable({
  providedIn: 'root'
})
export class FilteredDataService {

  private _filteredAthleteEntriesList: AthleteEntry[] = [];
  public get filteredAthleteEntriesList(): AthleteEntry[] {
    return this._filteredAthleteEntriesList;
  }
  public set filteredAthleteEntriesList(v: AthleteEntry[]) {
    this._filteredAthleteEntriesList = v;
  }

  private _filteredCountriesList: string[] = [];
  public get displayedCountries(): string[] {
    return this._filteredCountriesList;
  }
  public set displayedCountries(v: string[]) {
    this._filteredCountriesList = v;
  }

  private _filteredPersonsList: string[] = [];
  public get displayedPersons(): string[] {
    return this._filteredPersonsList;
  }
  public set displayedPersons(v: string[]) {
    this._filteredPersonsList = v;
  }

  constructor() { }
}
