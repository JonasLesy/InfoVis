import { Component, OnInit } from '@angular/core';
import { DisciplineEntry } from 'src/models/discipline-entry';
import { FilteredDataService } from '../filtered-data.service';
import { FilterService } from '../filter.service';
import { AthleteEntry } from 'src/models/athlete-entry';

@Component({
  selector: 'app-related-graph-discipline',
  templateUrl: './related-graph-discipline.component.html',
  styleUrls: ['./related-graph-discipline.component.scss']
})
export class RelatedGraphDisciplineComponent implements OnInit {

  selectedDiscipline: DisciplineEntry;
  subscriptionDiscipline = null;
  disciplineEntries: AthleteEntry[];
  firstEdition: number;
  firstLocation: string;
  mostGoldMedalsEntry: any;
  mostMedalsEntry: any;

  constructor(public filteredDataService: FilteredDataService, public filterService: FilterService) { 
    this.subscriptionDiscipline = this.filteredDataService.selectedFilteredAthleteEntriesSubject.subscribe(sa => {
      // Don't do anything if neither athlete nor discipline is selected
      if (this.filterService.selectedAthlete || this.filterService.selectedDiscipline) {
        this.selectedDiscipline = sa[0].disciplineEntry;
        console.log("Discipline entry is:");
        console.log(this.selectedDiscipline);
        console.log("Selected discipline is " + this.selectedDiscipline.event);

        // Use the following logic: if no person is selected => the selectedFilteredAthleteEntriesSubject contains only entries for the selected discipline
        // Otherwise: go retrieve the list from the full dataset:
        if (!this.filterService.selectedAthlete) {
          this.disciplineEntries = sa;
        } else {
          this.disciplineEntries = this.filterService.getAthleteEntriesForDiscipline(this.selectedDiscipline);
        }
        console.log("Got disciplineEntries:");
        console.log(this.disciplineEntries);
        // TODO: 
        // topathleet
        // top landen
        this.firstEdition = Math.min(...this.disciplineEntries.map(o => o.year));
        this.firstLocation = this.disciplineEntries.find(athleteEntry => athleteEntry.year == this.firstEdition).city;

        let medalsPerCountry = [];
        this.disciplineEntries.reduce(function(res, value) {
          if (!res[value.noc]) {
            res[value.noc] = {
                bronze: 0,
                silver: 0,
                gold: 0,
                total: 0,
                noc: value.noc
            };
            medalsPerCountry.push(res[value.noc])
          }
          if (value.medal === "Gold") {
            res[value.noc].gold += 1;
          } else if (value.medal === "Silver") {
            res[value.noc].silver += 1;
          }else if (value.medal === "Bronze") {
            res[value.noc].bronze += 1;
          }
          if (value.medal !== "NA") {
            res[value.noc].total += 1;
          }
          return res;
        }, {});
        console.log("Medals per country:")
        console.log(medalsPerCountry);
        let mostMedals = Math.max(...medalsPerCountry.map(o => o.total));
        this.mostMedalsEntry = medalsPerCountry.find(o => o.total == mostMedals);
        let mostGoldMedals = Math.max(...medalsPerCountry.map(o => o.gold));
        this.mostGoldMedalsEntry = medalsPerCountry.find(o => o.gold == mostGoldMedals);
      }
    });
  }

  ngOnInit(): void {
  }

}
