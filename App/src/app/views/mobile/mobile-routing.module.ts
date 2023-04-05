import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';

import { LandlordRegisterComponent } from './landlord-register/landlord-register.component';
import { LandlordProfileComponent } from './landlord-profile/landlord-profile.component';

import { RepairScreenComponent } from './repair-screen/repair-screen.component';
import { ReportScreenComponent } from './report-screen/report-screen.component';
import { AccountScreenComponent } from './account-screen/account-screen.component';
import { LandlordLoginComponent } from './landlord-login/landlord-login.component';
import { LandlordDemoComponent } from './landlord-demo/landlord-demo.component';
import { FieldComponent } from './field/field.component';
import { FieldScreenDetailComponent } from './field/field-screen-detail/field-screen-detail.component';
import { BankAccountScreenComponent } from './account-screen/bank-account-screen/bank-account-screen.component';
import { BankAccountFinishScreenComponent } from './account-screen/bank-account-finish-screen/bank-account-finish-screen.component';
import { AlertScreenComponent } from './alert-screen/alert-screen.component';
import { ReportErrorComponent } from './field/report-error/report-error.component';
import { ReportErrorDetailComponent } from './field/report-error-detail/report-error-detail.component';
import { EngineerLoginComponent } from './engineer-login/engineer-login.component';
import { EngineerDemoComponent } from './engineer-demo/engineer-demo.component';
import { EngineerRegisterComponent } from './engineer-register/engineer-register.component';
import { EngineerProfileComponent } from './engineer-profile/engineer-profile.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    runGuardsAndResolvers: 'always',
    // canActivate: [AuthGuard],
    children: [
    
      {
        path: 'engineer-profile',
        component: EngineerProfileComponent,
        data: {
          title: 'engineer Profile'
        }
      },
      {
        path: 'landlord-profile',
        component: LandlordProfileComponent,
        data: {
          title: 'Landlord Profile'
        }
      },
      {
        path: 'home/:area',
        component: HomeComponent,
        data: {
          title: 'home',
          breadcrumb: 'Home',
          functionCode: 'Home Mobile'
        },
        //canActivate: [AuthGuard]
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
        path: 'repair/:area',
        component: RepairScreenComponent,
        data: {
          title: 'Repair',
          breadcrumb: 'Repair',
          functionCode: 'Repair'

        },
        //canActivate: [AuthGuard]
      },
      {
        path: 'field/:area',
        component: FieldComponent,
        data: {
          title: 'Field',
          breadcrumb: 'Field',
          functionCode: 'Field'

        },
        //canActivate: [AuthGuard]
      },
      {
        path: 'field/:area/detail',
        component: FieldScreenDetailComponent,
        data: {
          title: 'Field Detail',
          breadcrumb: 'Field Detail',
          functionCode: 'Field Detail'

        },
        //canActivate: [AuthGuard]
      },
      {
        path: 'field/:area/detail/:guid',
        component: FieldScreenDetailComponent,
        data: {
          title: 'Field Detail',
          breadcrumb: 'Field Detail',
          functionCode: 'Field Detail'

        },
        //canActivate: [AuthGuard]
      },
      {
        path: 'field/:area/detail/:guid/report-error',
        component: ReportErrorComponent,
        data: {
          title: 'Report Error',
          breadcrumb: 'Report Error',
          functionCode: 'Report Error'

        },
        //canActivate: [AuthGuard]
      },
      {
        path: 'field/:area/detail/:guid/report-error/detail/:device',
        component: ReportErrorDetailComponent,
        data: {
          title: 'Report Error Detail',
          breadcrumb: 'Report Error Detail',
          functionCode: 'Report Error Detail'

        },
        //canActivate: [AuthGuard]
      },
      {
        path: 'report/:area',
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
      {
        path: 'account/:area',
        component: AccountScreenComponent,
        data: {
          title: 'Account',
          breadcrumb: 'Account',
          functionCode: 'Account'

        },
        //canActivate: [AuthGuard]
      },
      {
        path: 'account/bank/:area',
        component: BankAccountScreenComponent,
        data: {
          title: 'Bank Account',
          breadcrumb: 'Bank Account',
          functionCode: 'Bank Account'

        },
        //canActivate: [AuthGuard]
      },
      {
        path: 'account/bank/finish/:area',
        component: BankAccountFinishScreenComponent,
        data: {
          title: 'Bank Account',
          breadcrumb: 'Bank Account',
          functionCode: 'Bank Account'

        },
        //canActivate: [AuthGuard]
      },
      {
        path: 'alert',
        component: AlertScreenComponent,
        data: {
          title: 'Bank Account',
          breadcrumb: 'Bank Account',
          functionCode: 'Bank Account'

        },
        //canActivate: [AuthGuard]
      },
    ],

  },
  {
    path: 'landlord-login-2',
    component: LandlordLoginComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: 'landlord-login',
    component: LandlordLoginComponent,
    data: {
      title: 'Login',
      skip: 0
    }
  },
  {
    path: 'landlord-register',
    component: LandlordRegisterComponent,
    data: {
      title: 'Landlord Register'
    }
  },
  {
    path: 'landlord-demo',
    component: LandlordDemoComponent,
    data: {
      title: 'Landlord Demo'
    }
  },
  {
    path: 'engineer-login',
    component: EngineerLoginComponent,
    data: {
      title: 'Engineer Register'
    }
  },
  {
    path: 'engineer-login',
    component: EngineerLoginComponent,
    data: {
      title: 'Engineer Login',
      skip: 0
    }
  },
  {
    path: 'engineer-login-2',
    component: EngineerLoginComponent,
    data: {
      title: 'Engineer Login'
    }
  },
  {
    path: 'engineer-demo',
    component: EngineerDemoComponent,
    data: {
      title: 'Engineer Demo'
    }
  },
  {
    path: 'engineer-register',
    component: EngineerRegisterComponent,
    data: {
      title: 'Engineer Register'
    }
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class MobileRoutingModule {}
