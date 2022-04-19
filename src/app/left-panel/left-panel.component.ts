import { NOCRegion } from "./../models/NOCRegion";
import { FilterService } from "../filter.service";
import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-left-panel",
  templateUrl: "./left-panel.component.html",
  styleUrls: ["./left-panel.component.scss"],
})
export class LeftPanelComponent implements OnInit/*, OnDestroy */{
  // countriesToSelectFrom: string[] = [];
  // disciplinesToSelectFrom: string[] = [];

  subscriptions: Subscription[] = [];

  constructor(public filterService: FilterService) {}

  ngOnInit(): void {
    // this.subscriptions.push(
    //   this.filterService.countriesToSelectFrom.subscribe((c) => {
    //     replaceArrayContentWithContentOfOtherArray(
    //       this.countriesToSelectFrom,
    //       c
    //     );}
    //   )
    // );
    // this.subscriptions.push(
    //   this.filterService.disciplinesToSelectFrom.subscribe((d) => {
    //      replaceArrayContentWithContentOfOtherArray(
    //       this.disciplinesToSelectFrom,
    //       d
    //     );
    //   }
    //   )
    // );
  }

  // ngOnDestroy(): void {
  //   this.subscriptions.forEach(s => s.unsubscribe());
  // }

  newCountrySelected(event) {
    this.filterService.newCountrySelected(event);
  }

  newDisciplineSelected(event) {
    this.filterService.newDisciplineSelected(event);
  }
}
