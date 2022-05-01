import { FilteredDataService } from './filtered-data.service';
import { FilterService } from './filter.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  /*
  BASIC STRUCTURE OF THE CODE:
    - load datasets & keep them in original variable, not to be altered
    - initialize filters
    - on change of filter (addition or deletion of filter-value): run filterOnAllAttributes
  
  */
  title = 'InfoVis project';

  searchText: string = '';
  medalData: number[] = [];
  private _subscription;


  constructor(public filterService: FilterService, public filteredDataService: FilteredDataService) {
  }

  ngOnInit(): void {
    this.setMedalsData();
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  filterOnAllAttributes() {
    this.filterService.filterOnAllAttributes();
  }

  private setMedalsData() {
    const countOccurrences = (arr, val) => arr.reduce((a, v) => (v.medal === val ? a + 1 : a), 0);
    this._subscription = this.filteredDataService.filteredAthletesSubject.subscribe(
      fa => {
        let goldCount = countOccurrences(fa, "Gold");
        //console.log('gold count is ' + goldCount);
        let silverCount = countOccurrences(fa, "Silver");
        //console.log('silver count is ' + silverCount);
        let bronzeCount = countOccurrences(fa, "Bronze");
        this.medalData = [goldCount, silverCount, bronzeCount];
      }
    );
  }

}

