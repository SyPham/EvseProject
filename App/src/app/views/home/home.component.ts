import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AlertifyService } from '@pigfarm-core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/_core/_service/dashboard.service';
import { SysMenuService } from 'src/app/_core/_service/sys-menu.service';
declare let $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fieldsLang: object = { text: "name", value: "id" };
  menus: any;
  lang: string;
  userid: number;
  title: any;
  btnText: any;
  parentActive = false;
  childActive = false;
  subActive = false;
  subscription: Subscription = new Subscription();
  languageData = [
    { id: "Tw", name: "Tw" },
    { id: "Cn", name: "Cn" },
    { id: "En", name: "En" },
    { id: "Vi", name: "Vi" },
  ];
  constructor(
    private spinner: NgxSpinnerService,
    private sysMenuService: SysMenuService,
    private dashService: DashboardService,
    private translate: TranslateService,
    private alertify: AlertifyService,
    private router: Router,

  ) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit() {
    this.lang = this.capitalize(localStorage.getItem("lang"));
    this.getMenu();
   
  }
  ngAfterViewInit(): void {
    $(function () {
      $('.nav > .sidebar-toggle').on('click', function (e) {
          e.preventDefault();
          $('.sidebar-toggle').toggleClass('active');
          $('.menu-collapse').toggleClass('active');
          $('.sidebar.slimScroll').toggleClass('active');
      });

      $('.nav > .dropdown .sidebar-toggle').on('click', function (e) {
          e.preventDefault();
          $('.dropdown-menu.dropdown-menu-right.navbar-dropdown').toggleClass('show');
      });
      $('.dropdown-menu-right').on('mouseleave', function (e) {
        e.preventDefault();
        $('.dropdown-menu.dropdown-menu-right.navbar-dropdown').removeClass('show');
    });


  });
  }
  navigate(data) {
    const functionCode = data.functionCode;
    if (functionCode === 'Report'&& data.level === 2) {
      return;
    }
    if (functionCode === 'Report'&& data.level === 3) {
      return this.router.navigate([data.url])
    }
    const functions = JSON.parse(localStorage.getItem('functions')) || [];
    const permissions = functions.includes(functionCode);
    if(permissions) {
      if (data.url) {
        return  this.router.navigate([data.url])
      }
    } else {
      this.alertify.errorBackToLogin(this.translate.instant(this.title), this.translate.instant(this.btnText), () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('refresh-token');
        localStorage.removeItem('login-event');
        localStorage.removeItem('functions');
        localStorage.removeItem('menuItem');
        localStorage.removeItem('farmGuid');
        localStorage.removeItem('menus');
        this.router.navigate(['/login']);
      }, true, () => {
        return;
      });
      return;
    }
  }
  getMenu() {
    this.spinner.show();
    this.sysMenuService.getMenusByMenuType(this.lang.toLowerCase(), "FE").subscribe((menus: []) => {
      this.menus = menus;
      localStorage.setItem('menus', JSON.stringify(menus));
      $(function () {
        $('a.toggle').on('click', function (e) {
          e.preventDefault();
          $(this).closest('ul').find('a.toggle.active').not(this).removeClass('active');
          $(this).toggleClass('active');

        });
      });
      setTimeout(() => {
        this.spinner.hide();
      }, 500)
    }, (err) => {
      this.spinner.hide();
    });
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
}
