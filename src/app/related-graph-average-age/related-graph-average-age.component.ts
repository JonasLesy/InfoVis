import { DisciplineEntry } from 'src/models/discipline-entry';
import { Component, OnInit } from '@angular/core';
import { FilterService } from '../filter.service';
import { FilteredDataService } from '../filtered-data.service';

@Component({
  selector: 'app-related-graph-average-age',
  templateUrl: './related-graph-average-age.component.html',
  styleUrls: ['./related-graph-average-age.component.scss']
})
export class RelatedGraphAverageAgeComponent implements OnInit {

  constructor(public filteredDataService: FilteredDataService, public filterService: FilterService) { }

  private subscriptions = [];
  public selectedDiscipline: DisciplineEntry;
  public chosenEdition: string;
  averageAgesData: any;
  averageAgesOptions: any;
  chosenSex: any;

  ngOnInit(): void {
    this.subscriptions.push(this.filteredDataService.selectedAthleteSubject.subscribe(
      () => {
        this.buildAverageAges();
      }
    ));
    this.subscriptions.push(this.filteredDataService.selectedDisciplinesSubject.subscribe(
      discipline => {
        this.selectedDiscipline = discipline;
        this.buildAverageAges();
      }
    ));
    this.subscriptions.push(this.filteredDataService.chosenEditionSubject.subscribe(
      edition => {
        this.chosenEdition = edition;
        this.buildAverageAges();
      }
    ));
    this.subscriptions.push(this.filteredDataService.chosenSexSubject.subscribe(
      sex => {
        this.chosenSex = sex;
        this.buildAverageAges();
      }
    ));
    this.buildAverageAges();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  getYearsFromSelector(): number[] {
    let yearList: number[] = [];
    let yearRange: number[] = this.filterService.yearRange;
    for (let i = yearRange[0]; i <= yearRange[1]; i += 2) {
      yearList.push(i);
      console.log("Year " + i + " will be added");
    }

    return yearList;
  }

  getAverageAgesForYears(yearList: number[]) {
    let maleList: number[] = [];
    let femaleList: number[] = [];
    let totalList: number[] = [];

    // this service method returns [maleDict, femaleDict, totalDict]-dictionaries, they have an easy way to retrieve average age for year X: e.g. X = 2020, desired type is male: maleDict.2020
    let resultList = this.filterService.calculateAverageAgesForYearRange(this.filterService.yearRange[0], this.filterService.yearRange[1], this.selectedDiscipline, this.chosenEdition, this.chosenSex);
    console.log(resultList);
    let maleEntries: Map<number, number> = resultList[0];
    let femaleEntries: Map<number, number> = resultList[1];
    let totalEntries: Map<number, number> = resultList[2];

    for (let i = 0; i <= yearList.length; i ++) {
      let currentYear = yearList[i];
      maleList.push((maleEntries.has(currentYear)) ? maleEntries.get(currentYear) : 0);
      femaleList.push((femaleEntries.has(currentYear)) ? femaleEntries.get(currentYear) : 0);
      totalList.push((totalEntries.has(currentYear)) ? totalEntries.get(currentYear) : 0);
    }

    return [maleList, femaleList, totalList];
  }

  buildAverageAges() {
    let yearList: number[] = this.getYearsFromSelector();
    //let medalLists = this.getMedalsForCountryForYears(yearList);
    let averageAges = this.getAverageAgesForYears(yearList);
    console.log("Got averageAges:");
    console.log(averageAges);
    this.averageAgesData = {
      labels: yearList,
      datasets: [{
          label: 'Male athlete age',
          borderColor: '#33D5FF',
          tension: 0.4,
          fill: false,
          data: averageAges[0]
      },
      {
        label: 'Female athlete age',
        borderColor: '#FF33E6',
        tension: 0.4,
        fill: false,
        data: averageAges[1]
      },{
        label: 'Total athlete age',
        borderColor: '#50FF33',
        tension: 0.4,
        fill: false,
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