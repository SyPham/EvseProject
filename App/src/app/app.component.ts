import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { AlertifyService } from '@pigfarm-core';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AutoLogoutService } from './_core/_service/apply-orders/auto-log-off.service';
import { VersionCheckService } from './_core/_service/version-check.service';
import { XAccountService } from './_core/_service/xaccount.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  titleKey = 'EVSE 後台管理系統';
  constructor(
    private versionCheckService: VersionCheckService,
    private title:Title,
    private translate:TranslateService,
    private accountService: XAccountService,
    private alertify: AlertifyService
    ) {
  }
  ngOnInit(): void {
  
    this.translate.get(this.titleKey).subscribe(name=>{
      this.title.setTitle(name);
    });
   
    this.versionCheckService.initVersionCheck(environment.versionCheckURL);

  }
}

