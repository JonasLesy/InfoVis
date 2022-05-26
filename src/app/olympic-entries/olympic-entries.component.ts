import { AthleteEntry } from 'src/models/athlete-entry';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FilteredDataService } from '../filtered-data.service';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { FilterService } from '../filter.service';
import { faDownload } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-olympic-entries',
  templateUrl: './olympic-entries.component.html',
  styleUrls: ['./olympic-entries.component.scss']
})
export class OlympicEntriesComponent implements OnInit, OnDestroy {
  selectedFilteredAthleteEntries: AthleteEntry[] = []
  subscription = null;
  cols: any[];
  exportColumns: any[];
  faDownload = faDownload;

  constructor(public filteredDataService: FilteredDataService, public filterService: FilterService) { }

  ngOnInit(): void {
    this.subscription = this.filteredDataService.selectedFilteredAthleteEntriesSubject.subscribe((aes: AthleteEntry[]) => {
      this.selectedFilteredAthleteEntries = aes;
    });
    this.cols = [
      ['Year', 'City', 'Sport', 'Event', 'Medal']
    ];

    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  }

  exportPdf() {
    let filename = this.selectedFilteredAthleteEntries[0].name + "_" + this.filterService.yearRange[0] + "-" + this.filterService.yearRange[1];
    let exportData = this.selectedFilteredAthleteEntries.map(athleteEntry => {return [athleteEntry.year, athleteEntry.city, athleteEntry.disciplineEntry.sport, athleteEntry.disciplineEntry.event, athleteEntry.medal]});
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
