import { FilteredDataService } from './filtered-data.service';
import { CsvService } from './csv.service';
import { Injectable } from '@angular/core';
import { CsvData } from 'src/models/csv-data';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private _originalCsvData: CsvData;
  private _filteredAthletesSubsription$;

  //Dit zijn velden specifiek voor de filter. Hierop kunnen de properties in de view zich binden
  private _countrySuggestions: string[] = [];
  public get countrySuggestions(): string[] {
    return this._countrySuggestions;
  }

  private _peopleSuggestions: string[] = [];
  public get peopleSuggestions(): string[] {
    return this._peopleSuggestions;
  }

  private _countriesToFilterOn: string[] = [];
  public get countriesToFilterOn(): string[] {
    return this._countriesToFilterOn;
  }
  public set countriesToFilterOn(v: string[]) {
    this._countriesToFilterOn = v;
  }

  private _peopleToFilterOn: string[] = [];
  public get peopleToFilterOn(): string[] {
    return this._peopleToFilterOn;
  }
  public set peopleToFilterOn(v: string[]) {
    this._peopleToFilterOn = v;
  }

  private _yearRange: number[] = [1896, 2016];
  public get yearRange(): number[] {
    return this._yearRange;
  }
  public set yearRange(v: number[]) {
    this._yearRange = v;
  }

  private _editionOptions: any[];
  public get editionOptions(): any[] {
    return this._editionOptions;
  }

  private _chosenEdition: string = 'all';
  public get chosenEdition(): string {
    return this._chosenEdition;
  }
  public set chosenEdition(v: string) {
    this._chosenEdition = v;
  }

  private _sexOptions: any[];
  public get sexOptions(): any[] {
    return this._sexOptions;
  }

  private _chosenSex: string = 'all';
  public get chosenSex(): string {
    return this._chosenSex;
  }
  public set chosenSex(v: string) {
    this._chosenSex = v;
  }
  //---------------------------------------------------------------------------------------------



  constructor(private csvService: CsvService, private filteredDataService: FilteredDataService) {
    csvService.loadCsvData().subscribe(
      (csvData) => {
        this._originalCsvData = csvData;
        this.filteredDataService.publishFilteredAthletes(this._originalCsvData.athleteEntries);
        this.buildFilteredItems();
      });

      this._editionOptions = [
        { label: 'Summer', value: 'Summer' },
        { label: 'All', value: 'all' },
        { label: 'Winter', value: 'Winter' }
      ];
      this._sexOptions = [
        { label: 'Male', value: 'M' },
        { label: 'All', value: 'all' },
        { label: 'Female', value: 'F' }
      ];
  }

  //Gaat nog niet werken, want data in csvService kan misschien nog niet ingeladen zijn op moment dat gefilterd wordt.
  search(searchText: string): void {
    if (searchText !== "") {
      this.filteredDataService.publishFilteredAthletes(this._originalCsvData.athleteEntries.filter(contact => {
        return contact.name.toLowerCase().includes(searchText.toLowerCase());
      }));
    } else {
      this.filteredDataService.publishFilteredAthletes(this._originalCsvData.athleteEntries);
    }
  }

  searchCountry(searchText: string): void {
    let nocsFiltered = this._originalCsvData.nocRegionEntries.filter(nocEntry => {
      return nocEntry.region.toLowerCase().includes(searchText.toLowerCase());
    });
    this._countrySuggestions = nocsFiltered.map(nocEntry => nocEntry.region);
  }

  searchPerson(searchText: string): void {
    this._peopleSuggestions = this._originalCsvData.persons.filter(person => {
      if (person.toLowerCase().startsWith(searchText.toLowerCase())) {
        return true;
      }
      else {
        return false;
      }
    });
  }

  filterOnAllAttributes() {
    console.log('Filtering on attributes..');
    this.filteredDataService.publishFilteredAthletes(this._originalCsvData.athleteEntries.filter(athleteEntry => {
      // Only add the entry if the selected countries match the athlete
      if (this._countriesToFilterOn.length != 0 && !this.athleteBelongsToListOfCountries(athleteEntry, this._countriesToFilterOn)) {
        return false;
      }
      if (this._peopleToFilterOn.length != 0 && !this._peopleToFilterOn.includes(athleteEntry.name)) {
        return false;
      }
      if(!(athleteEntry.year >= this._yearRange[0] && athleteEntry.year <= this._yearRange[1])) {
        return false;
      }
      if(this._chosenEdition !== 'all' && athleteEntry.season !== this._chosenEdition) {
        return false;
      }
      if(this._chosenSex !== 'all' && athleteEntry.sex !== this._chosenSex) {
        return false;
      }
      return true;
    }));
    this.buildFilteredItems();
    console.log('done');
  }

  private buildFilteredItems() {
    let countrySet = new Set<string>();
    let personSet = new Set<string>();
    if (this._filteredAthletesSubsription$) {
      this._filteredAthletesSubsription$.unsubscribe();
    }
    this._filteredAthletesSubsription$ = this.filteredDataService.filteredAthletesSubject.subscribe(
      fa => {
        fa.forEach(athleteEntry => {
          countrySet.add(this.getRegionForNoc(athleteEntry.noc));
          personSet.add(athleteEntry.name);
        });
        this.filteredDataService.publishFilteredCountries([...countrySet]);
        this.filteredDataService.publishFilteredPersons([...personSet]);
      }
    )
  }

  private athleteBelongsToListOfCountries(athleteEntry, countriesToFilterOn): boolean {
    return countriesToFilterOn.includes(this.getRegionForNoc(athleteEntry.noc));
  }

  private getRegionForNoc(nocToLookFor): string {
    let nocEntry = this._originalCsvData.nocRegionEntries.find(item => item.noc === nocToLookFor);
    return nocEntry !== undefined ? nocEntry.region : "";
  }


}
