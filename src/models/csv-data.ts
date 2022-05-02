import { AthleteEntry } from './athlete-entry';
import { NOCRegionEntry } from './noc-region-entry';

export class CsvData {
    nocRegionEntries: NOCRegionEntry[];
    athleteEntries: AthleteEntry[];
    countries: string[];
    persons: string[];


    constructor(nocRegionEntries: NOCRegionEntry[],
        athleteEntries: AthleteEntry[],
        countries: string[],
        persons: string[]) {
        this.nocRegionEntries = nocRegionEntries;
        this.athleteEntries = athleteEntries;
        this.countries = countries;
        this.persons = persons;
    }
}