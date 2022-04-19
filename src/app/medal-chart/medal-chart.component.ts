import { FilterService } from "./../filter.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { replaceArrayContentWithContentOfOtherArray } from "../helper-classes/array-functions";

@Component({
  selector: "app-medal-chart",
  templateUrl: "./medal-chart.component.html",
  styleUrls: ["./medal-chart.component.scss"],
})
export class MedalChartComponent implements OnInit, OnDestroy {
  medalData: any; //Array [3, 2, 4] means: 3 gold medals, 2 silver medals and 4 bronze medals
  colorScheme = {
    domain: ["#D4AF37", "#AAA9AD", "#B08D57"],
  };
  selectedCountries: string[] = [];
  selectedDisciplines: string[] = [];
  subscriptions: Subscription[] = [];

  constructor(private filterService: FilterService) {}

  ngOnInit(): void {
    this.medalData = {
      labels: ["Gold", "Silver", "Bronze"],
      datasets: [
        {
          data: [3, 2, 4],
          backgroundColor: ["#D4AF37", "#AAA9AD", "#B08D57"],
        },
      ],
    };

    this.subscriptions.push(
      this.filterService.selectedCountriesSubject$.subscribe((v) => {
        replaceArrayContentWithContentOfOtherArray(this.selectedCountries, v);
      })
    );

    this.subscriptions.push(
      this.filterService.selectedDisciplinessSubject$.subscribe((v) => {
        replaceArrayContentWithContentOfOtherArray(this.selectedDisciplines, v);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
