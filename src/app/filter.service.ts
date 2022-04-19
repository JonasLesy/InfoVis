import { NOCRegion } from './models/NOCRegion';
import { CsvDataService } from './csv-data.service';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";


// Make another FilterOptionsService that has properties for the filter options
// Use this service only to notify other components of filter changes.
@Injectable({
  providedIn: "root",
})
export class FilterService {
  public selectedCountriesSubject$: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  public selectedDisciplinessSubject$: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);

  constructor(private csvDataService: CsvDataService) { }

  public get countriesToSelectFrom(): Observable<string[]> {
    let regionData = this.csvDataService.getRegionData(false)
      .map(rd => {
        return regionData.map((rd) => rd.region);
      })
  }

  public get disciplinesToSelectFrom(): Observable<string[]> {
    this.csvDataService.getAthleteData(false).map(ads => {
      let disciplines = new Set<string>();
      ads.forEach(ad => {
        disciplines.add(ad.sport);
      });
      return Array.from(disciplines);
    });
  }

  public newCountrySelected(v: string[]) {
    this.selectedCountriesSubject$.next(v);
  }

  public newDisciplineSelected(v: string[]) {
    this.selectedDisciplinessSubject$.next(v);
  }
}
