import { FilterService } from './../filter.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  athleteInput: string = "";

  constructor(public filterService: FilterService) { }

  ngOnInit(): void {
  }

  athleteInputChanged(text: string) {
    this.athleteInput = text;
  }

}
