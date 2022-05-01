import { Injectable } from '@angular/core';
import { AthleteEntry } from './models/athlete-entry';
import { ReplaySubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FilteredDataService {

  //Subscriptions waarop components zich kunnen subscriben om op de hoogte gebracht te worden van dataveranderingen.
  private _filteredAthletesSubject: ReplaySubject<AthleteEntry[]> = new ReplaySubject<AthleteEntry[]>(1);
  public get filteredAthletesSubject(): ReplaySubject<AthleteEntry[]> {
    return this._filteredAthletesSubject;
  }

  private _filteredCountriesSubject: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  public get filteredCountriesSubject(): ReplaySubject<string[]>  {
    return this._filteredCountriesSubject;
  }

  private _filteredPersonsSubject: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  public get filteredPersonsSubject(): ReplaySubject<string[]> {
    return this._filteredPersonsSubject;
  }


  //Methodes om nieuwe DataWaarden te publishen zodat de components die op de subscriptions gesubscribed zijn geupdatet worden.
  public publishFilteredAthletes(athletes: AthleteEntry[]) {
    this._filteredAthletesSubject.next(athletes);
  }

  public publishFilteredCountries(countries: string[]) {
    this._filteredCountriesSubject.next(countries);
  }

  public publishFilteredPersons(persons: string[]) {
    this.filteredPersonsSubject.next(persons);
  }

  constructor() { }
}
