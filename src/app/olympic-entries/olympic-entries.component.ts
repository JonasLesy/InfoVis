import { Component, OnInit } from '@angular/core';
import { FilteredDataService } from '../filtered-data.service';

@Component({
  selector: 'app-olympic-entries',
  templateUrl: './olympic-entries.component.html',
  styleUrls: ['./olympic-entries.component.scss']
})
export class OlympicEntriesComponent implements OnInit {

  constructor(public filteredDataService: FilteredDataService) { }

  ngOnInit(): void {
  }

}
