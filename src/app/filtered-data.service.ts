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
  private _filteredAthleteEntriesSubject: ReplaySubject<AthleteEntry[]> = new ReplaySubject<AthleteEntry[]>(1);
  public get filteredAthleteEntriesSubject(): ReplaySubject<AthleteEntry[]> {
    return this._filteredAthleteEntriesSubject;
  }

  private _chosenEditionSubject: ReplaySubject<string> = new ReplaySubject<string>(1);
  public get chosenEditionSubject(): ReplaySubject<string> {
    return this._chosenEditionSubject;
  }

  private _chosenSexSubject: ReplaySubject<string> = new ReplaySubject<string>(1);
  public get chosenSexSubject(): ReplaySubject<string> {
    return this._chosenSexSubject;
  }

  private _filteredAthletesSubject: ReplaySubject<Athlete[]> = new ReplaySubject<Athlete[]>(1);
  public get filteredAthletesSubject(): ReplaySubject<Athlete[]> {
    return this._filteredAthletesSubject;
  }

  //Dit zijn de AthleteEntries van de GESELECTEERDE athleet die voldoen aan de gekozen filters.
  private _selectedFilteredAthleteEntriesSubject: ReplaySubject<AthleteEntry[]> = new ReplaySubject<AthleteEntry[]>(1);
  public get selectedFilteredAthleteEntriesSubject(): ReplaySubject<AthleteEntry[]> {
    return this._selectedFilteredAthleteEntriesSubject;
  }

  private _filteredCountriesSubject: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  public get filteredCountriesSubject(): ReplaySubject<string[]> {
    return this._filteredCountriesSubject;
  }

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
  public publishFilteredAthleteEntries(athletes: AthleteEntry[]) {
    this._filteredAthleteEntriesSubject.next(athletes);
  }

  public publishFilteredAthletes(athletes: Athlete[]) {
    this._filteredAthletesSubject.next(athletes);
  }

  public publishSelectedFilteredAthleteEntries(selectedFilteredAthletes: AthleteEntry[]) {
    this._selectedFilteredAthleteEntriesSubject.next(selectedFilteredAthletes);
  }

  public publishSelectedAthlete(selectedAthlete: Athlete) {
    this._selectedAthleteSubject.next(selectedAthlete);
  }

  public publishFilteredDisciplines(disciplines: DisciplineEntry[]) {
    this._filteredDisciplinesSubject.next(disciplines);
  }

  public publishSelectedDiscipline(discipline: DisciplineEntry) {
    this._selectedDisciplinesSubject.next(discipline);
  }

  public publishfilteredCountries(countries: string[]) {
    this._filteredCountriesSubject.next(countries);
  }

  public publishChosenEdition(chosenEdition: string) {
    this._chosenEditionSubject.next(chosenEdition)
  }

  public publishChosenSex(chosenSex: string) {
    this._chosenSexSubject.next(chosenSex)
  }

  constructor() { }
}
