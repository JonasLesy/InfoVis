import { NOCRegion } from "./../models/NOCRegion";
import { FilterService } from "../filter.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-left-panel",
  templateUrl: "./left-panel.component.html",
  styleUrls: ["./left-panel.component.scss"],
})
export class LeftPanelComponent implements OnInit {
  countriesToSelectFrom: string[];
  disciplinesToSelectFrom: string[];
  selectedCountries: string[] = [];
  selectedDisciplines: string[] = [];

  constructor(public filterService: FilterService) {}

  ngOnInit(): void {
    this.countriesToSelectFrom = this.filterService.countriesToSelectFrom;
    this.disciplinesToSelectFrom = this.filterService.disciplinesToSelectFrom;
  }

  newCountrySelected(event) {
    this.filterService.newCountrySelected(event);
  }

  newDisciplineSelected(event) {
    this.filterService.newDisciplineSelected(event);
  }
}
