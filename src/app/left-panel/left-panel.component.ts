import { NOCRegion } from "./../models/NOCRegion";
import { FilterService } from "../filter.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-left-panel",
  templateUrl: "./left-panel.component.html",
  styleUrls: ["./left-panel.component.scss"],
})
export class LeftPanelComponent implements OnInit {
  countriesToSelectFrom: NOCRegion[];
  selectedCountries: string[] = [];

  constructor(public filterService: FilterService) {}

  ngOnInit(): void {
    this.countriesToSelectFrom = this.filterService.countriesToSelectFrom;
  }

  newCountrySelected(event) {
    this.filterService.newCountrySelected(event);
  }
}
