import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AthleteEntry } from '../models/athlete-entry.model';

@Injectable({
    providedIn: 'root',
   })
export class AthleteService {

  private readonly athleteEventsUrl = '/data/athlete_events.csv';
  allNames: string[] = [];
  athleteEntries: AthleteEntry[] = [];

  constructor(private http: HttpClient) {
      
    this.http.get(this.athleteEventsUrl, {responseType: 'text'})
    .subscribe(
        data => {
            let csvToRowArray = data.split("\r");
            console.log('Parsing athletes csv in service');
            for (let index = 1; index < csvToRowArray.length -1; index++) {
              let row = csvToRowArray[index].split(",");
              let newEntry = new AthleteEntry(parseInt( row[0], 10), row[1], row[2], parseInt( row[3], 10), parseInt( row[4], 10), parseInt( row[5], 10), row[6], row[7], row[8], parseInt( row[9], 10), row[10], row[11], row[12], row[13], row[14]);
              this.athleteEntries.push(newEntry);
            }
            console.log('done');
        },
        error => {
            console.log(error);
        }
    );
    
   }

  getAthleteEntries(): AthleteEntry[] {
    if(this.athleteEntries.length > 0) {
        return this.athleteEntries;
    } else {
        this.retrieveAthletes();
        return this.athleteEntries;
    }
  }

  private retrieveAthletes() {
    this.http.get(this.athleteEventsUrl, {responseType: 'text'})
    .subscribe(
        data => {
            this.athleteEntries = [];
            let csvToRowArray = data.split("\r");
            console.log('Parsing athletes csv in service');
            for (let index = 1; index < csvToRowArray.length -1; index++) {
              let row = csvToRowArray[index].split(",");
              let newEntry = new AthleteEntry(parseInt( row[0], 10), row[1], row[2], parseInt( row[3], 10), parseInt( row[4], 10), parseInt( row[5], 10), row[6], row[7], row[8], parseInt( row[9], 10), row[10], row[11], row[12], row[13], row[14]);
              this.athleteEntries.push(newEntry);
            }
            console.log('done');
        },
        error => {
            console.log(error);
        }
    );
  }

}