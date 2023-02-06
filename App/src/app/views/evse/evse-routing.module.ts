
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_core/_guards/auth.guard';
import { EngineerComponent } from './engineer/engineer.component';
import { HomeComponent } from './home/home.component';
import { LandlordComponent } from './landlord/landlord.component';
import { MemberComponent } from './member/member.component';
import { StationComponent } from './station/station.component';


const routes: Routes = [
  
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
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvseRoutingModule { }
