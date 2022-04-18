import { NOCRegion } from './../models/NOCRegion';
import { FilterService } from '../filter.service';
import { CsvDataService } from './../csv-data.service';
import { Component, OnInit } from '@angular/core';
import {MultiSelectModule} from 'primeng/multiselect';

@Component({
  selector: "app-left-panel",
  templateUrl: "./left-panel.component.html",
  styleUrls: ["./left-panel.component.scss"],
})
export class LeftPanelComponent implements OnInit {

  private _countriesToSelectFrom : NOCRegion[];
  public get countriesToSelectFrom() : NOCRegion[] {
    return this._countriesToSelectFrom;
  }
  public set countriesToSelectFrom(v : NOCRegion[]) {
    this._countriesToSelectFrom = v;
  }
  

  private _selectedCountries: string[];
  public get selectedCountries(): string[] {
    return this._selectedCountries;
  }
  public set selectedCountries(v: string[]) {
    this.filterService.selectedCountries = v;
  }

  constructor(public filterService: FilterService) {}

  ngOnInit(): void {
    this.selectedCountries = this.filterService.selectedCountries;
    this.countriesToSelectFrom = this.filterService.countriesToSelectFrom;
  }
}
