import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'InfoVis project';

  public userArray: NOCRegion[] = [];
  public athleteEntries: AthleteEntry[] = [];
  constructor(private http: HttpClient){
    this.http.get('data/noc_regions.csv', {responseType: 'text'})
    .subscribe(
        data => {
            let csvToRowArray = data.split("\r");
            console.log('Parsing noc csv');
            for (let index = 1; index < csvToRowArray.length -1; index++) {
              let row = csvToRowArray[index].split(",");
              this.userArray.push(new NOCRegion( row[0], row[1], row[2]));
            }
            console.log('done');
        },
        error => {
            console.log(error);
        }
    );

    this.http.get('data/athlete_events.csv', {responseType: 'text'})
    .subscribe(
        data => {
            let csvToRowArray = data.split("\r");
            console.log('Parsing athletes csv');
            for (let index = 1; index < csvToRowArray.length -1; index++) {
              let row = csvToRowArray[index].split(",");
              this.athleteEntries.push(new AthleteEntry(parseInt( row[0], 10), row[1], row[2], parseInt( row[3], 10), parseInt( row[4], 10), parseInt( row[5], 10), row[6], row[7], row[8], parseInt( row[9], 10), row[10], row[11], row[12], row[13], row[14]));
            }
            console.log('done');
        },
        error => {
            console.log(error);
        }
    );
  }
  
}

export class NOCRegion {
  noc: String;
  region: String;
  notes: String;

  constructor(noc: String, region: String, notes: String){
    this.noc = noc;
    this.region = region;
    this.notes = notes;
  }
}

export class AthleteEntry {
  id: number;
  name: String;
  sex: String;
  age: number;
  height: number;
  weight: number;
  team: String;
  noc: String;
  games: String;
  year: number;
  season: String;
  city: String;
  sport: String;
  event: String;
  medal: String;

  constructor(id: number, name: String, sex: String, age: number, height: number, weight: number, team: String, noc: String, games: String, year: number, season: String, city: String, sport: String, event: String, medal: String){
    this.id = id;
    this.name = name;
    this.sex = sex;
    this.age = age;
    this.height = height;
    this.weight = weight;
    this.team = team;
    this.noc = noc;
    this.games = games;
    this.year = year;
    this.season = season;
    this.city = city;
    this.sport = sport;
    this.event = event;
    this.medal = medal;
  }
}