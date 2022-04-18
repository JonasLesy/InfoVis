import { NOCRegion } from './models/NOCRegion';
import { CsvDataService } from './csv-data.service';
import { Injectable } from '@angular/core';
import { ReplaySubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FilterService {
  public selectedCountriesSubject$ = new ReplaySubject<string[]>(1);
  public selectedDisciplinessSubject$ = new ReplaySubject<string[]>(1);

  constructor(private csvDataService: CsvDataService) {}

  public get countriesToSelectFrom(): string[] {
    let regionData = this.csvDataService.getRegionData();
    let result = regionData.map((rd) => rd.region);
    return result;
  }

  public get disciplinesToSelectFrom(): string[] {
    let disciplines = new Set<string>();
    this.csvDataService.getAthleteData().forEach((ad) => {
      disciplines.add(ad.sport);
    });
    let result = Array.from(disciplines);
    return result;
  }

  public newCountrySelected(v: string[]) {
    this.selectedCountriesSubject$.next(v);
  }

  public newDisciplineSelected(v: string[]) {
    this.selectedDisciplinessSubject$.next(v);
  }
}
