import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /*
  BASIC STRUCTURE OF THE CODE:
    - load datasets & keep them in original variable, not to be altered
    - initialize filters
    - on change of filter (addition or deletion of filter-value): run filterOnAllAttributes
  
  */
  title = 'InfoVis project';
  searchText: string = '';

  // Original data lists
  nocEntries: NOCRegion[] = [];
  athleteEntries: AthleteEntry[] = [];
  
  // Filters / filtered values
  countriesToFilterOn: string[] = [];
  peopleToFilterOn: string[] = [];
  filteredAthleteEntriesList: AthleteEntry[];
  countries: string[] = [];
  persons: string[] = [];
  yearRange: number[] = [1896, 2016];
  editionOptions: any[];
  chosenEdition: string = 'all';
  sexOptions: any[];
  chosenSex: string = 'all';

  // Variables for visual filtering (autocomplete / suggestions)
  countrySuggestions: string[];
  peopleSuggestions: string[];
  medalData: number[] = [];


  constructor(private http: HttpClient){
    this.editionOptions = [
      { label: 'Summer', value: 'Summer' },
      { label: 'All', value: 'all' },
      { label: 'Winter', value: 'Winter' }
    ];
    this.sexOptions = [
      { label: 'Male', value: 'M' },
      { label: 'All', value: 'all' },
      { label: 'Female', value: 'F' }
    ];

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
            let personSet = new Set<string>();
            for (let index = 1; index < csvToRowArray.length -1; index++) {
              let row = csvToRowArray[index].split(",");
              let newEntry = new AthleteEntry(parseInt( row[0], 10), row[1], row[2], parseInt( row[3], 10), parseInt( row[4], 10), parseInt( row[5], 10), row[6], row[7], row[8], parseInt( row[9], 10), row[10], row[11], row[12], row[13], row[14]);
              var specificNOC = this.nocEntries.find(item => item.noc === newEntry.noc);
              if (specificNOC !== undefined) {
                countrySet.add(specificNOC.region);
              }
              personSet.add(newEntry.name);
              this.athleteEntries.push(newEntry);
            }
            this.countries = [...countrySet];
            this.persons = [...personSet];
            console.log('done');
            //console.log(this.persons);
            this.filteredAthleteEntriesList = this.athleteEntries;
            this.setMedalsData();
        },
        error => {
            console.log(error);
        }
    );

  }

  search(){
    if(this.searchText!== ""){
      this.filteredAthleteEntriesList = this.athleteEntries.filter(contact =>{
        return contact.name.toLowerCase().includes(this.searchText.toLowerCase());
      });
    } else {
      this.filteredAthleteEntriesList = this.athleteEntries;
    }
  }

  searchCountry(event) {
    let nocsFiltered = this.nocEntries.filter(nocEntry =>{
      return nocEntry.region.toLowerCase().includes(event.query.toLowerCase());
    });
    this.countrySuggestions = nocsFiltered.map(nocEntry => nocEntry.region);
  }

  searchPerson(event) {
    this.peopleSuggestions = this.persons.filter(person => { return person.toLowerCase().includes(event.query.toLowerCase())});
  }

  filterOnAllAttributes() {
    console.log('Filtering on attributes..');
    console.log('Year range was' + this.yearRange);
    this.filteredAthleteEntriesList = this.athleteEntries.filter(athleteEntry => {
      // Only add the entry if the selected countries match the athlete
      if (this.countriesToFilterOn.length != 0 && !this.athleteBelongsToListOfCountries(athleteEntry, this.countriesToFilterOn)) {
        return false;
      }
      if (this.peopleToFilterOn.length != 0 && !this.peopleToFilterOn.includes(athleteEntry.name)) {
        return false;
      }
      if(!(athleteEntry.year >= this.yearRange[0] && athleteEntry.year <= this.yearRange[1])) {
        return false;
      }
      if(this.chosenEdition !== 'all' && athleteEntry.season !== this.chosenEdition) {
        return false;
      }
      if(this.chosenSex !== 'all' && athleteEntry.sex !== this.chosenSex) {
        return false;
      }
      return true;
    });
    this.buildDisplayedItems();
    console.log('done');
  }

  buildDisplayedItems() {
    let countrySet = new Set<string>();
    let personSet = new Set<string>();
    this.filteredAthleteEntriesList.forEach(athleteEntry => {
      countrySet.add(this.getRegionForNoc(athleteEntry.noc));
      personSet.add(athleteEntry.name);
    });
    this.countries = [...countrySet];
    this.persons = [...personSet];
    //this.setMedalsData();
  }

  // This method returns false if the given athleteEntry does not belong to the list of countries given
  athleteBelongsToListOfCountries(athleteEntry, countriesToFilterOn) {
    return countriesToFilterOn.includes(this.getRegionForNoc(athleteEntry.noc));
  }

  getRegionForNoc(nocToLookFor) {
    let nocEntry = this.nocEntries.find(item => item.noc === nocToLookFor);
    return nocEntry !== undefined ? nocEntry.region : "";
  }

  setMedalsData() {
    const countOccurrences = (arr, val) => arr.reduce((a, v) => (v.medal === val ? a + 1 : a), 0);
    let goldCount = countOccurrences(this.filteredAthleteEntriesList, "Gold");
    //console.log('gold count is ' + goldCount);
    let silverCount = countOccurrences(this.filteredAthleteEntriesList, "Silver");
    //console.log('silver count is ' + silverCount);
    let bronzeCount = countOccurrences(this.filteredAthleteEntriesList, "Bronze");
    //console.log('bronze count is ' + bronzeCount);
    this.medalData = [goldCount, silverCount, bronzeCount];
    //console.log('done medals');
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
  name: string;
  sex: string;
  age: number;
  height: number;
  weight: number;
  team: string;
  noc: string;
  games: string;
  year: number;
  season: string;
  city: string;
  sport: string;
  event: string;
  medal: string;

  constructor(id: number, name: string, sex: string, age: number, height: number, weight: number, team: string, noc: string, games: string, year: number, season: string, city: string, sport: string, event: string, medal: string){
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