import { CsvService } from './csv.service';
import { Injectable, OnInit } from '@angular/core';
import { AthleteEntry } from './models/athlete-entry';

@Injectable({
  providedIn: 'root'
})
export class DataFilterService {
  private _filteredAthleteEntriesList: AthleteEntry[];

  constructor(private csvService: CsvService) {
    this._filteredAthleteEntriesList = csvService.filteredAthleteEntriesList;
  }

  //Gaat nog niet werken, want data in csvService kan misschien nog niet ingeladen zijn op moment dat gefilterd wordt.
  search(searchText: string) {
    if (searchText !== "") {
      this._filteredAthleteEntriesList = this.csvService.athleteEntries.filter(contact => {
        return contact.name.toLowerCase().includes(searchText.toLowerCase());
      });
    } else {
      this._filteredAthleteEntriesList = this.csvService.athleteEntries;
    }
  }
}
