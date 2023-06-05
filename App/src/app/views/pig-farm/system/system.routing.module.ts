import { CodePermissionComponent } from './code-permission/code-permission.component';
import { ReportConfigComponent } from './report-config/report-config.component';
import { XAccountGroupComponent } from './xaccount-group/xaccount-group.component';
import { SystemMenuComponent } from './system-menu/system-menu.component';
import { SystemLanguageComponent } from './system-language/system-language.component';
import { EmployeeComponent } from './employee/employee.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from 'src/app/_core/_guards/auth.guard';
import { AccountComponent } from './account/account.component';
import { ReportChartConfigComponent } from './report-chart-config/report-chart-config.component';
import { CodeTypeComponent } from './code-type/code-type.component';
import { SettingDashboardComponent } from './setting-dashboard/setting-dashboard.component';
import { ApplyOrderConfigComponent } from './apply-order-config';
import { AccountActionComponent } from './account/account-action/account-action.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard-setting',
        component: SettingDashboardComponent,
        data: {
          title: 'Dashboard Setting',
          module: 'system',
          breadcrumb: 'Dashboard Setting',
          functionCode: 'Dashboard Setting'
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'code-type',
        component: CodeTypeComponent,
        data: {
          title: 'Code Type',
          module: 'system',
          breadcrumb: 'Code Type',
          functionCode: 'Code Type'
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'code-permission',
        component: CodePermissionComponent,
        data: {
          title: 'Code Permission',
          module: 'system',
          breadcrumb: 'Code Permission',
          functionCode: 'Code Permission'
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'report-config',
        component: ReportConfigComponent,
        data: {
          title: 'Report Config',
          module: 'system',
          breadcrumb: 'Report Config',
          functionCode: 'Report Config'
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'report-chart-config',
        component: ReportChartConfigComponent,
        data: {
          title: 'Report Config - Chart',
          module: 'system',
          breadcrumb: 'Report Config - Chart',
          functionCode: 'Report Chart Config'
        },
        canActivate: [AuthGuard]
      },
     
      {
        path: 'system-language',
        component: SystemLanguageComponent,
        data: {
          title: 'System Language',
          module: 'system',
          breadcrumb: 'System Language',
          functionCode: 'System Language'
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'employee',
        component: EmployeeComponent,
        data: {
          title: 'Employee',
          module: 'system',
          breadcrumb: 'Employee',
          functionCode: 'Employee'
        },
      canActivate: [AuthGuard]
      },
       {
        path: 'account-group',
        component: XAccountGroupComponent,
        data: {
          title: 'Account Group',
          module: 'system',
          breadcrumb: 'Account Group',
          functionCode: 'Account Group'
        },
       canActivate: [AuthGuard]
      },
       {
        path: 'account',
        component: AccountComponent,
        data: {
          title: 'Account',
          module: 'system',
          breadcrumb: 'Account',
          functionCode: 'Account'
        },
      canActivate: [AuthGuard]
      },
      {
        path: 'account/admin',
        component: AccountComponent,
        data: {
          title: 'Admin',
          module: 'system',
          breadcrumb: 'Admin',
          functionCode: 'Admin'
        },
      canActivate: [AuthGuard]
      },
      {
        path: 'account/admin2',
        component: AccountComponent,
        data: {
          title: 'Admin2',
          module: 'system',
          breadcrumb: 'Admin2',
          functionCode: 'Admin2'
        },
      canActivate: [AuthGuard]
      },
      {
        path: 'account/engineer',
        component: AccountComponent,
        data: {
          title: 'Engineer',
          module: 'system',
          breadcrumb: 'Engineer',
          functionCode: 'Engineer'
        },
      canActivate: [AuthGuard]
      },
      {
        path: 'account/landlord',
        component: AccountComponent,
        data: {
          title: 'Landlord',
          module: 'system',
          breadcrumb: 'Landlord',
          functionCode: 'Landlord'
        },
      canActivate: [AuthGuard]
      },
      {
        path: 'account/investor',
        component: AccountComponent,
        data: {
          title: 'Investor',
          module: 'system',
          breadcrumb: 'Investor',
          functionCode: 'Investor'
        },
      canActivate: [AuthGuard]
      },
      {
        path: 'account/electrician',
        component: AccountComponent,
        data: {
          title: 'Electrician',
          module: 'system',
          breadcrumb: 'Electrician',
          functionCode: 'Electrician'
        },
      canActivate: [AuthGuard]
      },
      {
        path: 'account/action/:id',
        component: AccountActionComponent,
        data: {
          title: 'Account',
          module: 'system',
          breadcrumb: 'Account',
          functionCode: 'Account'
        },
      canActivate: [AuthGuard]
      },
      {
        path: 'account/view/:id',
        component: AccountActionComponent,
        data: {
          title: 'Account',
          module: 'system',
          type: "view",
          breadcrumb: 'Account',
          functionCode: 'Account'
        },
      canActivate: [AuthGuard]
      },
      {
        path: 'account/admin/action/:id',
        component: AccountActionComponent,
        data: {
          title: 'Admin Detail',
          module: 'system',
          breadcrumb: 'Admin Detail',
          functionCode: 'Admin'
        },
      canActivate: [AuthGuard]
      },
      {
        path: 'account/admin/view/:id',
        component: AccountActionComponent,
        data: {
          title: 'Admin Detail',
          module: 'system',
          type: "view",
          breadcrumb: 'Admin Detail',
          functionCode: 'Admin'
        },
      canActivate: [AuthGuard]
      },
      {
        path: 'account/admin2/action/:id',
        component: AccountActionComponent,
        data: {
          title: 'Admin2 Detail',
          module: 'system',
          breadcrumb: 'Admin2 Detail',
          functionCode: 'Admin2'
        },
      canActivate: [AuthGuard]
      },
      {
        path: 'account/admin2/view/:id',
        component: AccountActionComponent,
        data: {
          title: 'Admin2 Detail',
          module: 'system',
          type: "view",
          breadcrumb: 'Admin2 Detail',
          functionCode: 'Admin2'
        },
      canActivate: [AuthGuard]
      },
      {
        path: 'account/landlord/action/:id',
        component: AccountActionComponent,
        data: {
          title: 'Landlord Detail',
          module: 'system',
          breadcrumb: 'Landlord Detail',
          functionCode: 'Landlord'
        },
      canActivate: [AuthGuard]
      },
      {
        path: 'account/landlord/view/:id',
        component: AccountActionComponent,
        data: {
          title: 'Landlord Detail',
          module: 'system',
          type: "view",
          breadcrumb: 'Landlord Detail',
          functionCode: 'Landlord'
        },
      canActivate: [AuthGuard]
      },
      {
        path: 'account/electrician/action/:id',
        component: AccountActionComponent,
        data: {
          title: 'Electrician Detail',
          module: 'system',
          breadcrumb: 'Electrician Detail',
          functionCode: 'Electrician'
        },
      canActivate: [AuthGuard]
      },
      {
        path: 'account/electrician/view/:id',
        component: AccountActionComponent,
        data: {
          title: 'Electrician Detail',
          module: 'system',
          type: "view",
          breadcrumb: 'Electrician Detail',
          functionCode: 'Electrician'
        },
      canActivate: [AuthGuard]
      },
      {
        path: 'account/investor/action/:id',
        component: AccountActionComponent,
        data: {
          title: 'Investor Detail',
          module: 'system',
          breadcrumb: 'Investor Detail',
          functionCode: 'Investor'
        },
      canActivate: [AuthGuard]
      },
      {
        path: 'account/engineer/action/:id',
        component: AccountActionComponent,
        data: {
          title: 'Engineer Detail',
          module: 'system',
          breadcrumb: 'Engineer Detail',
          functionCode: 'Engineer'
        },
      canActivate: [AuthGuard]
      },
      {
        path: 'account/engineer/view/:id',
        component: AccountActionComponent,
        data: {
          title: 'Engineer Detail',
          module: 'system',
          type: "view",
          breadcrumb: 'Engineer Detail',
          functionCode: 'Engineer'
        },
      canActivate: [AuthGuard]
      },
      {
       path: 'menu',
       component: SystemMenuComponent,
       data: {
         title: 'System Menu',
         module: 'Menu',
         breadcrumb: 'System Menu',
         functionCode: 'System Menu'
       },
       canActivate: [AuthGuard]
     },
     {
      path: 'apply-order-config',
      component: ApplyOrderConfigComponent,
      data: {
        title: 'Apply Order Config',
        module: 'system',
        breadcrumb: 'Apply Order Config',
        functionCode: 'Apply Order Config'
      },
      //canActivate: [AuthGuard]
    },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
