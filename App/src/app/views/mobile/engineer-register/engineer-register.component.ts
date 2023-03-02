
import { Component, OnDestroy, OnInit, AfterViewInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { AuthService } from "src/app/_core/_service/auth.service";
import { AlertifyService } from "herr-core";
import { TranslateService } from "@ngx-translate/core";
import { AuthEngineerService } from "src/app/_core/_service/auth-engineer.service";
@Component({
  selector: 'app-engineer-register',
  templateUrl: './engineer-register.component.html',
  styleUrls: ['./engineer-register.component.scss']
})
export class EngineerRegisterComponent implements OnInit {
  username;
  password;
  agree
  areaName: string;
  constructor(
    private router: Router,
    private authService: AuthEngineerService,
    private cookieService: CookieService,
    private alertifyService: AlertifyService,
    private activatedRoute: ActivatedRoute,
    private trans: TranslateService
  ) { }

  ngOnInit(): void {
    const area = this.activatedRoute.snapshot.params.area;
    this.areaName = "";
    if (area === "landlord") {
      this.areaName = "landlord"
    }
    else if (area === "engineer") {
      this.areaName = "engineer"
    }
  }
  authentication() {
    return this.authService
      .registerEngineer(this.username, this.password)
      .toPromise();
  }
  async register() {
    if (!this.username || !this.password) {
      return;
    }
    try {
      const data = await this.authentication();
      this.username= null;
      this.password= null;
      this.agree = null;
      this.alertifyService.success(this.trans.instant("Register Success!"));
    } catch (error) {
      if (error.indexOf("error") == -1) {
        this.alertifyService.warning(this.trans.instant(error), true);
      } else {
        this.alertifyService.warning(this.trans.instant("Server error!"), true);
      }
    }
  }

}
