import { AthleteEntry } from 'src/models/athlete-entry';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FilteredDataService } from '../filtered-data.service';

@Component({
  selector: 'app-olympic-entries',
  templateUrl: './olympic-entries.component.html',
  styleUrls: ['./olympic-entries.component.scss']
})
export class OlympicEntriesComponent implements OnInit, OnDestroy {
  selectedFilteredAthleteEntries: AthleteEntry[] = []
  subscription = null;

  constructor(public filteredDataService: FilteredDataService) { }

  ngOnInit(): void {
    this.subscription = this.filteredDataService.selectedFilteredAthleteEntriesSubject.subscribe((aes: AthleteEntry[]) => {
      this.selectedFilteredAthleteEntries = aes;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
