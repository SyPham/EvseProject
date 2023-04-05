import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { ForgotUsernameComponent } from './views/forgot-username/forgot-username.component';
import { HomeComponent } from './views/home/home.component';
import { LayoutComponent } from './views/layout/layout/layout.component';
import { LoginComponent } from './views/login/login.component';

import { P404Component } from './views/p404/p404.component';
import { P500Component } from './views/p500/p500.component';
import { ChangePasswordComponent } from './views/pig-farm/change-password/change-password.component';
import { ReportComponent } from './views/pig-farm/report/report.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';
import { AuthGuard } from './_core/_guards/auth.guard';
import { SelectivePreloadingStrategyService } from './_core/_preloading/selective-preloading-strategy.service';
import { NewsComponent } from './views/evse/news/news.component';
import { NewsDetailComponent } from './views/evse/news/news-detail/news-detail.component';

const routes: Routes = [
  // App routes goes here here
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'mobile',
    loadChildren: () =>
      import('./views/mobile/mobile.module').then(m => m.MobileModule)
  },
  {
    path: '',
    component: LayoutComponent,
    runGuardsAndResolvers: 'always',
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'evse/news',
        component: NewsComponent,
        data: {
          title: 'News',
          breadcrumb: 'News',
          functionCode: 'News'
        },
       //canActivate: [AuthGuard]
      },
      {
        path: 'evse/news/detail/:id',
        component: NewsDetailComponent,
        data: {
          title: 'News Detail',
          breadcrumb: 'News Detail',
          functionCode: 'News Detail'
        },
       //canActivate: [AuthGuard]
      },
      {
        path: 'report/:kind',
        component: ReportComponent,
        data: {
          title: 'Report',
          module: 'Report',
          breadcrumb: 'Report',
          functionCode: 'Report'
        },
        // canActivate: [AuthGuard]
      },
      {
        path: '',
        loadChildren: () =>
          import('./views/evse/evse.module').then(m => m.EvseModule)
      },
      
      {
        path: '',
        loadChildren: () =>
          import('./views/pig-farm/pig-farm.module').then(m => m.PigFarmModule)
      },{
        path: 'change-password',
        component: ChangePasswordComponent,
        data: {
          title: 'Change Password',
          module: 'Account',
          breadcrumb: 'Change Password',
          functionCode: 'Change Password'
        },
       canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: {
      title: 'Forgot Password'
    }
  },
  {
    path: 'forgot-username',
    component: ForgotUsernameComponent,
    data: {
      title: 'Forgot Username'
    }
  },
  {
    path: 'reset-password',
    children: [
      {
        path: '',
        component: ResetPasswordComponent,
        data: {
          title: 'Reset Password'
        }
      },
      {
        path: ':token',
        component: ResetPasswordComponent,
        data: {
          title: 'Reset Password'
        }
      },
    ]
  },

  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'Home'
    }
  },
  
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Not Found'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Server Error'
    }
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // enableTracing: false, // <-- debugging purposes only
    preloadingStrategy: SelectivePreloadingStrategyService,
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
