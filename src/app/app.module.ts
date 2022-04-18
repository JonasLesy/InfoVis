import { CsvDataService } from './csv-data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MedalChartComponent } from './medal-chart/medal-chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartModule } from 'primeng/chart';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, MedalChartComponent, LeftPanelComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ChartModule,
    FormsModule,
    MultiSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
