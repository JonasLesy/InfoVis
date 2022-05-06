import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MedalChartComponent } from './medal-chart/medal-chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ChartModule } from 'primeng/chart';
import { SliderModule } from 'primeng/slider';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SelectButtonModule } from 'primeng/selectbutton';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {TableModule} from 'primeng/table';

import { TopBarComponent } from './top-bar/top-bar.component';
import { SelectionComponent } from './selection/selection.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    MedalChartComponent,
    TopBarComponent,
    SelectionComponent,
    PersonDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ChartModule,
    SliderModule,
    SelectButtonModule,
    VirtualScrollerModule,
    TableModule,
    AutoCompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
