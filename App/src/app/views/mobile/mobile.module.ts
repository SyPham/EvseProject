import { SharedModule } from 'src/app/_core/commons/shared.module';
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


export function tokenGetter() {
  const token = localStorage.getItem('token');
  let pattern = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;
  let result = pattern.test(token);
  if (result) {
    return token;
  }
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('refresh-token');
  localStorage.removeItem('login-event');
  localStorage.removeItem('functions');
  localStorage.removeItem('menuItem');
  localStorage.removeItem('farmGuid');
  localStorage.removeItem('menus');
  return '';
}
// resolvers




// module
import { CategoryService, ChartModule, ColumnSeriesService, LegendService } from '@syncfusion/ej2-angular-charts';
import { MobileComponent } from './mobile.component';
import { MobileRoutingModule } from './mobile-routing.module';
import { NgbModule, NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { VersionCheckService } from 'src/app/_core/_service/version-check.service';
import { BasicAuthInterceptor } from 'src/app/_core/_helper/basic-auth.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthGuard } from 'src/app/_core/_guards/auth.guard';
import { ErrorInterceptorProvider } from 'src/app/_core/_helper/error.interceptor';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';
import { AuthService } from 'src/app/_core/_service/auth.service';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';

import { CoreDirectivesModule } from 'src/app/_core/_directive/core.directives.module';
import { MenuAllModule, SidebarModule, TreeViewAllModule } from '@syncfusion/ej2-angular-navigations';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { PigDataComponent } from './pig-data/pig-data.component';
import { OperateComponent } from './pig-data/operate/operate.component';
import { OperateDetailComponent } from './pig-data/operate-detail/operate-detail.component';
import { FeedingComponent } from './feeding/feeding.component';
import { WeighingComponent } from './weighing/weighing.component';
import { MoveComponent } from './move/move.component';
import { ImmunizationScreenComponent } from './immunization-screen/immunization-screen.component';
import { CullingScreenComponent } from './culling-screen/culling-screen.component';
import { DeathScreenComponent } from './death-screen/death-screen.component';
import { PigearScreenComponent } from './pigear-screen/pigear-screen.component';
import { SigninScreenComponent } from './signin-screen/signin-screen.component';
import { VectorControlScreenComponent } from './vector-control-screen/vector-control-screen.component';
import { DisinfectionScreenComponent } from './disinfection-screen/disinfection-screen.component';
import { CleaningScreenComponent } from './cleaning-screen/cleaning-screen.component';
import { PigfarmCoreModule } from '@pigfarm-core';
import { environment } from 'src/environments/environment';
import { RepairScreenComponent } from './repair-screen/repair-screen.component';
import { ReportScreenComponent } from './report-screen/report-screen.component';
import { AccountScreenComponent } from './account-screen/account-screen.component';
let lang = localStorage.getItem('lang');
if (!lang) {
  localStorage.setItem('lang', 'tw');
  lang = localStorage.getItem('lang');
}
@NgModule({
  declarations: [
    MobileComponent,
    LayoutComponent,
    HomeComponent,
    PigDataComponent,
    OperateComponent,
    OperateDetailComponent,
    FeedingComponent,
    MoveComponent,
    WeighingComponent,
    ImmunizationScreenComponent,
    CullingScreenComponent,
    DeathScreenComponent,
    PigearScreenComponent,
    SigninScreenComponent,
    VectorControlScreenComponent,
    DisinfectionScreenComponent,
    CleaningScreenComponent,
    RepairScreenComponent,
    ReportScreenComponent,
    AccountScreenComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MobileRoutingModule,
    NgbModule,
    DatePickerAllModule,
    CoreDirectivesModule,
    ChartModule,
    SidebarModule,
    MenuAllModule,
    TreeViewAllModule,
    SharedModule.forRoot(),
    PigfarmCoreModule.forRoot(environment.apiUrl),
  ],
  providers: [
    DatePipe
  ]
})
export class MobileModule {
}
