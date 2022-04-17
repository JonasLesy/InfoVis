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

    constructor(id: number, name: String, sex: String, age: number, height: number, weight: number, team: String, noc: String, games: String, year: number, season: String, city: String, sport: String, event: String, medal: String) {
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