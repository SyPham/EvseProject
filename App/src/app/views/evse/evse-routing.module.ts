
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_core/_guards/auth.guard';
import { EngineerComponent } from './engineer/engineer.component';
import { HomeComponent } from './home/home.component';
import { LandlordComponent } from './landlord/landlord.component';
import { MemberComponent } from './member/member.component';
import { StationComponent } from './station/station.component';
import { BankComponent } from './bank/bank.component';
import { ContractComponent } from './contract/contract.component';
import { WebBannerComponent } from './web-banner/web-banner.component';
import { WebNewsComponent } from './web-news/web-news.component';
import { ImageConfigComponent } from './image-config/image-config.component';
import { CountyComponent } from './county/county.component';
import { RoleComponent } from './role/role.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingRoleComponent } from './setting-role/setting-role.component';
import { StationStatusComponent } from './station-status/station-status.component';
import { ElectricianStatusComponent } from './electrician-status/electrician-status.component';
import { InvestorAreaComponent } from './investor-area/investor-area.component';
import { SiteComponent } from './site/site.component';
import { AppUpdateComponent } from './app-update/app-update.component';
import { MemberListComponent } from './member-list/member-list.component';
import { DeviceUserComponent } from './device-user/device-user.component';
import { Memberv2Component } from './memberv2/memberv2.component';
import { MemberActionComponent } from './memberv2/member-action/member-action.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { EngineerErrorReportComponent } from './engineer-error-report/engineer-error-report.component';
import { ElectricianErrorReportComponent } from './electrician-error-report/electrician-error-report.component';
import { EngineerErrorReportActionComponent } from './engineer-error-report/engineer-error-report-action/engineer-error-report-action.component';

const routes: Routes = [
  {
    path: 'evse/role',
    component: RoleComponent,
    data: {
      title: 'Role',
      breadcrumb: 'Role',
      functionCode: 'Role'
    },
  // canActivate: [AuthGuard]
  },
  {
    path: 'evse/county',
    component: CountyComponent,
    data: {
      title: 'County',
      breadcrumb: 'County',
      functionCode: 'County'
    },
  // canActivate: [AuthGuard]
  },
   {
    path: 'evse/home',
    component: HomeComponent,
    data: {
      title: 'Home',
      breadcrumb: 'Home',
      functionCode: 'Home'
    },
  //  canActivate: [AuthGuard]
  },
  {
    path: 'evse/site2',
    component: StationComponent,
    data: {
      title: 'Site2',
      breadcrumb: 'Site2',
      functionCode: 'Site2'
    },
   canActivate: [AuthGuard]
  },
  {
    path: 'evse/landlord',
    component: LandlordComponent,
    data: {
      title: 'Landlord',
      breadcrumb: 'Landlord',
      functionCode: 'Landlord'
    },
   canActivate: [AuthGuard]
  },
  {
    path: 'evse/member',
    component: MemberComponent,
    data: {
      title: 'Member',
      breadcrumb: 'Member',
      functionCode: 'Member'
    },
   canActivate: [AuthGuard]
  },
  {
    path: 'evse/engineer',
    component: EngineerComponent,
    data: {
      title: 'Engineer',
      breadcrumb: 'Engineer',
      functionCode: 'Engineer'
    },
   canActivate: [AuthGuard]
  },
  {
    path: 'evse/web-banner',
    component: WebBannerComponent,
    data: {
      title: 'Web Banner',
      breadcrumb: 'Web Banner',
      functionCode: 'WebBanner'
    },
   canActivate: [AuthGuard]
  },
  {
    path: 'evse/bank',
    component: BankComponent,
    data: {
      title: 'Bank',
      breadcrumb: 'Bank',
      functionCode: 'Bank'
    },
   canActivate: [AuthGuard]
  },
  {
    path: 'evse/contract',
    component: ContractComponent,
    data: {
      title: 'Contract',
      breadcrumb: 'Contract',
      functionCode: 'Contract'
    },
   canActivate: [AuthGuard]
  },
  {
    path: 'evse/web-news',
    component: WebNewsComponent,
    data: {
      title: 'Web News',
      breadcrumb: 'Web News',
      functionCode: 'WebNews'
    },
   canActivate: [AuthGuard]
  },
  {
    path: 'evse/image-config',
    component: ImageConfigComponent,
    data: {
      title: 'Image Config',
      breadcrumb: 'Image Config',
      functionCode: 'Image Config'
    },
  canActivate: [AuthGuard]
  },
  {
    path: 'evse/profile/account',
    component: ProfileComponent,
    data: {
      title: 'Account Profile',
      breadcrumb: 'Account Profile',
      functionCode: 'Account Profile'
    },
  //canActivate: [AuthGuard]
  },
  {
    path: 'evse/profile/electrician',
    component: ProfileComponent,
    data: {
      title: 'Electrician Profile',
      breadcrumb: 'Electrician Profile',
      functionCode: 'Electrician Profile'
    },
  //canActivate: [AuthGuard]
  },
  {
    path: 'evse/setting-role',
    component: SettingRoleComponent,
    data: {
      title: 'Setting Role',
      breadcrumb: 'Setting Role',
      functionCode: 'Setting Role'
    },
  canActivate: [AuthGuard]
  },
  {
    path: 'evse/station-status',
    component: StationStatusComponent,
    data: {
      title: 'Station Status',
      breadcrumb: 'Station Status',
      functionCode: 'Station Status'
    },
  canActivate: [AuthGuard]
  },
  {
    path: 'evse/electrician-status',
    component: ElectricianStatusComponent,
    data: {
      title: 'Electrician Status',
      breadcrumb: 'Electrician Status',
      functionCode: 'Electrician Status'
    },
  canActivate: [AuthGuard]
  },
  {
    path: 'evse/investor-area',
    component: InvestorAreaComponent,
    data: {
      title: 'Investor Area',
      breadcrumb: 'Investor Area',
      functionCode: 'Investor Area'
    },
  canActivate: [AuthGuard]
  },
  {
    path: 'evse/site',
    component: SiteComponent,
    data: {
      title: 'Site',
      breadcrumb: 'Site',
      functionCode: 'Site'
    },
  canActivate: [AuthGuard]
  },
  {
    path: 'evse/app-update',
    component: AppUpdateComponent,
    data: {
      title: 'App Update',
      breadcrumb: 'App Update',
      functionCode: 'App Update'
    },
  canActivate: [AuthGuard]
  },
  {
    path: 'evse/member-list',
    component: MemberListComponent,
    data: {
      title: 'Member List',
      breadcrumb: 'Member List',
      functionCode: 'Member List'
    },
  canActivate: [AuthGuard]
  },
  {
    path: 'evse/device-user',
    component: DeviceUserComponent,
    data: {
      title: 'Device User',
      breadcrumb: 'Device User',
      functionCode: 'Member'
    },
  canActivate: [AuthGuard]
  },
  {
    path: 'evse/member-v2',
    component: Memberv2Component,
    data: {
      title: 'Member',
      breadcrumb: ' Member',
      functionCode: 'Member'
    },
  canActivate: [AuthGuard]
  },
  {
    path: 'evse/member/action/:id',
    component: MemberActionComponent,
    data: {
      title: 'Member Action',
      breadcrumb: ' Member Action',
      functionCode: 'Member'
    },
  canActivate: [AuthGuard]
  },
  {
    path: 'evse/order-history',
    component: OrderHistoryComponent,
    data: {
      title: 'Order History',
      breadcrumb: ' Order History',
      functionCode: 'Member'
    },
  canActivate: [AuthGuard]
  },
  {
    path: 'evse/engineer-error-report',
    component: EngineerErrorReportComponent,
    data: {
      title: 'Engineer Error Report',
      breadcrumb: 'Engineer Error Report',
      functionCode: 'Engineer Error'
    },
  canActivate: [AuthGuard]
  },
  {
    path: 'evse/engineer-error-report/action/:id',
    component: EngineerErrorReportActionComponent,
    data: {
      title: 'Engineer Error Report Action',
      breadcrumb: 'Engineer Error Report Action',
      functionCode: 'Engineer Error'
    },
  canActivate: [AuthGuard]
  },
  {
    path: 'evse/electrician-error-report',
    component: ElectricianErrorReportComponent,
    data: {
      title: 'Electrician Error Report',
      breadcrumb: 'Electrician Error Report',
      functionCode: 'Electrician Error'
    },
  canActivate: [AuthGuard]
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvseRoutingModule { }
