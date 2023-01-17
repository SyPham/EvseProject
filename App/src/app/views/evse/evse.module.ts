
import { SharedModule } from 'src/app/_core/commons/shared.module';

import { CoreDirectivesModule } from 'src/app/_core/_directive/core.directives.module';
// Angular
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
// Components Routing
import { EvseRoutingModule } from './evse-routing.module';

import { NgbModule, NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';

import { ChartModule } from '@syncfusion/ej2-angular-charts';

import { environment } from '../../../environments/environment'
import { PigfarmCoreModule } from '@pigfarm-core';
import { HomeComponent } from './home/home.component';
interface Environment {
  production: boolean;
  apiUrl: string;
  versionCheckURL: string;
  domain: string;
}

@NgModule({
  providers: [
    DatePipe,
    NgbTooltipConfig
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    EvseRoutingModule,
    NgbModule,
    DatePickerAllModule,
    CoreDirectivesModule,
    ChartModule,
    SharedModule.forRoot(),
    PigfarmCoreModule.forRoot(environment.apiUrl),
  ],
  declarations: [
    HomeComponent
  ]
})
export class EvseModule {
}
