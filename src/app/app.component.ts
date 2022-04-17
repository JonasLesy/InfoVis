import { CsvDataService } from "./csv-data.service";
import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NOCRegion } from "./models/NOCRegion";
import { AthleteEntry } from "./models/AhtleteEntry";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "InfoVis project";

  public userArray: NOCRegion[] = [];
  public athleteEntries: AthleteEntry[] = [];

  constructor(private csvDataService: CsvDataService) {}

  ngOnInit(): void {
    this.userArray = this.csvDataService.getRegionData();
    this.athleteEntries = this.csvDataService.getAhtleteData();
  }
}
