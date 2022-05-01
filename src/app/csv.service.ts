import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AthleteEntry } from './models/athlete-entry';
import { CsvData } from './models/csv-data';
import { NOCRegionEntry } from './models/noc-region-entry';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CsvService {

  constructor(private http: HttpClient) { }

  public loadCsvData(): Observable<CsvData> {
    return this.loadNOCRegions().pipe(map (nr => {
      return this.loadAtheleteEntriesAndCreateCsvData(nr as NOCRegionEntry[])
      .pipe(map(csvData => {
        return csvData;
      }))
    }));
      // .pipe(map(nocRegions => {
      //   return this.loadAtheleteEntriesAndCreateCsvData(nocRegions as NOCRegionEntry[]);
      // }));
  }

  private loadNOCRegions(): Observable<NOCRegionEntry[]> {
    return this.http.get('data/noc_regions.csv', { responseType: 'text' })
      .pipe(map(
        data => {
          let nocRegionEntries: NOCRegionEntry[] = [];
          let csvToRowArray = data.split("\r");
          console.log('Parsing noc csv');
          for (let index = 1; index < csvToRowArray.length - 1; index++) {
            let row = csvToRowArray[index].split(",");
            nocRegionEntries.push(new NOCRegionEntry(row[0], row[1], row[2]));
          }
          return nocRegionEntries;
        },
        error => {
          console.log(error);
        }
      ));
  }

  private loadAtheleteEntriesAndCreateCsvData(nocRegionEntries: NOCRegionEntry[]): Observable<CsvData> {
    return this.http.get('data/athlete_events.csv', { responseType: 'text' })
      .pipe(map(
        data => {
          let csvToRowArray = data.split("\r");
          console.log('Parsing athletes csv');
          let countrySet = new Set<string>();
          let personSet = new Set<string>();
          let athleteEntries: AthleteEntry[] = [];
          for (let index = 1; index < csvToRowArray.length - 1; index++) {
            let row = csvToRowArray[index].split(",");
            let newEntry = new AthleteEntry(parseInt(row[0], 10), row[1], row[2], parseInt(row[3], 10), parseInt(row[4], 10), parseInt(row[5], 10), row[6], row[7], row[8], parseInt(row[9], 10), row[10], row[11], row[12], row[13], row[14]);
            var specificNOC = nocRegionEntries.find(item => item.noc === newEntry.noc);
            if (specificNOC !== undefined) {
              countrySet.add(specificNOC.region);
            }
            personSet.add(newEntry.name);
            athleteEntries.push(newEntry);
          }
          let countries = [...countrySet];
          let persons = [...personSet];
          console.log('done');
          return new CsvData(nocRegionEntries, athleteEntries, countries, persons);
        },
        error => {
          console.log(error);
        }
      ));
  }
}
