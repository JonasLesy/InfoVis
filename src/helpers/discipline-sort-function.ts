import { DisciplineEntry } from 'src/models/discipline-entry';

export function disciplineSortFunction(disciplineA: DisciplineEntry, disciplineB: DisciplineEntry) {
    if (disciplineA.sport === disciplineB.sport) {
        return 0;
    }
    if (disciplineA.sport < disciplineB.sport) {
        return -1
    }
    return 1;
}