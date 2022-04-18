import { FilterService } from "./../filter.service";
import { Component, OnInit } from "@angular/core";
import { replaceArrayContentWithContentOfOtherArray } from "../helper-classes/array-functions";

@Component({
  selector: "app-medal-chart",
  templateUrl: "./medal-chart.component.html",
  styleUrls: ["./medal-chart.component.scss"],
})
export class MedalChartComponent implements OnInit {
  medalData: any; //Array [3, 2, 4] means: 3 gold medals, 2 silver medals and 4 bronze medals
  colorScheme = {
    domain: ["#D4AF37", "#AAA9AD", "#B08D57"],
  };

  constructor(private filterService: FilterService) {}

  selectedCountriesSubscription;
  selectedCountries: string[] = [];

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

    this.selectedCountriesSubscription = this.filterService.selectedCountriesSubject$.subscribe(
      (v) => {
        replaceArrayContentWithContentOfOtherArray(this.selectedCountries, v);
      }
    );
  }
}
