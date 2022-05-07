import { FilteredDataService } from './../filtered-data.service';
import { FilterService } from './../filter.service';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api'; 
import { Athlete } from 'src/models/athlete';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {

  constructor(public filteredDataService: FilteredDataService, public filterService: FilterService) { }

  //private velden voor deze class
  private _subscription;
  private _subscriptionSelectedAthlete;
  people: string[] = [];
  virtualPeople: string[];
  selectedAthlete: Athlete;

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this._subscription = this.filteredDataService.filteredPersonsSubject.subscribe(
      fa => {
        fa.forEach(athleteEntry => {
          this.people.push(athleteEntry);
        });
      }
    );
    this._subscriptionSelectedAthlete = this.filteredDataService.selectedAthleteSubject.subscribe(
      fa => {
        this.selectedAthlete = fa;
      }
    );
    this.virtualPeople = Array.from({length: 10});
  }

  loadPersonsLazy(event: LazyLoadEvent) {
      console.log("Adding more items");
      //load data of required page
      let loadedPeople = this.people.slice(event.first, (event.first + event.rows));

      //populate page of virtual people
      Array.prototype.splice.apply(this.virtualPeople, [...[event.first, event.rows], ...loadedPeople]);
      
      //trigger change detection
      this.virtualPeople = [...this.virtualPeople];
  }

}
