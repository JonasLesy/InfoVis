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
  
  countriesToFilterOn: string[] = [];
  peopleToFilterOn: string[] = [];
  medalData: number[] = [];


  constructor(public dataFilterService: DataFilterService) {
    this.buildDisplayedItems();
  }

  ngOnInit(): void {
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

  private buildDisplayedItems() {
    this.dataFilterService.buildDisplayedItems();
    this.setMedalsData();
  }

  private setMedalsData() {
    const countOccurrences = (arr, val) => arr.reduce((a, v) => (v.medal === val ? a + 1 : a), 0);
    let goldCount = countOccurrences(this.dataFilterService.filteredAthleteEntriesList, "Gold");
    //console.log('gold count is ' + goldCount);
    let silverCount = countOccurrences(this.dataFilterService.filteredAthleteEntriesList, "Silver");
    //console.log('silver count is ' + silverCount);
    let bronzeCount = countOccurrences(this.dataFilterService.filteredAthleteEntriesList, "Bronze");
    //console.log('bronze count is ' + bronzeCount);
    this.medalData = [goldCount, silverCount, bronzeCount];
    //console.log('done medals');
  }

}

