import { FilteredDataService } from './../filtered-data.service';
import { Component, OnInit } from '@angular/core';
import { Athlete } from 'src/models/athlete';
import { AthleteEntry } from 'src/models/athlete-entry';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { FilterService } from '../filter.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss']
})
export class PersonDetailComponent implements OnInit {

  constructor(public filteredDataService: FilteredDataService, public filterService: FilterService) { }

  private _subscription;
  private _subscriptionEntries;
  public selectedAthlete: Athlete;
  public athleteEntries: AthleteEntry[];

  cols: any[];

  exportColumns: any[];

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
    this._subscriptionEntries = this.filteredDataService.selectedFilteredAthletesSubject.subscribe(
      athleteEntries => {
        this.athleteEntries = athleteEntries;
        // this.refreshTable();
      }
    );

    this.cols = [
      ['Year', 'City', 'Sport', 'Event', 'Medal']
    ];

    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
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

  exportPdf() {
    let filename = this.selectedAthlete.name + "_" + this.filterService.yearRange[0] + "-" + this.filterService.yearRange[1];
    let exportData = this.athleteEntries.map(athleteEntry => {return [athleteEntry.year, athleteEntry.city, athleteEntry.sport, athleteEntry.event, athleteEntry.medal]});
    const doc = new jsPDF()
    autoTable(doc, {
      head: this.cols,
      body: exportData,
      didDrawCell: (data) => {
        console.log(data.column.index)
      },
    })

    doc.save(filename)
  }  

}
