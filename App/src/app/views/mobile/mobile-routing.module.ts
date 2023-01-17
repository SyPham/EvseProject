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
        path: 'detail',
        component: PigDataComponent,
        data: {
          title: 'detail',
          breadcrumb: 'Detail',
          functionCode: 'Detail'

        },
        //canActivate: [AuthGuard]
      },
      {
        path: 'operate',
        component: OperateComponent,
        data: {
          title: 'Operate',
          breadcrumb: 'Operate',
          functionCode: 'Operate'

        },
        //canActivate: [AuthGuard]
      },
      {
        path: 'operate-detail',
        component: OperateDetailComponent,
        data: {
          title: 'Operate Detail',
          breadcrumb: 'Operate Detail',
          functionCode: 'Operate Detail'

        },
        //canActivate: [AuthGuard]
      },
      {
        path: 'feeding',
        component: FeedingComponent,
        data: {
          title: 'Feeding',
          breadcrumb: 'Feeding',
          functionCode: 'Feeding'

        },
        //canActivate: [AuthGuard]

      },
      {
        path: 'weighing',
        component: WeighingComponent,
        data: {
          title: 'Weighing',
          breadcrumb: 'Weighing',
          functionCode: 'Weighing'

        },
        //canActivate: [AuthGuard]
      },
      {
        path: 'moving',
        component: MoveComponent,
        data: {
          title: 'Moving',
          breadcrumb: 'Moving',
          functionCode: 'Moving'

        },
        //canActivate: [AuthGuard]
      },
      {
        path: 'immunization',
        component: ImmunizationScreenComponent,
        data: {
          title: 'Immunization',
          breadcrumb: 'Immunization',
          functionCode: 'Immunization'

        },
        //canActivate: [AuthGuard]
      },
      {
        path: 'culling',
        component: CullingScreenComponent,
        data: {
          title: 'Culling',
          breadcrumb: 'Culling',
          functionCode: 'Culling'

        },
        //canActivate: [AuthGuard]
      },
      {
        path: 'death',
        component: DeathScreenComponent,
        data: {
          title: 'Death',
          breadcrumb: 'Death',
          functionCode: 'Death'

        },
        //canActivate: [AuthGuard]
      },
      {
        path: 'pigear',
        component: PigearScreenComponent,
        data: {
          title: 'Pig Ear',
          breadcrumb: 'Pig Ear',
          functionCode: 'Pig Ear'

        },
        //canActivate: [AuthGuard]
      },
      {
        path: 'disinfection',
        component: DisinfectionScreenComponent,
        data: {
          title: 'Disinfection',
          breadcrumb: 'Disinfection',
          functionCode: 'Disinfection'

        },
        //canActivate: [AuthGuard]
      },
      {
        path: 'vector-control',
        component: VectorControlScreenComponent,
        data: {
          title: 'Vector Control',
          breadcrumb: 'Vector Control',
          functionCode: 'Vector Control'

        },
        //canActivate: [AuthGuard]
      },
      {
        path: 'cleaning',
        component: CleaningScreenComponent,
        data: {
          title: 'Cleaning',
          breadcrumb: 'Cleaning',
          functionCode: 'Cleaning'

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
