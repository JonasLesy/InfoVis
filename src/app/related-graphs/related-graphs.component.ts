import { FilteredDataService } from './../filtered-data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Athlete } from 'src/models/athlete';
import { DisciplineEntry } from 'src/models/discipline-entry';

@Component({
  selector: 'app-related-graphs',
  templateUrl: './related-graphs.component.html',
  styleUrls: ['./related-graphs.component.scss']
})
export class RelatedGraphsComponent implements OnInit, OnDestroy {

  selectedAthlete: Athlete;
  selectedDiscipline: DisciplineEntry;
  subscription = null;
  subscriptionDiscipline = null;

  constructor(private filteredDataService: FilteredDataService) { 
    this.subscription = this.filteredDataService.selectedAthleteSubject.subscribe(sa => {
      this.selectedAthlete = sa;
    });
    this.subscriptionDiscipline = this.filteredDataService.selectedDisciplinesSubject.subscribe(sa => {
      this.selectedDiscipline = sa;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubsribe();
    }
    if (this.subscriptionDiscipline) {
      this.subscriptionDiscipline.unsubsribe();
    }
  }
}
