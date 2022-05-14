import { NOCRegionEntry } from 'src/models/noc-region-entry';
import { DisciplineEntry } from './../models/discipline-entry';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { AthleteEntry } from 'src/models/athlete-entry';
import { Athlete } from 'src/models/athlete';


@Injectable({
  providedIn: 'root'
})
export class FilteredDataService {

  //Subscriptions waarop components zich kunnen subscriben om op de hoogte gebracht te worden van dataveranderingen.

  // Dit zijn ALLE AthleteEntries die voldoen aan de gekozen filters (voor alle Athleten dus)
  private _filteredAthletesSubject: ReplaySubject<AthleteEntry[]> = new ReplaySubject<AthleteEntry[]>(1);
  public get filteredAthletesSubject(): ReplaySubject<AthleteEntry[]> {
    return this._filteredAthletesSubject;
  }
  
  //Dit zijn de AthleteEntries van de GESELECTEERDE athleet die voldoen aan de gekozen filters.
  private _selectedFilteredAthletesSubject: ReplaySubject<AthleteEntry[]> = new ReplaySubject<AthleteEntry[]>(1);
  public get selectedFilteredAthletesSubject(): ReplaySubject<AthleteEntry[]> {
    return this._selectedFilteredAthletesSubject;
  }
  

  // private _filteredCountriesSubject: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  // public get filteredCountriesSubject(): ReplaySubject<string[]>  {
  //   return this._filteredCountriesSubject;
  // }

  // private _filteredPersonsSubject: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  // public get filteredPersonsSubject(): ReplaySubject<string[]> {
  //   return this._filteredPersonsSubject;
  // }

  private _selectedAthleteSubject: ReplaySubject<Athlete> = new ReplaySubject<Athlete>(1);
  public get selectedAthleteSubject(): ReplaySubject<Athlete> {
    return this._selectedAthleteSubject;
  }

  private _filteredDisciplinesSubject: ReplaySubject<DisciplineEntry[]> = new ReplaySubject<DisciplineEntry[]>(1);
  public get filteredDisciplinesSubject(): ReplaySubject<DisciplineEntry[]> {
    return this._filteredDisciplinesSubject;
  }

  private _selectedDisciplinesSubject: ReplaySubject<DisciplineEntry> = new ReplaySubject<DisciplineEntry>(1);
  public get selectedDisciplinesSubject(): ReplaySubject<DisciplineEntry> {
    return this._selectedDisciplinesSubject;
  }

  private _filteredNOCRegions: ReplaySubject<NOCRegionEntry[]> = new ReplaySubject<NOCRegionEntry[]>(1);
  public get filteredNOCRegions(): ReplaySubject<NOCRegionEntry[]> {
    return this._filteredNOCRegions;
  }

  //Methodes om nieuwe DataWaarden te publishen zodat de components die op de subscriptions gesubscribed zijn geupdatet worden.
  public publishFilteredAthletes(athletes: AthleteEntry[]) {
    this._filteredAthletesSubject.next(athletes);
  }

  public publishSelectedFilteredAthletes(selectedFilteredAthletes: AthleteEntry[]) {
    this._selectedFilteredAthletesSubject.next(selectedFilteredAthletes);
  }

  // public publishFilteredCountries(countries: string[]) {
  //   this._filteredCountriesSubject.next(countries);
  // }

  // public publishFilteredPersons(persons: string[]) {
  //   this._filteredPersonsSubject.next(persons);
  // }

  public publishSelectedAthlete(selectedAthlete: Athlete) {
    this._selectedAthleteSubject.next(selectedAthlete);
  }

  public publishFilteredDisciplines(disciplines: DisciplineEntry[]) {
    this._filteredDisciplinesSubject.next(disciplines);
  }

  public publishSelectedDiscipline(discipline: DisciplineEntry) {
    this._selectedDisciplinesSubject.next(discipline);
  }

  public publishfilteredNOCRegions(nocRegions: NOCRegionEntry[]) {
    this.filteredNOCRegions.next(nocRegions);
  }

  constructor() { }
}
