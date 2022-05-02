import { FilteredDataService } from './../filtered-data.service';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api'; 

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {

  constructor(public filteredDataService: FilteredDataService) { }

  //private velden voor deze class
  private _subscription;
  people: string[] = [];
  virtualPeople: string[];

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
    this.virtualPeople = Array.from({length: 100});
  }

  loadPersonsLazy(event: LazyLoadEvent) {
      console.log("Adding more items");
      //load data of required page
      let loadedPeople = this.people.slice(event.first, (event.first + event.rows));

      //populate page of virtual cars
      Array.prototype.splice.apply(this.virtualPeople, [...[event.first, event.rows], ...loadedPeople]);
      
      //trigger change detection
      this.virtualPeople = [...this.virtualPeople];
  }

}
