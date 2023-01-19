import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { CookieService } from 'ngx-cookie-service';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';
import { AuthService } from 'src/app/_core/_service/auth.service';
import { DashboardService } from 'src/app/_core/_service/dashboard.service';
import { Location } from "@angular/common";
import { Subscription } from 'rxjs';
import { filter, distinctUntilChanged, map } from 'rxjs/operators';
import { SystemGroupNo } from 'src/app/_core/enum/SystemGroupNo';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit {

  fieldsLang: object = { text: "name", value: "id" };
  farmData: any[];
  farmGuid: any;
  fields: object = { text: "siteName", value: "guid" };
  lang: string;
  languageData = [
    { id: "Tw", name: "Tw" },
    { id: "Cn", name: "Cn" },
    { id: "En", name: "En" },
    { id: "Vi", name: "Vi" },
  ];
  @ViewChild("sidebarTreeviewInstance")
  public sidebarTreeviewInstance: SidebarComponent;
  public width: string = "290px";
  mediaQuery: string = "(min-width: 600px)";
  target: string = ".main-content";
  isMobileMode: boolean = JSON.parse(localStorage.getItem('user')).groupCode === SystemGroupNo.LandRoyal || JSON.parse(localStorage.getItem('user')).groupCode === SystemGroupNo.Member || JSON.parse(localStorage.getItem('user')).groupCode === SystemGroupNo.Engineer
  currentRouter_default: string = '/mobile/home'
  currentRouter: string = ''
  subscription: Subscription = new Subscription();
  constructor(
    private router: Router,
    private location: Location,
    private trans: TranslateService,
    private authService: AuthService,
    private cookieService: CookieService,
    private alertify: AlertifyService,
    private serviceDash: DashboardService,

  ) {
    this.router.events.pipe( filter((event: any) => event instanceof NavigationEnd) ).subscribe(event => { 
      this.currentRouter = event.url
    });
  }

  public data: Object[] = [
    {
      nodeId: "01",
      nodeText: this.trans.instant("Desktop mode"),
      iconCss: "icon-microchip icon",
    },
    
    {
      nodeId: "10",
      nodeText: "Sign out",
      iconCss: "icon-bookmark-empty icon",
    },
  ];
  public field: Object = {
    dataSource: this.data,
    id: "nodeId",
    text: "nodeText",
    child: "nodeChild",
    iconCss: "iconCss",
  };

  openClick() {
    this.sidebarTreeviewInstance.toggle();
  }
  goToHome() {
    this.router.navigate(["/mobile/home"]);
  }
  ngOnInit() {
    this.farmGuid = localStorage.getItem("farmGuid");
    this.lang = this.capitalize(localStorage.getItem("lang"));
    this.sidebarTreeviewInstance?.hide();
  }

  toggleSidebar() {
    if(this.isMobileMode) {
      this.router.navigate(["/mobile/home"]);
    }else {
      this.router.navigate(['/dashboard'])
    }
    // .then(() => {
    //   window.location.reload();
    // });
    // this.router.navigate(["/mobile/home"]);
    // this.sidebarTreeviewInstance.toggle();
  }
  goBack() {
    const homeUrl = this.router.url.includes("home");
    if (!homeUrl) {
      this.location.back();
    }else {
      this.router.navigate(['/login'])
      .then(() => {
        window.location.reload();
      });
    }
  }
  onCreated(e: any): void {
    this.sidebarTreeviewInstance.element.style.visibility = "visible";
  }

  logout() {
    this.authService.logOut().subscribe(() => {
      const uri = this.router.url;
      this.cookieService.deleteAll("/");

      this.router.navigate(["/mobile/login"], {
        queryParams: { uri },
        replaceUrl: true,
      });
      this.alertify.message(this.trans.instant("Logged out"));
    });
  }
  onNodeClicked(e) {
    if (e.node.dataset.uid === "10") {
      this.logout();
      return;
    } else if (e.node.dataset.uid === "01") {
      this.router.navigate(["/login"]);
      return;
    }
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
  farmValueChange(args) {
    this.farmGuid = args.itemData.guid || "";
    localStorage.setItem("farmGuid", args.itemData.guid);
    this.serviceDash.changeFarmGuid(this.farmGuid);

    if (args.isInteracted === true) {
      location.reload();
    }
  }

}
