import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { AthleteEntry } from 'src/models/athlete-entry';
import { Athlete } from 'src/models/athlete';


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

  private _selectedAthleteSubject: ReplaySubject<Athlete> = new ReplaySubject<Athlete>(1);
  public get selectedAthleteSubject(): ReplaySubject<Athlete> {
    return this._selectedAthleteSubject;
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

  public publishSelectedAthlete(selectedAthlete: Athlete) {
    this.selectedAthleteSubject.next(selectedAthlete);
  }

  constructor() { }
}
