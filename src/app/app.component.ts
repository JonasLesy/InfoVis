import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'InfoVis project';
  searchText: string = '';

  public nocEntries: NOCRegion[] = [];
  public athleteEntries: AthleteEntry[] = [];
  public athleteFiltered: AthleteEntry[] = [];
  public countries: string[] = [];
  
  countriesSelected: string[];
  countrySuggestions: string[];

  constructor(private http: HttpClient){
    this.http.get('data/noc_regions.csv', {responseType: 'text'})
    .subscribe(
        data => {
            let csvToRowArray = data.split("\r");
            console.log('Parsing noc csv');
            for (let index = 1; index < csvToRowArray.length -1; index++) {
              let row = csvToRowArray[index].split(",");
              this.nocEntries.push(new NOCRegion( row[0], row[1], row[2]));
            }
            console.log('done');
            console.log(this.nocEntries);
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
            let countrySet = new Set<string>();
            for (let index = 1; index < csvToRowArray.length -1; index++) {
              let row = csvToRowArray[index].split(",");
              let newEntry = new AthleteEntry(parseInt( row[0], 10), row[1], row[2], parseInt( row[3], 10), parseInt( row[4], 10), parseInt( row[5], 10), row[6], row[7], row[8], parseInt( row[9], 10), row[10], row[11], row[12], row[13], row[14]);
              var specificNOC = this.nocEntries.find(item => '\"' + item.noc + '\"' === newEntry.noc);
              if (specificNOC !== undefined) {
                countrySet.add(specificNOC.region);
              }
              this.athleteEntries.push(newEntry);
            }
            this.countries = [...countrySet];
            console.log('done');
            console.log(this.countries);
            this.athleteFiltered = this.athleteEntries;
        },
        error => {
            console.log(error);
        }
    );
  }

  search(){
    if(this.searchText!== ""){
      this.athleteFiltered = this.athleteEntries.filter(contact =>{
        return contact.name.includes(this.searchText)
      });
    } else {
      this.athleteFiltered = this.athleteEntries;
    }
  }

  searchCountry(event) {
    let nocsFiltered = this.nocEntries.filter(nocEntry =>{
      return nocEntry.region.toLowerCase().includes(event.query.toLowerCase());
    });
    this.countrySuggestions = nocsFiltered.map(nocEntry => nocEntry.region);
  }
  
}

export class NOCRegion {
  noc: string;
  region: string;
  notes: string;

  constructor(noc: string, region: string, notes: string){
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
  noc: string;
  games: String;
  year: number;
  season: String;
  city: String;
  sport: String;
  event: String;
  medal: String;

  constructor(id: number, name: String, sex: String, age: number, height: number, weight: number, team: String, noc: string, games: String, year: number, season: String, city: String, sport: String, event: String, medal: String){
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