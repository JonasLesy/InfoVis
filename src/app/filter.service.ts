import { NOCRegion } from './models/NOCRegion';
import { CsvDataService } from './csv-data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root",
})
export class FilterService {
  constructor(private csvDataService: CsvDataService) {}

  public get countriesToSelectFrom(): NOCRegion[] {
    return this.csvDataService.getRegionData();
  }

  private _selectedCountries: string[];
  public get selectedCountries(): string[] {
    return this._selectedCountries;
  }
  public set selectedCountries(v: string[]) {
    this._selectedCountries = v;
  }

  public getDisciplineList() {}
}
