import { DisciplineEntry } from './discipline-entry';
import { AthleteEntry } from './athlete-entry';
import { Athlete } from './athlete';
import { NOCRegionEntry } from './noc-region-entry';

export class CsvData {
    nocRegionEntries: NOCRegionEntry[] = [];
    athleteEntries: AthleteEntry[] = [];
    disciplineEntries: DisciplineEntry[] = [];
    countries: string[] = [];
    persons: string[] = [];
    athletes: Athlete[] = [];


    constructor(nocRegionEntries: NOCRegionEntry[],
        athleteEntries: AthleteEntry[],
        countries: string[],
        persons: string[],
        athletes: Athlete[]) {
        this.nocRegionEntries = nocRegionEntries;
        this.athleteEntries = athleteEntries;
        let disciplineSet: Set<string> = new Set<string>();
        this.athleteEntries.forEach(ae => {
            let disciplineString = `${ae.disciplineEntry.event}${ae.disciplineEntry.sport}${ae.disciplineEntry.sex}`;
            if (!disciplineSet.has(disciplineString)) {
                this.disciplineEntries.push(new DisciplineEntry(ae.disciplineEntry.sport, ae.disciplineEntry.event, ae.disciplineEntry.sex))
                disciplineSet.add(disciplineString);
            }
        })
        this.countries = countries;
        this.persons = persons;
        this.athletes = athletes;
    }
}