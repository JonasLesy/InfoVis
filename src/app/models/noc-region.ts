export class NOCRegion {
    noc: string;
    region: string;
    notes: string;

    constructor(noc: string, region: string, notes: string) {
        this.noc = noc;
        this.region = region;
        this.notes = notes;
    }
}