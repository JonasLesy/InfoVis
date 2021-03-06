import { DisciplineEntry } from 'src/models/discipline-entry';
import { FilteredDataService } from './../filtered-data.service';
import { FilterService } from './../filter.service';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, SortEvent } from 'primeng/api'; 
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
  private _disciplinesSubscription;
  private _selectedDisciplineSubscription: any;
  people: string[] = [];
  virtualPeople: string[];
  selectedAthlete: Athlete;
  selectedDiscipline: DisciplineEntry;
  disciplines = {};

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
    if (this._subscriptionSelectedAthlete) {
      this._subscriptionSelectedAthlete.unsubscribe();
    }
    if (this._disciplinesSubscription) {
      this._disciplinesSubscription.unsubscribe();
    }
    if (this._selectedDisciplineSubscription) {
      this._selectedDisciplineSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this._subscription = this.filteredDataService.filteredAthletesSubject.subscribe(
      fa => {
        fa.forEach((athlete: Athlete) => {
          this.people.push(athlete.name);
        });
      }
    );
    this._subscriptionSelectedAthlete = this.filteredDataService.selectedAthleteSubject.subscribe(
      fa => {
        this.selectedAthlete = fa;
      }
    );
    this._disciplinesSubscription = this.filteredDataService.filteredDisciplinesSubject.subscribe(d => {
      this.disciplines = this.groupDisciplines(d);
    })
    this._selectedDisciplineSubscription = this.filteredDataService.selectedDisciplinesSubject.subscribe(d => {
      this.selectedDiscipline = d;
    })
    this.virtualPeople = Array.from({length: 100});
  }

  loadPersonsLazy(event: LazyLoadEvent) {
      // console.log(event);
      // console.log("Adding more items");
      //load data of required page
      let loadedPeople = this.people.slice(event.first, (event.first + event.rows));

      //populate page of virtual people
      Array.prototype.splice.apply(this.virtualPeople, [...[event.first, event.rows], ...loadedPeople]);
      
      //trigger change detection
      this.virtualPeople = [...this.virtualPeople];
  }

  private groupDisciplines(disciplines: DisciplineEntry[]) {
    return disciplines.reduce((groups, item) => {
      const val = item.sport;
      groups[val] = groups[val] || [];
      groups[val].push(item);
      return groups;
    }, {});
  }

  public disciplineEntriesEqual(disciplineEntry1: DisciplineEntry, disciplineEntry2: DisciplineEntry): boolean {
    let result = disciplineEntry1.sport === disciplineEntry2.sport && disciplineEntry1.event === disciplineEntry2.event && disciplineEntry1.sex === disciplineEntry2.sex;
    if (result) {
      return true;
    }
    return false;
  }

  customSort(event: SortEvent) {
    event.data.sort((data1: DisciplineEntry, data2: DisciplineEntry) => {
      let sport1 = data1.sport;
      let sport2 = data2.sport;

      if (sport1 === sport2) {
        if (data1.event >= data2.event) {
          return 1;
        }
        else if (data1.event < data2.event) {
          return -1
        }
        else {
          return 0;
        }
      }
      else {
        return (sport1 > sport2) ? 1 : -1;
      }
    });
  }

}
