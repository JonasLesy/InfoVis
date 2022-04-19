import { NOCRegion } from './models/NOCRegion';
import { CsvDataService } from './csv-data.service';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FilterService {
  public selectedCountriesSubject$ = new ReplaySubject<string[]>(1);
  public selectedDisciplinessSubject$ = new ReplaySubject<string[]>(1);

  constructor(private csvDataService: CsvDataService) {}

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
