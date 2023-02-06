import { Component, OnDestroy, OnInit, AfterViewInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { UserForLogin } from "src/app/_core/_model/user";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/_core/_service/auth.service";
import { TranslateService } from "@ngx-translate/core";
import { AlertifyService } from "@pigfarm-core";
@Component({
  selector: "app-landlord-login",
  templateUrl: "./landlord-login.component.html",
  styleUrls: ["./landlord-login.component.css"],
})
export class LandlordLoginComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  username = "";
  password = "";
  private subscription: Subscription;
  user: UserForLogin = {
    username: "",
    password: "",
  };
  uri: any;
  remember = false;
  loading = 0;
  key: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService,
    private alertifyService: AlertifyService,
    private trans: TranslateService
  ) {
    if (this.cookieService.get("remember") !== undefined) {
      if (this.cookieService.get("remember") === "Yes") {
        this.key = this.cookieService.get("key_temp");
        this.remember = true;
        this.loginRememberMe(+this.key);
      }
    }
    let backUrl = "/mobile/home";
    this.uri = this.route.snapshot.queryParams.uri || backUrl;
  }
  role: number;
  ngAfterViewInit(): void {}
  ngOnInit(): void {
    const accessToken = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refresh_token");
    if (
      accessToken &&
      refreshToken &&
      this.route.routeConfig.path === "/mobile/landlord-login"
    ) {
      let backUrl = "/mobile/home";
      const uri = decodeURI(this.uri) || backUrl;
      this.router.navigate([uri]);
    }
    if (this.authService.loggedIn()) {
      let backUrl = "/mobile/home";
      const uri = decodeURI(this.uri) || backUrl;
      this.router.navigate([uri]);
    }
  }
  onChangeRemember(args) {
    this.remember = args.target.checked;
  }
  authentication() {
    return this.authService
      .loginlanlord(this.username, this.password)
      .toPromise();
  }

  async login() {
    if (!this.username || !this.password) {
      return;
    }
    this.loading = 1;
    try {
      const data = await this.authentication();
      const currentLang = localStorage.getItem("lang");
      if (currentLang) {
        localStorage.setItem("lang", currentLang);
      } else {
        localStorage.setItem("lang", "tw");
      }

      if (this.remember) {
        this.cookieService.set("remember", "Yes");
        this.cookieService.set("key_temp", data.user.id);
      } else {
        this.cookieService.set("remember", "No");
        this.cookieService.set("key_temp", "");
      }
     
      let backUrl = "/mobile/home";
      this.router.navigate([backUrl]);
      this.alertifyService.success(this.trans.instant("Login Success!"));
      this.loading = 0;
    } catch (error) {
      if (error.indexOf("error") == -1) {
        this.alertifyService.warning(this.trans.instant(error), true);
      } else {
        this.alertifyService.warning(this.trans.instant("Server error!"), true);
      }
      this.loading = 0;
    }
  }

  async loginRememberMe(key) {
    this.loading = 1;
    if (!key) {
      setTimeout(() => {
        this.loading = 0;
        return;
      }, 500);
    }
    try {
      const data = await this.authService
        .loginRememberMeLandlord(key)
        .toPromise();
      const currentLang = localStorage.getItem("lang");
      if (currentLang) {
        localStorage.setItem("lang", currentLang);
      } else {
        localStorage.setItem("lang", "en");
      }

      if (this.remember) {
        this.cookieService.set("remember", "Yes");
        this.cookieService.set("key_temp", data.user.id);
      } else {
        this.cookieService.set("remember", "No");
        this.cookieService.set("key_temp", "");
      }
     
      let backUrl = "/evse/home";
      this.router.navigate([backUrl]);
      this.loading = 0;
    } catch (error) {
      if (error.indexOf("error") == -1) {
        this.alertifyService.warning(this.trans.instant(error), true);
      } else {
        this.alertifyService.warning(this.trans.instant("Server error!"), true);
      }
      this.loading = 0;
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }


}
