import { FilteredDataService } from './filtered-data.service';
import { CsvService } from './csv.service';
import { Injectable } from '@angular/core';
import { AthleteEntry } from './models/athlete-entry';
import { CsvData } from './models/csv-data';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private _originalCsvData: CsvData;

  //Blijft in filter.service.ts------------------------------------------
  private _countrySuggestions: string[] = [];
  public get countrySuggestions(): string[] {
    return this._countrySuggestions;
  }

  private _peopleSuggestions: string[] = [];
  public get peopleSuggestions(): string[] {
    return this._peopleSuggestions;
  }
 
  private _countriesToFilterOn : string[] = [];
  public get countriesToFilterOn() : string[] {
    return this._countriesToFilterOn;
  }
  public set countriesToFilterOn(v : string[]) {
    this._countriesToFilterOn = v;
  }
  
  private _peopleToFilterOn : string[] = [];
  public get peopleToFilterOn() : string[] {
    return this._peopleToFilterOn;
  }
  public set peopleToFilterOn(v : string[]) {
    this._peopleToFilterOn = v;
  }

  constructor(private csvService: CsvService, private filteredDataService: FilteredDataService) {
    csvService.loadCsvData().subscribe(
      (csvData) => {
        this._originalCsvData = csvData; 
        this.filteredDataService.filteredAthleteEntriesList = this._originalCsvData.athleteEntries;
      });
  }

  //Gaat nog niet werken, want data in csvService kan misschien nog niet ingeladen zijn op moment dat gefilterd wordt.
  search(searchText: string): void {
    if (searchText !== "") {
      this.filteredDataService.filteredAthleteEntriesList = this._originalCsvData.athleteEntries.filter(contact => {
        return contact.name.toLowerCase().includes(searchText.toLowerCase());
      });
    } else {
      this.filteredDataService.filteredAthleteEntriesList = this._originalCsvData.athleteEntries;
    }
  }

  searchCountry(searchText: string): void {
    let nocsFiltered = this._originalCsvData.nocRegionEntries.filter(nocEntry => {
      return nocEntry.region.toLowerCase().includes(searchText.toLowerCase());
    });
    this._countrySuggestions = nocsFiltered.map(nocEntry => nocEntry.region);
  }

  searchPerson(searchText: string): void {
    this._peopleSuggestions = this._originalCsvData.persons.filter(person => 
      { 
        let nameParts = person.toLowerCase().split(' ');
        let result = false;
        for(let i = 0; i < nameParts.length; i++) {
          let namePart = nameParts[i];
          if (namePart.startsWith(searchText)) {
            result = true;
            break;
          }
        }
        return result;
      });
  }

  filterOnAllAttributes() {
    console.log('Filtering on attributes..');
    this.filteredDataService.filteredAthleteEntriesList = this._originalCsvData.athleteEntries.filter(athleteEntry => {
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

  buildDisplayedItems() {
    let countrySet = new Set<string>();
    let personSet = new Set<string>();
    this.filteredDataService.filteredAthleteEntriesList.forEach(athleteEntry => {
      countrySet.add(this.getRegionForNoc(athleteEntry.noc));
      personSet.add(athleteEntry.name);
    });
    this.filteredDataService.displayedCountries = [...countrySet];
    this.filteredDataService.displayedPersons = [...personSet];
  }

  private athleteBelongsToListOfCountries(athleteEntry, countriesToFilterOn): boolean {
    return countriesToFilterOn.includes(this.getRegionForNoc(athleteEntry.noc));
  }

  private getRegionForNoc(nocToLookFor): string {
    let nocEntry = this._originalCsvData.nocRegionEntries.find(item => item.noc === nocToLookFor);
    return nocEntry !== undefined ? nocEntry.region : "";
  }

  
}
