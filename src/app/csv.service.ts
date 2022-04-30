import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AthleteEntry } from './models/athlete-entry';
import { NOCRegion } from './models/noc-region';

@Injectable({
  providedIn: 'root'
})
export class CsvService {
  private _nocEntries: NOCRegion[] = [];
  private _athleteEntries: AthleteEntry[] = [];
  private _countries: string[] = [];
  private _persons: string[] = [];
  private _filteredAthleteEntriesList: AthleteEntry[];


  // Getters for fields
  public get nocEntries(): NOCRegion[] {
    return this._nocEntries;
  }
  public get athleteEntries(): AthleteEntry[] {
    return this._athleteEntries;
  } 
  public get countries(): string[] {
    return this._countries;
  } 
  public get persons(): string[] {
    return this._persons;
  } 
  public get filteredAthleteEntriesList(): AthleteEntry[] {
    return this._filteredAthleteEntriesList;
  }




  constructor(private http: HttpClient) { }

  public loadCsvData(): void {
    this.loadNOCRegions();
    this.loadAtheleteEntries();
  }

  private loadNOCRegions(): void {
    this.http.get('data/noc_regions.csv', { responseType: 'text' })
      .subscribe(
        data => {
          let csvToRowArray = data.split("\r");
          console.log('Parsing noc csv');
          for (let index = 1; index < csvToRowArray.length - 1; index++) {
            let row = csvToRowArray[index].split(",");
            this._nocEntries.push(new NOCRegion(row[0], row[1], row[2]));
          }
          console.log('done');
        },
        error => {
          console.log(error);
        }
      );
  }

  private loadAtheleteEntries(): void {
    this.http.get('data/athlete_events.csv', { responseType: 'text' })
      .subscribe(
        data => {
          let csvToRowArray = data.split("\r");
          console.log('Parsing athletes csv');
          let countrySet = new Set<string>();
          let personSet = new Set<string>();
          for (let index = 1; index < csvToRowArray.length - 1; index++) {
            let row = csvToRowArray[index].split(",");
            let newEntry = new AthleteEntry(parseInt(row[0], 10), row[1], row[2], parseInt(row[3], 10), parseInt(row[4], 10), parseInt(row[5], 10), row[6], row[7], row[8], parseInt(row[9], 10), row[10], row[11], row[12], row[13], row[14]);
            var specificNOC = this._nocEntries.find(item => item.noc === newEntry.noc);
            if (specificNOC !== undefined) {
              countrySet.add(specificNOC.region);
            }
            personSet.add(newEntry.name);
            this._athleteEntries.push(newEntry);
          }
          this._countries = [...countrySet];
          this._persons = [...personSet];
          console.log('done');
          //console.log(this.persons);
          this._filteredAthleteEntriesList = this._athleteEntries;
        },
        error => {
          console.log(error);
        }
      );
  }
}
