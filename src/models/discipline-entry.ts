export class DisciplineEntry {
    sport: string;
    event: string;
    sex: string;

    constructor(sport: string, event: string, sex: string) {
        this.sport = sport;
        this.event = event;
        this.sex = sex;
    }

    public equals(disciplineEntry: DisciplineEntry):boolean {
        let result = this.sport === disciplineEntry.sport && this.event === disciplineEntry.event && this.sex === disciplineEntry.sex;
        if (result) {
            return true;
        }
        return false;
    }
}

