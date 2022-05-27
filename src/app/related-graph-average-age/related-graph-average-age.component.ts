import { Component, OnInit } from '@angular/core';
import { AthleteEntry } from 'src/models/athlete-entry';
import { FilterService } from '../filter.service';
import { FilteredDataService } from '../filtered-data.service';

@Component({
  selector: 'app-related-graph-average-age',
  templateUrl: './related-graph-average-age.component.html',
  styleUrls: ['./related-graph-average-age.component.scss']
})
export class RelatedGraphAverageAgeComponent implements OnInit {

  constructor(public filteredDataService: FilteredDataService, public filterService: FilterService) { }
  private _subscription;
  private _subscriptionSelectedDiscipline;
  averageAgesData: any;
  averageAgesOptions: any;

  ngOnInit(): void {
    this._subscription = this.filteredDataService.filteredAthleteEntriesSubject.subscribe(
      filteredAthleteEntries => {
        this.buildAverageAges(filteredAthleteEntries);
      }
    );
    this._subscriptionSelectedDiscipline = this.filteredDataService.selectedFilteredAthleteEntriesSubject.subscribe(
      filteredAthleteEntries => {
        this.buildAverageAges(filteredAthleteEntries);
      }
    );
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
    if (this._subscriptionSelectedDiscipline) {
      this._subscriptionSelectedDiscipline.unsubscribe();
    }
  }

  getYearsFromSelector(): number[] {
    let yearList: number[] = [];
    let yearRange: number[] = this.filterService.yearRange;
    for (let i = yearRange[0]; i <= yearRange[1]; i += 2) {
      yearList.push(i);
      // console.log("Year " + i + " will be added");
    }

    return yearList;
  }

  getAverageAgesForYears(yearList: number[], filteredAthleteEntries: AthleteEntry[]) {
    let maleList: number[] = [];
    let femaleList: number[] = [];
    let totalList: number[] = [];

    // this service method returns [maleDict, femaleDict, totalDict]-dictionaries, they have an easy way to retrieve average age for year X: e.g. X = 2020, desired type is male: maleDict.2020
    let resultList = this.filterService.calculateAverageAgesForYearRange(filteredAthleteEntries);
    // console.log(resultList);
    let maleEntries: Map<number, number> = resultList[0];
    let femaleEntries: Map<number, number> = resultList[1];
    let totalEntries: Map<number, number> = resultList[2];

    for (let i = 0; i <= yearList.length; i ++) {
      let currentYear = yearList[i];
      maleList.push((maleEntries.has(currentYear)) ? maleEntries.get(currentYear) : null);
      femaleList.push((femaleEntries.has(currentYear)) ? femaleEntries.get(currentYear) : null);
      totalList.push((totalEntries.has(currentYear)) ? totalEntries.get(currentYear) : null);
    }

    return [maleList, femaleList, totalList];
  }

  buildAverageAges(filteredAthleteEntries: AthleteEntry[]) {
    let yearList: number[] = this.getYearsFromSelector();
    let averageAges = this.getAverageAgesForYears(yearList, filteredAthleteEntries);
    // console.log("Got averageAges:");
    // console.log(averageAges);
    this.averageAgesData = {
      labels: yearList,
      datasets: [{
          label: 'Male athlete age',
          borderColor: '#52A2D9',
          tension: 0.4,
          fill: false,
          spanGaps: true,
          data: averageAges[0]
      },
      {
        label: 'Female athlete age',
        borderColor: '#F26923',
        tension: 0.4,
        fill: false,
        spanGaps: true,
        data: averageAges[1]
      },{
        label: 'Total athlete age',
        borderColor: '#000000',
        tension: 0.4,
        fill: false,
        spanGaps: true,
        data: averageAges[2]
      }]
    };

    this.averageAgesOptions = {
      plugins: {
        legend: {
            labels: {
                color: '#495057'
            }
        }
    },
    scales: {
        x: {
            ticks: {
                color: '#495057'
            },
            grid: {
                color: '#ebedef'
            }
        },
        y: {
            ticks: {
                color: '#495057'
            },
            grid: {
                color: '#ebedef'
            }
        }
    }
    };
  }

}
