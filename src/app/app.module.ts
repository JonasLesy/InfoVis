import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MedalChartComponent } from './medal-chart/medal-chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartModule } from 'primeng/chart';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SliderModule } from 'primeng/slider';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { ListboxModule } from 'primeng/listbox';
import { SidebarSelectComponent } from './sidebar-select/sidebar-select.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';

import { AthleteService } from './services/athlete.service';

@NgModule({
  declarations: [
    AppComponent,
    MedalChartComponent,
    SidebarSelectComponent,
    PersonDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ChartModule,
    AutoCompleteModule,
    SliderModule,
    SelectButtonModule,
    ButtonModule,
    MultiSelectModule,
    ListboxModule
  ],
  providers: [
    AthleteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
