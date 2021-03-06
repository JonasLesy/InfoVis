import { DisciplineEntry } from 'src/models/discipline-entry';
import { Component, OnInit } from '@angular/core';
import { Athlete } from 'src/models/athlete';
import { FilterService } from '../filter.service';
import { FilteredDataService } from '../filtered-data.service';

@Component({
  selector: 'app-related-graph-country-medals',
  templateUrl: './related-graph-country-medals.component.html',
  styleUrls: ['./related-graph-country-medals.component.scss']
})
export class RelatedGraphCountryMedalsComponent implements OnInit {

  private subscriptions = [];
  public selectedAthlete: Athlete;
  public selectedDiscipline: DisciplineEntry;
  public chosenEdition: string;
  stackedMedalData: any;
  stackedMedalOptions: any;
  chosenSex: any;

  constructor(public filteredDataService: FilteredDataService, public filterService: FilterService) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions.push(this.filteredDataService.selectedAthleteSubject.subscribe(
      athlete => {
        this.selectedAthlete = athlete;
        this.buildCountryMedals();
      }
    ));
    this.subscriptions.push(this.filteredDataService.selectedDisciplinesSubject.subscribe(
      discipline => {
        this.selectedDiscipline = discipline;
        this.buildCountryMedals();
      }
    ));
    this.subscriptions.push(this.filteredDataService.chosenEditionSubject.subscribe(
      edition => {
        this.chosenEdition = edition;
        this.buildCountryMedals();
      }
    ));
    this.subscriptions.push(this.filteredDataService.chosenSexSubject.subscribe(
      sex => {
        this.chosenSex = sex;
        this.buildCountryMedals();
      }
    ));
    this.buildCountryMedals();
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

  getMedalsForCountryForYears(yearList: number[]) {
    let bronzeList: number[] = [];
    let silverList: number[] = [];
    let goldList: number[] = [];
    if (this.selectedAthlete) {
      // this service method returns [bronzeDict, silverDict, goldDict]-dictionaries, they have an easy way to retrieve gold medals for year X: e.g. X = 2020, desired type is gold medals: goldDict.2020
      let resultList = this.filterService.calculateMedalsForCountryForYearRange(this.selectedAthlete.noc, this.filterService.yearRange[0], this.filterService.yearRange[1], this.selectedDiscipline, this.chosenEdition, this.chosenSex);
      // console.log(resultList);
      let bronzeEntries: Map<number, number> = resultList[0];
      let silverEntries: Map<number, number> = resultList[1];
      let goldEntries: Map<number, number> = resultList[2];

      for (let i = 0; i <= yearList.length; i ++) {
        let currentYear = yearList[i];
        bronzeList.push((bronzeEntries.has(currentYear)) ? bronzeEntries.get(currentYear) : 0);
        silverList.push((silverEntries.has(currentYear)) ? silverEntries.get(currentYear) : 0);
        goldList.push((goldEntries.has(currentYear)) ? goldEntries.get(currentYear) : 0);
      }
    }
    return [bronzeList, silverList, goldList];
  }

  buildCountryMedals() {
    let yearList: number[] = this.getYearsFromSelector();
    let medalLists = this.getMedalsForCountryForYears(yearList);
    this.stackedMedalData = {
      labels: yearList,
      datasets: [{
          type: 'bar',
          label: 'Bronze medals',
          backgroundColor: '#C47435',
          data: medalLists[0]
      }, {
          type: 'bar',
          label: 'Silver medals',
          backgroundColor: '#B8B8B8',
          data: medalLists[1]
      }, {
          type: 'bar',
          label: 'Gold medals',
          backgroundColor: '#FDD130',
          data: medalLists[2]
      }]
    };

    this.stackedMedalOptions = {
        tooltips: {
            mode: 'index',
            intersect: false
        },
        scales: {
            xAxes: {
                stacked: true,
                title: {
                  display: true,
                  text: 'Year'
                }
            },
            yAxes: {
                stacked: true,
                min: 0,
                title: {
                  display: true,
                  text: 'Medals'
                }
            }
        }
    };
  }

}
