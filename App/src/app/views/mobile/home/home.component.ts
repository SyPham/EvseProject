import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { SystemGroupNo } from 'src/app/_core/enum/SystemGroupNo';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';
import { AuthService } from 'src/app/_core/_service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentRouter: string = '/mobile/home'
  router_after: string = ''
  constructor(
    public router: Router,
    private cookieService: CookieService,
    private alertify: AlertifyService,
    private trans: TranslateService,
    private authService: AuthService
    ) {
     }
  isMobileMode: boolean = JSON.parse(localStorage.getItem('user')).mobileMode
  Group_No: string = JSON.parse(localStorage.getItem('user')).groupCode
  SystemGroupNo : SystemGroupNo = {} as SystemGroupNo
  ngOnInit() {
    // let user = JSON.parse(localStorage.getItem('user'));
    // if (!user) {
    //   this.router.navigate(['/mobile/login']);
    // }
  }
  backDesktop() {
    this.router.navigate(['/mobile/landlord-login'])
    .then(() => {
      window.location.reload();
    });
    // this.router.navigate(["/login"]);
    // window.location.reload();
  }
  logout() {
    this.authService.logOut().subscribe(() => {
      const uri = this.router.url;
      this.cookieService.deleteAll('/');
      localStorage.setItem('lang','tw')
      this.router.navigate(['/mobile/landlord-login'], { queryParams: { uri }, replaceUrl: true  });
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
