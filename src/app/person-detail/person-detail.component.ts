import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss']
})
export class PersonDetailComponent implements OnInit {
  @Input() personData: any;
  medalData: number[] = [];

  constructor() {
    // Set dummy personData for testing the component:
    //let athleteEntryOne = new AthleteEntry();
   }

  ngOnInit(): void {
  }

}
