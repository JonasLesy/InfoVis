import { DisciplineEntry } from 'src/models/discipline-entry';
import { FilteredDataService } from './filtered-data.service';
import { CsvService } from './csv.service';
import { Injectable } from '@angular/core';
import { CsvData } from 'src/models/csv-data';
import { Athlete } from 'src/models/athlete';
import { AthleteEntry } from 'src/models/athlete-entry';
import { take } from 'rxjs/operators';
import { disciplineSortFunction } from 'src/helpers/discipline-sort-function';
import { JsonPipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private _originalCsvData: CsvData;
  private _filteredAthletesSubsription$;
  private _selectAthleteFromListSubscription$;
  private _selectedAthlete: Athlete;
  private _selectedDiscipline: DisciplineEntry;


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
        this.filteredDataService.publishFilteredDisciplines(this._originalCsvData.disciplineEntries.sort(disciplineSortFunction));
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
        // Goal: Van Den matches with Van Den Eynde, also: Van de matches with Van Den Eynde
        // Search: "Van De" -> split = ["Van", "De"]
        // SourceVal: "Pieter Van Den Eynde" -> split = ["Pieter", "Van", "Den", "Eynde"]
        let nameParts: string[] = person.toLowerCase().split(' ');
        let searchParts: string[] = searchText.toLowerCase().split(' ');


        // If the searchParts only contains one entry, just check if any part of the nameParts starts with this one
        if (searchParts.length == 1) {
          return nameParts.some(function (part) {
            return part.startsWith(searchParts[0]);
          });
        }

        // Loop through nameParts "Pieter", "Van", "Den", "Eynde"
        //                            ^
        //                            |
        // Loop through searchParts "Van" = no match => next nameParts index
        //                                    ^
        //                                    |
        //                                  "Van"

        // Loop through name parts & through search parts
        // For each search part: if it matches namepart & set searchPart++

        let i = 0;
        let j = 0;
        while (i < nameParts.length) {
          searchPartsLoop:
          while (j < searchParts.length) {
            if (j == searchParts.length - 1) {
              return nameParts[i].startsWith(searchParts[j]);
            } else if (nameParts[i] !== searchParts[j]) {
              break searchPartsLoop; // break out of current loop and move to next namePart
            } else {
              i++; // Compare next searchPart[j] with next nameParts[i]
            }
            j++;
          }
          i++;
        }
      }
    });
  }

  filterOnAllAttributes() {
    console.log('Filtering on attributes..');
    // Reset the selected athlete before filter
    // this.filteredDataService.publishSelectedAthlete(null);
    let athleteEntries = this._originalCsvData.athleteEntries.filter(athleteEntry => {
      // Only add the entry if the selected countries match the athlete
      if (this._countriesToFilterOn.length != 0 && !this.athleteBelongsToListOfCountries(athleteEntry, this._countriesToFilterOn)) {
        return false;
      }
      if (this._peopleToFilterOn.length != 0 && !this._peopleToFilterOn.includes(athleteEntry.name)) {
        return false;
      }
      if (!(athleteEntry.year >= this._yearRange[0] && athleteEntry.year <= this._yearRange[1])) {
        return false;
      }
      if (this._chosenEdition !== 'all' && athleteEntry.season !== this._chosenEdition) {
        return false;
      }
      if (this._chosenSex !== 'all' && athleteEntry.sex !== this._chosenSex) {
        return false;
      }
      return true;
    });
    this.filteredDataService.publishFilteredAthletes(athleteEntries);

    this.buildFilteredItems();
    if (athleteEntries.length > 0) {
      this.selectAthleteFromList(athleteEntries);
    }
  }

  private selectAthleteFromList(filteredAthletes: AthleteEntry[]): void {
    if (this._selectAthleteFromListSubscription$) {
      this._selectAthleteFromListSubscription$.unsubscribe();
    }
    this._selectAthleteFromListSubscription$ = this.filteredDataService.selectedAthleteSubject.pipe(take(1)).subscribe(a => { // take(1) is HEEL belangrijk hier. Anders komen we in een infinite loop terecht omdat de subscribe methode anders blijft uitgevoerd worden. In searchAndSelectFirstAthleteEntryByName gaan we namelijk een nieuwe waarde publishen op de selectedAthleteSubject waardoor ook de subscribe methode opnieuw zou worden uitgevoerd (en opnieuw en opnieuw en opnieuw en opnieuw 0:22 https://www.youtube.com/watch?v=F6CIlxDryJY)
      if (a) {
        let selectedAthlete: Athlete = a;
        let selectedAthleteInFilteredAthletes = filteredAthletes.find(a => a.id == selectedAthlete.id);
        if (selectedAthleteInFilteredAthletes) {
          this.searchAndSelectFirstAthleteEntryByName(selectedAthlete.name);
        }
        else {
          this.searchAndSelectFirstAthleteEntryByName(filteredAthletes[0].name);
        }
      }
    });
  }

  searchAndSelectFirstAthleteEntryByName(athleteName: string): void {
    let selectedAthlete = this._originalCsvData.athletes.find(athlete => athlete.name === athleteName);
    if (selectedAthlete.id === this._selectedAthlete?.id) {
      this.filteredDataService.publishSelectedAthlete(null);
      this.filteredDataService.publishSelectedFilteredAthletes(null);
    }
    else {
      this.filteredDataService.filteredAthletesSubject.pipe(take(1)).subscribe( // take(1) is HEEL belangrijk hier. Anders komen we in een infinite loop terecht omdat de subscribe methode anders blijft uitgevoerd worden omdat we in deze subscribe methode zelf ook entries publishen op de subject. take(1) zorgt ervoor dat de subscribe maar max 1 keer gedaan wordt.
        athleteEntries => { // We gebruiken hier de athleteEntries komende van de filteredAthletesSubject i.p.v. uit de csv. Anders voldoet de tabel met medaille-entries niet aan de filter.
          let entries = athleteEntries.filter(athleteEntry => athleteEntry.id === selectedAthlete.id);
          this.filteredDataService.publishSelectedAthlete(selectedAthlete);
          this.filteredDataService.publishSelectedFilteredAthletes(entries);
          this._selectedAthlete = selectedAthlete;
        }
      );
    }


  }

  calculateMedalsForCountryForYearRange(country: string, startYear: number, endYear: number): [Map<number, number>, Map<number, number>, Map<number, number>] {
    let bronzeList: Map<number, number> = new Map<number, number>();
    let silverList: Map<number, number> = new Map<number, number>();
    let goldList: Map<number, number> = new Map<number, number>();
    let countryAtheteEntries: AthleteEntry[] = this._originalCsvData.athleteEntries.filter(athleteEntry => athleteEntry.noc === country && athleteEntry.year >= startYear && athleteEntry.year <= endYear);
    countryAtheteEntries.map(countryAtheteEntry => {
      let entryYear = countryAtheteEntry.year;
      if (countryAtheteEntry.medal === "Bronze") {
        bronzeList.set(entryYear, ((bronzeList.has(entryYear)) ? bronzeList.get(entryYear) + 1 : 1));
      } else if (countryAtheteEntry.medal === "Silver") {
        silverList.set(entryYear, ((bronzeList.has(entryYear)) ? silverList.get(entryYear) + 1 : 1));
      } else if (countryAtheteEntry.medal === "Gold") {
        goldList.set(entryYear, ((bronzeList.has(entryYear)) ? goldList.get(entryYear) + 1 : 1));
      }
    })
    return [bronzeList, silverList, goldList];
  }

  searchAndSelectFirstDiscipline(discipline: DisciplineEntry) {
    if (this._selectedDiscipline && this._selectedDiscipline.event === discipline.event && this._selectedDiscipline.sex === discipline.sex && this._selectedDiscipline.sport === discipline.sport) {
      this.filteredDataService.publishSelectedDiscipline(null);
      this.searchAndSelectFirstAthleteEntryByName(this._selectedAthlete.name);
    }
    else {
      this.filteredDataService.publishSelectedDiscipline(discipline);
      this.filteredDataService.filteredAthletesSubject.pipe(take(1)).subscribe( // take(1) is HEEL belangrijk hier. Anders komen we in een infinite loop terecht omdat de subscribe methode anders blijft uitgevoerd worden omdat we in deze subscribe methode zelf ook entries publishen op de subject. take(1) zorgt ervoor dat de subscribe maar max 1 keer gedaan wordt.
        athleteEntries => { // We gebruiken hier de athleteEntries komende van de filteredAthletesSubject i.p.v. uit de csv. Anders voldoet de tabel met medaille-entries niet aan de filter.
          let entries = athleteEntries.filter((athleteEntry: AthleteEntry) => athleteEntry.disciplineEntry.equals(discipline));
          this.filteredDataService.publishSelectedAthlete(null);
          this.filteredDataService.publishSelectedFilteredAthletes(null);
          this.filteredDataService.publishFilteredAthletes(entries);
          this._selectedAthlete = null;
          this.buildFilteredItems();
          if (athleteEntries.length > 0) {
            this.selectAthleteFromList(athleteEntries);
          }
        }
      );
    }
  }

  private buildFilteredItems() {
    let athleteSet: Set<string> = new Set<string>();
    let disciplineSet: Set<string> = new Set<string>();
    let athletes: Athlete[] =[];

    if (this._filteredAthletesSubsription$) {
      this._filteredAthletesSubsription$.unsubscribe();
    }
    this._filteredAthletesSubsription$ = this.filteredDataService.filteredAthletesSubject.subscribe(
      fa => {
        fa.forEach((athleteEntry: AthleteEntry) => {
          if (!athleteSet.has(athleteEntry.name)) {
            athleteSet.add(athleteEntry.name);
            athletes.push(new Athlete(athleteEntry.id, athleteEntry.name, athleteEntry.sex, athleteEntry.year - athleteEntry.age, athleteEntry.height, athleteEntry.weight, athleteEntry.noc));
          }
          disciplineSet.add(JSON.stringify(athleteEntry.disciplineEntry));
        });
        this.filteredDataService.publishFilteredAthletes2(athletes); 
        this.filteredDataService.publishFilteredDisciplines(Array.from(disciplineSet).map(el => JSON.parse(el))); // https://stackoverflow.com/questions/39950597/typescript-set-of-objects
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
