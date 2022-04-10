import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medal-chart',
  templateUrl: './medal-chart.component.html',
  styleUrls: ['./medal-chart.component.scss']
})
export class MedalChartComponent implements OnInit {

  single: any[] //Array [3, 2, 4] means: 3 gold medals, 2 silver medals and 4 bronze medals
  colorScheme = {
    domain: ['#D4AF37', '#AAA9AD', '#B08D57']
  };



 

  constructor() {
    var single = [{"name": "Gold", "value": 3}, {"name": "Silver", "value": 2}, {"name": "Bronze", "value": 4}]
    //var medals = [4, 3, 2] // TODO: fill in real data
    Object.assign(this, { single })
  }

  ngOnInit(): void {
  }

}
