import { Component, OnInit } from '@angular/core';
import { DisciplineEntry } from 'src/models/discipline-entry';
import { FilteredDataService } from '../filtered-data.service';

@Component({
  selector: 'app-related-graph-discipline',
  templateUrl: './related-graph-discipline.component.html',
  styleUrls: ['./related-graph-discipline.component.scss']
})
export class RelatedGraphDisciplineComponent implements OnInit {

  selectedDiscipline: DisciplineEntry;
  subscriptionDiscipline = null;

  constructor(public filteredDataService: FilteredDataService) { 
   /* this.subscriptionDiscipline = this.filteredDataService.selectedDisciplinesSubject.subscribe(sd => {
      this.selectedDiscipline = sd;
      console.log("Selected discipline is " + this.selectedDiscipline.event);
    });*/
    this.subscriptionDiscipline = this.filteredDataService.selectedFilteredAthleteEntriesSubject.subscribe(sa => {
      this.selectedDiscipline = sa[0].disciplineEntry;
      console.log("Selected discipline is " + this.selectedDiscipline.event);
    });
  }

  ngOnInit(): void {
  }

}
