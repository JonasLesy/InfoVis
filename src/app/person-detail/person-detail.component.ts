import { FilteredDataService } from './../filtered-data.service';
import { Component, OnInit } from '@angular/core';
import { Athlete } from 'src/models/athlete';
import { AthleteEntry } from 'src/models/athlete-entry';
import { faBaby, faMars, faVenus, faWeightScale, faRulerVertical } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss']
})
export class PersonDetailComponent implements OnInit {
  private _medalsSubscription: any;

  constructor(public filteredDataService: FilteredDataService) { }

  private _subscription;
  private _subscriptionEntries;
  public selectedAthlete: Athlete;
  public athleteEntries: AthleteEntry[];
  public medalData: number[] = [];
  faMars = faMars;
  faVenus = faVenus;
  faBaby = faBaby;
  faWeightScale = faWeightScale;
  faRulerVertical = faRulerVertical;
  sex: string = null;


  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
    if (this._subscriptionEntries) {
      this._subscriptionEntries.unsubscribe();
    }
    if (this._medalsSubscription) {
      this._subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.setMedalsData();
    this._subscription = this.filteredDataService.selectedAthleteSubject.subscribe(
      athlete => {
        this.selectedAthlete = athlete;
        this.sex = athlete? this.selectedAthlete.sex : "";
      }
    );
    this._subscriptionEntries = this.filteredDataService.selectedFilteredAthleteEntriesSubject.subscribe(
      athleteEntries => {
        this.athleteEntries = athleteEntries;
        // this.refreshTable();
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


  private setMedalsData() {
    const countOccurrences = (arr, val) => arr.reduce((a, v) => (v.medal === val ? a + 1 : a), 0);
    this._medalsSubscription = this.filteredDataService.selectedFilteredAthleteEntriesSubject.subscribe(
      fa => {
        if (fa) {
          let goldCount = countOccurrences(fa, "Gold");
          //console.log('gold count is ' + goldCount);
          let silverCount = countOccurrences(fa, "Silver");
          //console.log('silver count is ' + silverCount);
          let bronzeCount = countOccurrences(fa, "Bronze");
          this.medalData = [goldCount, silverCount, bronzeCount];
        }
        else {
          this.medalData = [0,0,0];
        } 
      }
    );
  }

}
