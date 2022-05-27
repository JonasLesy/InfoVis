export class Athlete {
    id: number;
    name: string;
    sex: string;
    birthYear: number;
    height: number;
    weight: number;
    noc: string;
    photoUrl: string;
    country: string;

    constructor(id: number, name: string, sex: string, birthYear: number, height: number, weight: number, noc: string, photoUrl: string, country: string) {
        this.id = id;
        this.name = name;
        this.sex = sex;
        this.birthYear = birthYear;
        this.height = height;
        this.weight = weight;
        this.noc = noc;
        this.photoUrl = photoUrl;
        this.country = country
    }
}