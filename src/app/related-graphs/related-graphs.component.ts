import { AthleteEntry } from 'src/models/athlete-entry';
import { FilteredDataService } from './../filtered-data.service';
import { FilterService } from './../filter.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Athlete } from 'src/models/athlete';

@Component({
  selector: 'app-related-graphs',
  templateUrl: './related-graphs.component.html',
  styleUrls: ['./related-graphs.component.scss']
})
export class RelatedGraphsComponent implements OnInit, OnDestroy {

  selectedAthlete: Athlete;
  subscription = null;

  constructor(private filteredDataService: FilteredDataService) { 
    this.subscription = this.filteredDataService.selectedAthleteSubject.subscribe(sa => {
      this.selectedAthlete = sa;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubsribe();
    }
  }
}
