import { FilteredDataService } from './../filtered-data.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-medal-chart',
  templateUrl: './medal-chart.component.html',
  styleUrls: ['./medal-chart.component.scss']
})
export class MedalChartComponent implements OnInit, OnChanges {

  @Input() medalData: number[];
  @Input() medalConfig: any; //Array [3, 2, 4] means: 3 gold medals, 2 silver medals and 4 bronze medals
  colorScheme = {
    domain: ['#D4AF37', '#AAA9AD', '#B08D57']
  };

  constructor(public filteredDataService: FilteredDataService) {

  }

  ngOnInit(): void {
    this.medalConfig = {
      labels: ['Gold', 'Silver', 'Bronze'],
      datasets: [
        {
          data: this.medalData,
          backgroundColor: [
            '#D4AF37', '#AAA9AD', '#B08D57'
          ]
        }
      ]
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    this.ngOnInit();
  }

}
