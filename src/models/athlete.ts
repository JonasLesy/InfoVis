export class Athlete {
    id: number;
    name: string;
    sex: string;
    birthYear: number;
    height: number;
    weight: number;

    constructor(id: number, name: string, sex: string, birthYear: number, height: number, weight: number) {
        this.id = id;
        this.name = name;
        this.sex = sex;
        this.birthYear = birthYear;
        this.height = height;
        this.weight = weight;
    }
}