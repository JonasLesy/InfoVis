import { DataFilterService } from './data-filter.service';
import { Component, OnInit } from '@angular/core';

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
  medalData: number[] = [];


  constructor(public dataFilterService: DataFilterService) {
  }

  ngOnInit(): void {
    this.buildDisplayedItems();
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

