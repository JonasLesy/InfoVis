import { FilteredDataService } from './../filtered-data.service';
import { Component, OnInit } from '@angular/core';
import { Athlete } from 'src/models/athlete';
import { AthleteEntry } from 'src/models/athlete-entry';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss']
})
export class PersonDetailComponent implements OnInit {

  constructor(public filteredDataService: FilteredDataService) { }

  private _subscription;
  private _subscriptionEntries;
  public selectedAthlete: Athlete;
  public athleteEntries: AthleteEntry[];

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
    if (this._subscriptionEntries) {
      this._subscriptionEntries.unsubscribe();
    }
  }

  ngOnInit(): void {
    this._subscription = this.filteredDataService.selectedAthleteSubject.subscribe(
      athlete => {
        this.selectedAthlete = athlete;
      }
    );
    this._subscriptionEntries = this.filteredDataService.filteredAthletesSubject.subscribe(
      athleteEntries => {
        this.athleteEntries = athleteEntries;
      }
    );
  }

  calculateEntryTotal(year) {
    let total = 0;

    if (this.athleteEntries) {
        for (let athleteEntry of this.athleteEntries) {
            if (athleteEntry.year === year) {
                total++;
            }
        }
    }

    return total;
}

}
