import { SharedModule } from "src/app/_core/commons/shared.module";
import { CommonModule, DatePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

export function tokenGetter() {
  const token = localStorage.getItem("token");
  let pattern = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;
  let result = pattern.test(token);
  if (result) {
    return token;
  }
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("refresh-token");
  localStorage.removeItem("login-event");
  localStorage.removeItem("functions");
  localStorage.removeItem("menuItem");
  localStorage.removeItem("farmGuid");
  localStorage.removeItem("menus");
  return "";
}
// resolvers

// module
import {
  CategoryService,
  ChartModule,
  ColumnSeriesService,
  LegendService,
} from "@syncfusion/ej2-angular-charts";
import { NgbModule, NgbTooltipConfig } from "@ng-bootstrap/ng-bootstrap";
import { VersionCheckService } from "src/app/_core/_service/version-check.service";
import { BasicAuthInterceptor } from "src/app/_core/_helper/basic-auth.interceptor";
import { NgxSpinnerModule } from "ngx-spinner";
import { AuthGuard } from "src/app/_core/_guards/auth.guard";
import { ErrorInterceptorProvider } from "src/app/_core/_helper/error.interceptor";
import { AlertifyService } from "src/app/_core/_service/alertify.service";
import { AuthService } from "src/app/_core/_service/auth.service";
import { DatePickerAllModule } from "@syncfusion/ej2-angular-calendars";
import { CoreDirectivesModule } from "src/app/_core/_directive/core.directives.module";
import {
  MenuAllModule,
  SidebarModule,
  TreeViewAllModule,
} from "@syncfusion/ej2-angular-navigations";
import { PigDataRoutingModule } from "./pigdata-routing.module";
import {
  BoarScreenComponent,
  FinisherScreenComponent,
  GiltScreenComponent,
  GrowerScreenComponent,
  NewboarScreenComponent,
  NurseryScreenComponent,
  SowScreenComponent,
  SucklingScreenComponent,
  PiglistScreenComponent,
  PiglistDetailScreenComponent,
} from ".";
import { PigfarmCoreModule } from "@pigfarm-core";
import { environment } from "src/environments/environment";

let lang = localStorage.getItem("lang");
if (!lang) {
  localStorage.setItem("lang", "tw");
  lang = localStorage.getItem("lang");
}
@NgModule({
  declarations: [
    BoarScreenComponent,
    FinisherScreenComponent,
    GiltScreenComponent,
    GrowerScreenComponent,
    NewboarScreenComponent,
    NurseryScreenComponent,
    SowScreenComponent,
    SucklingScreenComponent,
    PiglistScreenComponent,
    PiglistDetailScreenComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    PigDataRoutingModule,
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
  providers: [DatePipe],
})
export class PigDataModule {}
