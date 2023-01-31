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
  fieldsLang: object = { text: "name", value: "id" };
  lang: string;
  languageData = [
    { id: "Tw", name: "Tw" },
    { id: "Cn", name: "Cn" },
    { id: "En", name: "En" },
    { id: "Vi", name: "Vi" },
  ];
  currentTime
  user = JSON.parse(localStorage.getItem('user'))
  nickName: any;
  username: any;
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
    this.lang = this.capitalize(localStorage.getItem("lang"));
    this.nickName =
    JSON.parse(localStorage.getItem("user"))?.nickName || "No Name";
  this.username =
    JSON.parse(localStorage.getItem("user"))?.username || "Guest";
    setInterval(() => this.updateCurrentTime(), 1 * 1000);

  }
  langValueChange(args) {
    const lang = args.itemData.id.toLowerCase();
    localStorage.removeItem("lang");
    localStorage.setItem("lang", lang);
    this.lang = this.capitalize(localStorage.getItem("lang"));
    location.reload();
  }
  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
