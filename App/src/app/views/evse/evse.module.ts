
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
import { PigfarmCoreModule } from 'herr-core';
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
import { WebNewsComponent } from './web-news/web-news.component';
import { RichTextEditorAllModule, RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { LandlordBankComponent } from './landlord/landlord-bank/landlord-bank.component';
import { AgmCoreModule, LazyMapsAPILoaderConfigLiteral } from '@agm/core';
import { LandlordBankActionComponent } from './landlord/landlord-bank/landlord-bank-action/landlord-bank-action.component';
import { LandlordDetailComponent } from './landlord/landlord-detail/landlord-detail.component';
import { LandlordDeviceComponent } from './landlord/landlord-device/landlord-device.component';
import { LandlordDeviceActionComponent } from './landlord/landlord-device/landlord-device-action/landlord-device-action.component';
import { ImageConfigComponent } from './image-config/image-config.component';
import { ImageConfigActionComponent } from './image-config/image-config-action/image-config-action.component';
import { CreditCardComponent } from './member/credit-card/credit-card.component';
import { CreditCardActionComponent } from './member/credit-card/credit-card-action/credit-card-action.component';
import { FavoriteComponent } from './member/favorite/favorite.component';
import { FavoriteActionComponent } from './member/favorite/favorite-action/favorite-action.component';
import { DiscountComponent } from './member/discount/discount.component';
import { DiscountActionComponent } from './member/discount/discount-action/discount-action.component';
import { MaskedTextBoxModule, UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { CountyComponent } from './county/county.component';
import { CountyActionComponent } from './county/county-action/county-action.component';
import { TownshipComponent } from './county/township/township.component';
import { TownshipActionComponent } from './county/township/township-action/township-action.component';
import { QRCodeGeneratorAllModule } from '@syncfusion/ej2-angular-barcode-generator';
import { RoleComponent } from './role/role.component';
import { ProfileComponent } from './profile/profile.component';
import { ElectricianProfileComponent } from './electrician-profile/electrician-profile.component';
import { SettingRoleComponent } from './setting-role/setting-role.component';
import { Memberv2Component } from './memberv2/memberv2.component';
import { StationStatusComponent } from './station-status/station-status.component';
import { MemberListComponent } from './member-list/member-list.component';
import { InvestorAreaComponent } from './investor-area/investor-area.component';
import { ElectricianStatusComponent } from './electrician-status/electrician-status.component';
import { DeviceUserComponent } from './device-user/device-user.component';
import { AppUpdateComponent } from './app-update/app-update.component';
import { MemberActionComponent } from './memberv2/member-action/member-action.component';

interface Environment {
  production: boolean;
  apiUrl: string;
  versionCheckURL: string;
  domain: string;
}
const mapOptions:  LazyMapsAPILoaderConfigLiteral = {
  apiKey: "AIzaSyAi9VYgdZUeOo2Wngl_5ho1H4_5clWGFTU"
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
    RichTextEditorModule,
    SharedModule.forRoot(),
    MaskedTextBoxModule ,
    QRCodeGeneratorAllModule ,
    UploaderModule,
    PigfarmCoreModule.forRoot(environment.apiUrl)
  ],
  exports: [
    SiteActionComponent
  ],
  declarations: [
    RoleComponent,
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
    ContractActionComponent,
    WebNewsComponent,
    LandlordBankComponent,
    LandlordBankActionComponent,
    LandlordDetailComponent,
    LandlordDeviceComponent,
    LandlordDeviceActionComponent,
    ImageConfigComponent,
    ImageConfigActionComponent,
    CreditCardComponent,
    CreditCardActionComponent,
    FavoriteComponent,
    FavoriteActionComponent,
    DiscountComponent,
    DiscountActionComponent,
    CountyComponent,
    CountyActionComponent,
    TownshipComponent,
    TownshipActionComponent,
    ProfileComponent,
    ElectricianProfileComponent,
    SettingRoleComponent,
    Memberv2Component,
    StationStatusComponent,
    MemberListComponent,
    InvestorAreaComponent,
    ElectricianStatusComponent,
    DeviceUserComponent,
    AppUpdateComponent,
    MemberActionComponent

  ]
})
export class EvseModule {
}
