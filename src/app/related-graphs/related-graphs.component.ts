import { Component, OnInit } from '@angular/core';
interface ChartEntry {
  name: string,
  id: number
}
@Component({
  selector: 'app-related-graphs',
  templateUrl: './related-graphs.component.html',
  styleUrls: ['./related-graphs.component.scss']
})
export class RelatedGraphsComponent implements OnInit {

  chartEntries: ChartEntry[];
  selectedChart: ChartEntry;

  constructor() { 
    this.chartEntries = [
      { name: 'Country Medals', id: 1 },
    ];
  }

  ngOnInit(): void {
  }
  
  chartSelected(): void {

  }
}
