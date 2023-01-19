import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectivePreloadingStrategyService } from 'src/app/_core/_preloading/selective-preloading-strategy.service';
import { CleaningScreenComponent } from './cleaning-screen/cleaning-screen.component';
import { CullingScreenComponent } from './culling-screen/culling-screen.component';
import { DeathScreenComponent } from './death-screen/death-screen.component';
import { DisinfectionScreenComponent } from './disinfection-screen/disinfection-screen.component';
import { FeedingComponent } from './feeding/feeding.component';
import { HomeComponent } from './home/home.component';
import { ImmunizationScreenComponent } from './immunization-screen/immunization-screen.component';
import { LayoutComponent } from './layout/layout.component';
import { MoveComponent } from './move/move.component';
import { OperateDetailComponent } from './pig-data/operate-detail/operate-detail.component';
import { OperateComponent } from './pig-data/operate/operate.component';
import { PigDataComponent } from './pig-data/pig-data.component';
import { PigearScreenComponent } from './pigear-screen/pigear-screen.component';
import { SigninScreenComponent } from './signin-screen/signin-screen.component';
import { VectorControlScreenComponent } from './vector-control-screen/vector-control-screen.component';
import { WeighingComponent } from './weighing/weighing.component';

import { RepairScreenComponent } from './repair-screen/repair-screen.component';
import { ReportScreenComponent } from './report-screen/report-screen.component';
import { AccountScreenComponent } from './account-screen/account-screen.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    runGuardsAndResolvers: 'always',
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'pigdata',
        loadChildren: () => import('../mobile/pig-data/pigdata.module').then(m => m.PigDataModule)
      },
      {
        path: 'home',
        component: HomeComponent,
        data: {
          title: 'home',
          breadcrumb: 'Home',
          functionCode: 'Home Mobile'

        },
        //canActivate: [AuthGuard]
      },
      {
        path: 'repair',
        component: RepairScreenComponent,
        data: {
          title: 'Repair',
          breadcrumb: 'Repair',
          functionCode: 'Repair'

        },
        //canActivate: [AuthGuard]
      },
      {
        path: 'report',
        component: ReportScreenComponent,
        data: {
          title: 'Report',
          breadcrumb: 'Report',
          functionCode: 'Report'

        },
        //canActivate: [AuthGuard]
      },
      {
        path: 'account',
        component: AccountScreenComponent,
        data: {
          title: 'Account',
          breadcrumb: 'Account',
          functionCode: 'Account'

        },
        //canActivate: [AuthGuard]
      },
    ],

  },
  {
    path: 'login',
    component: SigninScreenComponent,
    data: {
      title: 'Login'
    }
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class MobileRoutingModule {}
