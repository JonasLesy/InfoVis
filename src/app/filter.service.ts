import { DisciplineEntry } from 'src/models/discipline-entry';
import { FilteredDataService } from './filtered-data.service';
import { CsvService } from './csv.service';
import { Injectable } from '@angular/core';
import { CsvData } from 'src/models/csv-data';
import { Athlete } from 'src/models/athlete';
import { AthleteEntry } from 'src/models/athlete-entry';
import { take } from 'rxjs/operators';
import { disciplineSortFunction } from 'src/helpers/discipline-sort-function';


@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private _originalCsvData: CsvData;
  private _selectAthleteFromListSubscription$;

  //Dit zijn velden specifiek voor de filter. Hierop kunnen de properties in de view zich binden
  private _selectedAthlete: Athlete;
  public get selectedAthlete(): Athlete {
    return this._selectedAthlete;
  }

  private _selectedDiscipline: DisciplineEntry;
  public get selectedDiscipline(): DisciplineEntry {
    return this._selectedDiscipline;
  }

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
        this.filteredDataService.publishFilteredAthleteEntries(this._originalCsvData.athleteEntries);
        this.filteredDataService.publishFilteredDisciplines(this._originalCsvData.disciplineEntries.sort(disciplineSortFunction));
        this.filterAndPublishAthletesOnAllAttributesAndSelectedDiscipline(this._originalCsvData.athleteEntries);
        this.filterAndPublishDisciplinesOnAllAttributesAndSelectedAthlete(this._originalCsvData.athleteEntries);
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
    this.filteredDataService.publishChosenEdition(this._chosenEdition);
    this.filteredDataService.publishChosenSex(this.chosenSex);
    this.filteredDataService.publishFilteredAthleteEntries(athleteEntries);
    this.filterAndPublishAthletesOnAllAttributesAndSelectedDiscipline(athleteEntries);
    this.filterAndPublishDisciplinesOnAllAttributesAndSelectedAthlete(athleteEntries);
  }

  filterAndPublishAthletesOnAllAttributesAndSelectedDiscipline(athleteEntries: AthleteEntry[]) {
    let athleteSet: Set<string> = new Set<string>();
    let athletes: Athlete[] = [];
    athleteEntries.forEach((athleteEntry: AthleteEntry) => {
      if (this._selectedDiscipline && athleteEntry.disciplineEntry) {
        if (this.disciplineEntriesEqual(this._selectedDiscipline, athleteEntry.disciplineEntry)) {
          if (!athleteSet.has(athleteEntry.name)) {
            athleteSet.add(athleteEntry.name);
            athletes.push(new Athlete(athleteEntry.id, athleteEntry.name, athleteEntry.sex, athleteEntry.year - athleteEntry.age, athleteEntry.height, athleteEntry.weight, athleteEntry.noc));
          }
        }
      }
      else {
        if (!athleteSet.has(athleteEntry.name)) {
          athleteSet.add(athleteEntry.name);
          athletes.push(new Athlete(athleteEntry.id, athleteEntry.name, athleteEntry.sex, athleteEntry.year - athleteEntry.age, athleteEntry.height, athleteEntry.weight, athleteEntry.noc));
        }
      }
    });
    this.filteredDataService.publishFilteredAthletes(athletes);
  }

  public disciplineEntriesEqual(disciplineEntry1: DisciplineEntry, disciplineEntry2: DisciplineEntry): boolean {
    let result = disciplineEntry1.sport === disciplineEntry2.sport && disciplineEntry1.event === disciplineEntry2.event && disciplineEntry1.sex === disciplineEntry2.sex;
    if (result) {
      return true;
    }
    return false;
  }

  filterAndPublishDisciplinesOnAllAttributesAndSelectedAthlete(athleteEntries: AthleteEntry[]) {
    let disciplineSet: Set<string> = new Set<string>();
    athleteEntries.forEach((ae: AthleteEntry) => {
      if (this._selectedAthlete) {
        if (ae.name == this._selectedAthlete.name) {
          disciplineSet.add(JSON.stringify(ae.disciplineEntry));
        }
      }
      else {
        disciplineSet.add(JSON.stringify(ae.disciplineEntry));
      }
    });
    this.filteredDataService.publishFilteredDisciplines(Array.from(disciplineSet).map(el => JSON.parse(el)));
  }

  private selectAthleteFromList(filteredAthletes: AthleteEntry[]): void {
    this.filteredDataService.selectedAthleteSubject.pipe(take(1)).subscribe(a => { // take(1) is HEEL belangrijk hier. Anders komen we in een infinite loop terecht omdat de subscribe methode anders blijft uitgevoerd worden. In searchAndSelectFirstAthleteEntryByName gaan we namelijk een nieuwe waarde publishen op de selectedAthleteSubject waardoor ook de subscribe methode opnieuw zou worden uitgevoerd (en opnieuw en opnieuw en opnieuw en opnieuw 0:22 https://www.youtube.com/watch?v=F6CIlxDryJY)
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
    if (this._selectedAthlete && this._selectedAthlete.name === athleteName) {
      this._selectedAthlete = null;
      this.filteredDataService.filteredAthleteEntriesSubject.pipe(take(1)).subscribe((a: AthleteEntry[]) => {
        this.filterAndPublishDisciplinesOnAllAttributesAndSelectedAthlete(a);
        this.filteredDataService.publishSelectedAthlete(this._selectedAthlete);
        let selectedFilteredAthletes = a.filter(ae => (!this._selectedAthlete || (this._selectedAthlete && this._selectedAthlete.name === ae.name)) && (!this._selectedDiscipline || (this._selectedDiscipline && this.disciplineEntriesEqual(ae.disciplineEntry, this._selectedDiscipline))));
        this.filteredDataService.publishSelectedFilteredAthleteEntries(selectedFilteredAthletes);
      });
    }
    else {
      let selectedAthlete = this._originalCsvData.athletes.find(athlete => athlete.name === athleteName);
      this._selectedAthlete = selectedAthlete;
      this.filteredDataService.filteredAthleteEntriesSubject.pipe(take(1)).subscribe((a: AthleteEntry[]) => {
        this.filterAndPublishDisciplinesOnAllAttributesAndSelectedAthlete(a);
        this.filteredDataService.publishSelectedAthlete(this._selectedAthlete);
        this.filteredDataService.publishSelectedFilteredAthleteEntries(a.filter(ae => (!this._selectedAthlete || (this._selectedAthlete && this._selectedAthlete.name === ae.name)) && (!this._selectedDiscipline || (this._selectedDiscipline && this.disciplineEntriesEqual(ae.disciplineEntry, this._selectedDiscipline)))));
      });
    }
  }

  searchAndSelectFirstDiscipline(discipline: DisciplineEntry) {
    if (this._selectedDiscipline && this.disciplineEntriesEqual(this._selectedDiscipline, discipline)) {
      this._selectedDiscipline = null;
      this.filteredDataService.filteredAthleteEntriesSubject.pipe(take(1)).subscribe((a: AthleteEntry[]) => {
        this.filterAndPublishAthletesOnAllAttributesAndSelectedDiscipline(a);
        this.filteredDataService.publishSelectedDiscipline(this._selectedDiscipline);
        this.filteredDataService.publishSelectedFilteredAthleteEntries(a.filter(ae => (!this._selectedAthlete || (this._selectedAthlete && this._selectedAthlete.name === ae.name)) && (!this._selectedDiscipline || (this._selectedDiscipline && this.disciplineEntriesEqual(ae.disciplineEntry, this._selectedDiscipline)))));
      });
    }
    else {
      this._selectedDiscipline = discipline;
      this.filteredDataService.filteredAthleteEntriesSubject.pipe(take(1)).subscribe((a: AthleteEntry[]) => {
        this.filterAndPublishAthletesOnAllAttributesAndSelectedDiscipline(a);
        this.filteredDataService.publishSelectedDiscipline(this._selectedDiscipline);
        this.filteredDataService.publishSelectedFilteredAthleteEntries(a.filter(ae => (!this._selectedAthlete || (this._selectedAthlete && this._selectedAthlete.name === ae.name)) && (!this._selectedDiscipline || (this._selectedDiscipline && this.disciplineEntriesEqual(ae.disciplineEntry, this._selectedDiscipline)))));
      });
    }
  }

  calculateMedalsForCountryForYearRange(country: string, startYear: number, endYear: number, selectedDiscipline: DisciplineEntry, season: string, chosenSex: string): [Map<number, number>, Map<number, number>, Map<number, number>] {
    let bronzeList: Map<number, number> = new Map<number, number>();
    let silverList: Map<number, number> = new Map<number, number>();
    let goldList: Map<number, number> = new Map<number, number>();
    let countryAtheteEntries: AthleteEntry[] = this._originalCsvData.athleteEntries.filter(athleteEntry => (((!season || season === 'all') || (athleteEntry.season === season)) && athleteEntry.noc === country && ((!chosenSex || chosenSex === 'all') || (athleteEntry.sex === chosenSex)) && athleteEntry.year >= startYear && athleteEntry.year <= endYear && (!selectedDiscipline || athleteEntry.disciplineEntry.equals(selectedDiscipline))));
    countryAtheteEntries.map(countryAtheteEntry => {
      let entryYear = countryAtheteEntry.year;
      if (countryAtheteEntry.medal === "Bronze") {
        bronzeList.set(entryYear, ((bronzeList.has(entryYear)) ? bronzeList.get(entryYear) + 1 : 1));
      } else if (countryAtheteEntry.medal === "Silver") {
        silverList.set(entryYear, ((silverList.has(entryYear)) ? silverList.get(entryYear) + 1 : 1));
      } else if (countryAtheteEntry.medal === "Gold") {
        goldList.set(entryYear, ((goldList.has(entryYear)) ? goldList.get(entryYear) + 1 : 1));
      }
    })
    return [bronzeList, silverList, goldList];
  }

  calculateAverageAgesForYearRange(startYear: number, endYear: number, selectedDiscipline: DisciplineEntry, season: string, chosenSex: string, chosenCountries: string[]): [Map<number, number>, Map<number, number>, Map<number, number>] {
    let maleList: Map<number, number> = new Map<number, number>();
    let femaleList: Map<number, number> = new Map<number, number>();
    let totalList: Map<number, number> = new Map<number, number>();
    let matchesFiltersAtheteEntries: AthleteEntry[] = this._originalCsvData.athleteEntries.filter(athleteEntry => (((!season || season === 'all') || (athleteEntry.season === season)) && (chosenCountries.length == 0 || chosenCountries.includes(athleteEntry.noc)) && ((!chosenSex || chosenSex === 'all') || (athleteEntry.sex === chosenSex)) && athleteEntry.year >= startYear && athleteEntry.year <= endYear && (!selectedDiscipline || athleteEntry.disciplineEntry.equals(selectedDiscipline))));
    //console.log('Got total entries:');
    //console.log(matchesFiltersAtheteEntries);
    let currentYear = startYear;
    while (currentYear <= endYear) {
      // First get athleteEntries in current year
      let yearRangeAtheteEntries: AthleteEntry[] = matchesFiltersAtheteEntries.filter(athleteEntry => athleteEntry.year === currentYear);
      //console.log('Got entries:');
      //console.log(yearRangeAtheteEntries);
      // Get all unique IDs, we don't want to use the same athlete twice!
      let uniqueEntries = yearRangeAtheteEntries.filter((e, i) => {
        return yearRangeAtheteEntries.findIndex((x) => {
        return x.id == e.id && x.name == e.name;}) == i;

    });
      //const uniqueEntries = new Set(yearRangeAtheteEntries.map(athleteEntry => (athleteEntry.id, athleteEntry.name)));
      let maleAges: number[] = [];
      let femaleAges: number[] = [];
      uniqueEntries.map(athleteEntry => {
        //console.log("Got id: " + id);
        //let athleteEntry = yearRangeAtheteEntries.find(athleteEntry => id = athleteEntry.id && athleteEntry.name === name);
        if (athleteEntry && athleteEntry.age && athleteEntry.age !== undefined) {
          if (athleteEntry.sex === 'M') {
            maleAges.push(athleteEntry.age);
            //console.log('Found male');
          } else {
            femaleAges.push(athleteEntry.age);
            //console.log('Found female');
          }
        }
      });

      const sumMales = maleAges.reduce((accumulator, current) => {
        return accumulator + current;
      }, 0);

      const sumFemales = femaleAges.reduce((accumulator, current) => {
        return accumulator + current;
      }, 0);
      //console.log("Got date for " + currentYear + " sumMales: " + sumMales + " sumFemales: " + sumFemales);
      if (maleAges.length != 0) {
        maleList.set(currentYear, sumMales / maleAges.length);
      }
      if (femaleAges.length != 0) {
        femaleList.set(currentYear, sumFemales / femaleAges.length);
      }
      let totalSize = maleAges.length + femaleAges.length;
      if (totalSize != 0) {
        totalList.set(currentYear, (sumMales + sumFemales) / totalSize);
      }

      currentYear += 2;
    }


    return [maleList, femaleList, totalList];
  }

  private athleteBelongsToListOfCountries(athleteEntry, countriesToFilterOn): boolean {
    return countriesToFilterOn.includes(this.getRegionForNoc(athleteEntry.noc));
  }

  private getRegionForNoc(nocToLookFor): string {
    let nocEntry = this._originalCsvData.nocRegionEntries.find(item => item.noc === nocToLookFor);
    return nocEntry !== undefined ? nocEntry.region : "";
  }


}
