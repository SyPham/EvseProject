import { Component, OnInit, AfterViewInit } from "@angular/core";
import { AuthService } from "../../../_core/_service/auth.service";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { FarmService } from "src/app/_core/_service/farms";
import { DashboardService } from "src/app/_core/_service/dashboard.service";
import { TranslateService } from "@ngx-translate/core";
import { HeaderService } from "src/app/_core/_service/header.service";
import { Query } from "@syncfusion/ej2-data";
import moment from "moment";
import { AutoLogoutService } from "src/app/_core/_service/apply-orders/auto-log-off.service";
import { XAccountService } from "src/app/_core/_service/xaccount.service";
import { AlertifyService } from "@pigfarm-core";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentTime
  user = JSON.parse(localStorage.getItem('user'))
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private alertify: AlertifyService,
    private router: Router,
    private service: FarmService,
    private serviceDash: DashboardService,
    private trans: TranslateService,
    private serviceHeader: HeaderService,
    private autoLogoutService: AutoLogoutService,
    private translate:TranslateService,
    private accountService: XAccountService
  ) { }

  ngOnInit(): void {
    this.currentTime = moment().format('HH:mm:ss, D/MMM');

    setInterval(() => this.updateCurrentTime(), 1 * 1000);

  }
  updateCurrentTime() {
    this.currentTime = moment().format('HH:mm:ss, D/MMM');
  }
  logout() {
    this.authService.logOut().subscribe(() => {
      const uri = this.router.url;
      this.cookieService.deleteAll("/");

      this.router.navigate(["login"], {
        queryParams: { uri },
        replaceUrl: true,
      });
      this.alertify.message(this.trans.instant("Logged out"));
    });
  }
}
