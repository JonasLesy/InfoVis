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
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';

import { TopBarComponent } from './top-bar/top-bar.component';
import { SelectionComponent } from './selection/selection.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { RelatedGraphCountryMedalsComponent } from './related-graph-country-medals/related-graph-country-medals.component';
import { RelatedGraphsComponent } from './related-graphs/related-graphs.component';
import { RelatedGraphAverageAgeComponent } from './related-graph-average-age/related-graph-average-age.component';
import { OlympicEntriesComponent } from './olympic-entries/olympic-entries.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RelatedGraphDisciplineComponent } from './related-graph-discipline/related-graph-discipline.component';


@NgModule({
  declarations: [
    AppComponent,
    MedalChartComponent,
    TopBarComponent,
    SelectionComponent,
    PersonDetailComponent,
    RelatedGraphCountryMedalsComponent,
    RelatedGraphsComponent,
    RelatedGraphAverageAgeComponent,
    OlympicEntriesComponent,
    RelatedGraphDisciplineComponent
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
    AutoCompleteModule,
    DropdownModule,
    TabViewModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
