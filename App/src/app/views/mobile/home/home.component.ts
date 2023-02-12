import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { SystemGroupNo } from 'src/app/_core/enum/SystemGroupNo';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';
import { AuthLandlordService } from 'src/app/_core/_service/auth-landlord.service';
import { AuthService } from 'src/app/_core/_service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: any;
  
  constructor(
    public router: Router,
    private cookieService: CookieService,
    private alertify: AlertifyService,
    private trans: TranslateService,
    private authService: AuthLandlordService
    ) {
     }
  ngOnInit() {
    this.username =
    JSON.parse(localStorage.getItem("user_landlord"))?.username || "Guest";
  }
  backDesktop() {
    this.router.navigate(['/'])
    .then(() => {
      window.location.reload();
    });
  }
  logout() {
    this.authService.logOutLandlord().subscribe(() => {
      const uri = this.router.url;
      this.cookieService.delete('remember_landlord');
      this.cookieService.delete('key_temp_landlord');
      localStorage.setItem('lang','tw')
      this.router.navigate(['/mobile/landlord-login']);
      this.alertify.message(this.trans.instant('Logged out'));
    });
  }
  goToDetail() {
    this.router.navigate(['/mobile/detail']);
  }
  goToMakeOrder(type) {
    this.router.navigate([`/mobile/pigdata/${type}`]);
  }
  noFunction() {
    alert('This function is not ready!')
  }

}
