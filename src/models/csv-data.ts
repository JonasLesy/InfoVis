import { AthleteEntry } from './athlete-entry';
import { Athlete } from './athlete';
import { NOCRegionEntry } from './noc-region-entry';

export class CsvData {
    nocRegionEntries: NOCRegionEntry[];
    athleteEntries: AthleteEntry[];
    countries: string[];
    persons: string[];
    athletes: Athlete[];


    constructor(nocRegionEntries: NOCRegionEntry[],
        athleteEntries: AthleteEntry[],
        countries: string[],
        persons: string[],
        athletes: Athlete[]) {
        this.nocRegionEntries = nocRegionEntries;
        this.athleteEntries = athleteEntries;
        this.countries = countries;
        this.persons = persons;
        this.athletes = athletes;
    }
}