import { FilteredDataService } from './../filtered-data.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-medal-chart',
  templateUrl: './medal-chart.component.html',
  styleUrls: ['./medal-chart.component.scss']
})
export class MedalChartComponent implements OnInit, OnChanges {

  @Input() medalData: number[];
  @Input() medalConfig: any; //Array [3, 2, 4] means: 3 gold medals, 2 silver medals and 4 bronze medals
  colorScheme = {
    domain: ['#FDD130', '#B8B8B8', '#C47435']
  };

  private _subscription;

  constructor(public filteredDataService: FilteredDataService) {

  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    const countOccurrences = (arr, val) => arr.reduce((a, v) => (v.medal === val ? a + 1 : a), 0);
    this._subscription = this.filteredDataService.selectedFilteredAthleteEntriesSubject.subscribe(
      fa => {
        console.log("Counting medals..");
        let goldCount = countOccurrences(fa, "Gold");
        let silverCount = countOccurrences(fa, "Silver");
        let bronzeCount = countOccurrences(fa, "Bronze");
        this.medalData = [goldCount, silverCount, bronzeCount];
      }
    );

    this.medalConfig = {
      labels: ['Gold', 'Silver', 'Bronze'],
      datasets: [
        {
          data: this.medalData,
          backgroundColor: [
            '#FDD130', '#B8B8B8', '#C47435'
          ]
        }
      ]
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    this.ngOnInit();
  }

}
