import { DisciplineEntry } from './discipline-entry';
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
    medal: string;
    disciplineEntry: DisciplineEntry;
    photoUrl: string;

    constructor(id: number, name: string, sex: string, age: number, height: number, weight: number, team: string, noc: string, games: string, year: number, season: string, city: string, sport: string, event: string, medal: string, photoUrl: string) {
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
        this.medal = medal;
        this.disciplineEntry = new DisciplineEntry(sport, event, sex);
        this.photoUrl = photoUrl;
    }
}