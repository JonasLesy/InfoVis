import { DataFilterService } from './data-filter.service';
import { CsvService } from './csv.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AthleteEntry } from './models/athlete-entry';
import { NOCRegionEntry } from './models/noc-region-entry';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  /*
  BASIC STRUCTURE OF THE CODE:
    - load datasets & keep them in original variable, not to be altered
    - initialize filters
    - on change of filter (addition or deletion of filter-value): run filterOnAllAttributes
  
  */
  title = 'InfoVis project';
  searchText: string = '';

  // Original data lists

  // Filters / filtered values
  countriesToFilterOn: string[] = [];
  peopleToFilterOn: string[] = [];

  // Variables for visual filtering (autocomplete / suggestions)
  // countrySuggestions: string[];
  peopleSuggestions: string[];
  medalData: number[] = [];


  constructor(public csvService: CsvService, private dataFilterService: DataFilterService) {

  }

  ngOnInit(): void {
    this.csvService.loadCsvData();
    this.setMedalsData();
  }

  search() {
    this.dataFilterService.search(this.searchText);
  }

  searchCountry(event) {
    this.dataFilterService.searchCountry(event.query);
  }

  searchPerson(event) {
    this.dataFilterService.searchPerson(event.query);
  }

  filterOnAllAttributes() {
    this.dataFilterService.filterOnAllAttributes();
    this.buildDisplayedItems();
    console.log('done');
  }

  buildDisplayedItems() {
    let countrySet = new Set<string>();
    let personSet = new Set<string>();
    this.csvService.filteredAthleteEntriesList.forEach(athleteEntry => {
      countrySet.add(this.getRegionForNoc(athleteEntry.noc));
      personSet.add(athleteEntry.name);
    });
    this.countries = [...countrySet];
    this.persons = [...personSet];
    this.setMedalsData();
  }

  // This method returns false if the given athleteEntry does not belong to the list of countries given
  // athleteBelongsToListOfCountries(athleteEntry, countriesToFilterOn) {
  //   return countriesToFilterOn.includes(this.getRegionForNoc(athleteEntry.noc));
  // }

  // getRegionForNoc(nocToLookFor) {
  //   let nocEntry = this.csvService.nocEntries.find(item => item.noc === nocToLookFor);
  //   return nocEntry !== undefined ? nocEntry.region : "";
  // }

  setMedalsData() {
    const countOccurrences = (arr, val) => arr.reduce((a, v) => (v.medal === val ? a + 1 : a), 0);
    let goldCount = countOccurrences(this.csvService.filteredAthleteEntriesList, "Gold");
    //console.log('gold count is ' + goldCount);
    let silverCount = countOccurrences(this.csvService.filteredAthleteEntriesList, "Silver");
    //console.log('silver count is ' + silverCount);
    let bronzeCount = countOccurrences(this.csvService.filteredAthleteEntriesList, "Bronze");
    //console.log('bronze count is ' + bronzeCount);
    this.medalData = [goldCount, silverCount, bronzeCount];
    //console.log('done medals');
  }

}

