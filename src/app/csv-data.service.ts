import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AthleteEntry } from "./models/AhtleteEntry";
import { NOCRegion } from "./models/NOCRegion";
import { Observable } from "rxjs";
import { of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CsvDataService {
  constructor(private http: HttpClient) {}

  private nocRegionsCached: NOCRegion[];
  private athleteEntriesCached: AthleteEntry[];

  public getRegionData(force: boolean = true): Observable<NOCRegion[]> {
    if (!force && this.nocRegionsCached) {
      return of(this.nocRegionsCached);
    } else {
      return this.http
        .get("data/noc_regions.csv", { responseType: "text" })
        .map(
          (data) => {
            let userArray: NOCRegion[] = [];
            let csvToRowArray = data.split("\r");
            console.log("Parsing noc csv");
            for (let index = 1; index < csvToRowArray.length - 1; index++) {
              let row = csvToRowArray[index].split(",");
              userArray.push(new NOCRegion(row[0], row[1], row[2]));
            }
            console.log("done");
            this.nocRegionsCached = userArray;
            return userArray;
          },
          (error) => {
            console.log(error);
            return null;
          }
        );
    }
  }

  public getAthleteData(force: boolean = false): AthleteEntry[] {
    if (!force && this.athleteEntriesCached) {
      return of(this.nocRegionsCached);
    } else {
      this.http
        .get("data/athlete_events.csv", { responseType: "text" })
        .map(
          (data) => {
            let athletesArray: AthleteEntry[] = [];
            let csvToRowArray = data.split("\r");
            console.log("Parsing athletes csv");
            for (let index = 1; index < csvToRowArray.length - 1; index++) {
              let row = csvToRowArray[index].split(",");
              athletesArray.push(
                new AthleteEntry(
                  parseInt(row[0], 10),
                  row[1],
                  row[2],
                  parseInt(row[3], 10),
                  parseInt(row[4], 10),
                  parseInt(row[5], 10),
                  row[6],
                  row[7],
                  row[8],
                  parseInt(row[9], 10),
                  row[10],
                  row[11],
                  row[12],
                  row[13],
                  row[14]
                )
              );
            }
            console.log("done");
            this.athleteEntriesCached = athletesArray;
            return athletesArray;
          },
          (error) => {
            console.log(error);
            return null;
          }
        );
    }
  }
}
