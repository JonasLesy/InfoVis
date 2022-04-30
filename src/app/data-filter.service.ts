import { CsvService } from './csv.service';
import { Injectable } from '@angular/core';
import { AthleteEntry } from './models/athlete-entry';

@Injectable({
  providedIn: 'root'
})
export class DataFilterService {
  private _filteredAthleteEntriesList: AthleteEntry[];
  private _countrySuggestions: string[];
  private _peopleSuggestions: string[];


  public get filteredAthleteEntriesList(): AthleteEntry[] {
    return this._filteredAthleteEntriesList;
  }

  public get countrySuggestions(): string[] {
    return this._countrySuggestions;
  }

  public get peopleSuggestions(): string[] {
    return this._peopleSuggestions;
  }

  constructor(private csvService: CsvService) {
    this._filteredAthleteEntriesList = csvService.filteredAthleteEntriesList;
  }

  //Gaat nog niet werken, want data in csvService kan misschien nog niet ingeladen zijn op moment dat gefilterd wordt.
  search(searchText: string): void {
    if (searchText !== "") {
      this._filteredAthleteEntriesList = this.csvService.athleteEntries.filter(contact => {
        return contact.name.toLowerCase().includes(searchText.toLowerCase());
      });
    } else {
      this._filteredAthleteEntriesList = this.csvService.athleteEntries;
    }
  }

  searchCountry(searchText: string): void {
    let nocsFiltered = this.csvService.nocEntries.filter(nocEntry => {
      return nocEntry.region.toLowerCase().includes(searchText.toLowerCase());
    });
    this._countrySuggestions = nocsFiltered.map(nocEntry => nocEntry.region);
  }

  searchPerson(searchText: string): void {
    this._peopleSuggestions = this.csvService.persons.filter(person => { return person.toLowerCase().includes(searchText.toLowerCase()) });
  }

  // filterOnAllAttributes() {
  //   console.log('Filtering on attributes..');
  //   this.filteredAthleteEntriesList = this.athleteEntries.filter(athleteEntry => {
  //     // Only add the entry if the selected countries match the athlete
  //     if (this.countriesToFilterOn.length != 0 && !this.athleteBelongsToListOfCountries(athleteEntry, this.countriesToFilterOn)) {
  //       return false;
  //     }
  //     if (this.peopleToFilterOn.length != 0 && !this.peopleToFilterOn.includes(athleteEntry.name)) {
  //       return false;
  //     }
  //     return true;
  //   });
  //   this.buildDisplayedItems();
  //   console.log('done');
  // }
}
