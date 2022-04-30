import { CsvService } from './csv.service';
import { Injectable } from '@angular/core';
import { AthleteEntry } from './models/athlete-entry';
import { CsvData } from './models/csv-data';

@Injectable({
  providedIn: 'root'
})
export class DataFilterService {
  private _csvData: CsvData;
  private _countriesToFilterOn: string[] = [];
  private _peopleToFilterOn: string[] = [];



  private _filteredAthleteEntriesList: AthleteEntry[];
  public get filteredAthleteEntriesList(): AthleteEntry[] {
    return this._filteredAthleteEntriesList;
  }

  private _countrySuggestions: string[];
  public get countrySuggestions(): string[] {
    return this._countrySuggestions;
  }

  private _peopleSuggestions: string[];
  public get peopleSuggestions(): string[] {
    return this._peopleSuggestions;
  }

  constructor(private csvService: CsvService) {
    csvService.loadCsvData().subscribe(
      (csvData) => {
        this._csvData = csvData; 
        this._filteredAthleteEntriesList = this._csvData.athleteEntries;
      });
  }

  //Gaat nog niet werken, want data in csvService kan misschien nog niet ingeladen zijn op moment dat gefilterd wordt.
  search(searchText: string): void {
    if (searchText !== "") {
      this._filteredAthleteEntriesList = this._csvData.athleteEntries.filter(contact => {
        return contact.name.toLowerCase().includes(searchText.toLowerCase());
      });
    } else {
      this._filteredAthleteEntriesList = this._csvData.athleteEntries;
    }
  }

  searchCountry(searchText: string): void {
    let nocsFiltered = this._csvData.nocRegionEntries.filter(nocEntry => {
      return nocEntry.region.toLowerCase().includes(searchText.toLowerCase());
    });
    this._countrySuggestions = nocsFiltered.map(nocEntry => nocEntry.region);
  }

  searchPerson(searchText: string): void {
    this._peopleSuggestions = this._csvData.persons.filter(person => { return person.toLowerCase().includes(searchText.toLowerCase()) });
  }

  filterOnAllAttributes() {
    console.log('Filtering on attributes..');
    this._filteredAthleteEntriesList = this._csvData.athleteEntries.filter(athleteEntry => {
      // Only add the entry if the selected countries match the athlete
      if (this._countriesToFilterOn.length != 0 && !this.athleteBelongsToListOfCountries(athleteEntry, this._countriesToFilterOn)) {
        return false;
      }
      if (this._peopleToFilterOn.length != 0 && !this._peopleToFilterOn.includes(athleteEntry.name)) {
        return false;
      }
      return true;
    });
    console.log('done');
  }

  private athleteBelongsToListOfCountries(athleteEntry, countriesToFilterOn): boolean {
    return countriesToFilterOn.includes(this.getRegionForNoc(athleteEntry.noc));
  }

  private getRegionForNoc(nocToLookFor): string {
    let nocEntry = this._csvData.nocRegionEntries.find(item => item.noc === nocToLookFor);
    return nocEntry !== undefined ? nocEntry.region : "";
  }
}
