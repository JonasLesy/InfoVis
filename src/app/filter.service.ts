import { NOCRegion } from './models/NOCRegion';
import { CsvDataService } from './csv-data.service';
import { Injectable } from '@angular/core';
import { ReplaySubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FilterService {
  public selectedCountriesSubject$ = new ReplaySubject<string[]>(1);

  constructor(private csvDataService: CsvDataService) {
    
  }

  public get countriesToSelectFrom(): NOCRegion[] {
    return this.csvDataService.getRegionData();
  }

  public newCountrySelected(v: string[]) {
    this.selectedCountriesSubject$.next(v);
  }
}
