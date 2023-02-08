
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
import { StationComponent } from './station/station.component';
import { SiteComponent } from './station/site/site.component';
import { ParkingLotComponent } from './station/parking-lot/parking-lot.component';
import { DeviceComponent } from './station/device/device.component';
import { SiteActionComponent } from './station/site/site-action/site-action.component';
import { EngineerComponent } from './engineer/engineer.component';
import { LandlordComponent } from './landlord/landlord.component';
import { MemberComponent } from './member/member.component';
import { ParkingLotActionComponent } from './station/parking-lot/parking-lot-action/parking-lot-action.component';
import { DeviceActionComponent } from './station/device/device-action/device-action.component';
import { BankComponent } from './bank/bank.component';
import { ContractComponent } from './contract/contract.component';
import { WebBannerComponent } from './web-banner/web-banner.component';
import { BankActionComponent } from './bank/bank-action/bank-action.component';
import { ContractActionComponent } from './contract/contract-action/contract-action.component';
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
    HomeComponent,
    StationComponent,
    DeviceComponent,
    SiteComponent,
    SiteActionComponent,
    ParkingLotComponent,
    EngineerComponent,
    LandlordComponent,
    MemberComponent,
    ParkingLotActionComponent,
    DeviceActionComponent,
    BankComponent,
    ContractComponent,
    WebBannerComponent,
    BankActionComponent,
    ContractActionComponent
  ]
})
export class EvseModule {
}
