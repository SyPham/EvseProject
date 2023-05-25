
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
    path: 'evse/site',
    component: StationComponent,
    data: {
      title: 'Site',
      breadcrumb: 'Site',
      functionCode: 'Site'
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
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvseRoutingModule { }
