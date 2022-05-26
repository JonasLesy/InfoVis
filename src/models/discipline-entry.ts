export class DisciplineEntry {
    sport: string;
    event: string;
    sex: string;

    constructor(sport: string, event: string, sex: string) {
        this.sport = sport;
        this.event = event;
        this.sex = sex;
    }

    public equals(disciplineEntry2: DisciplineEntry): boolean {
        let result = this.sport === disciplineEntry2.sport && this.event === disciplineEntry2.event && this.sex === disciplineEntry2.sex;
        if (result) {
            return true;
        }
        return false;
    }
}

