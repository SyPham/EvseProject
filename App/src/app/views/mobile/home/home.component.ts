import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { SystemGroupNo } from 'src/app/_core/enum/SystemGroupNo';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';
import { AuthLandlordService } from 'src/app/_core/_service/auth-landlord.service';
import { AuthService } from 'src/app/_core/_service/auth.service';
import { environment } from 'src/environments/environment';
declare let $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: any;
  user = {} as any
  areaName: string = "";
  constructor(
    public router: Router,
    private cookieService: CookieService,
    private alertify: AlertifyService,
    private trans: TranslateService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthLandlordService
    ) {
     }
  ngOnInit() {
    const area = this.activatedRoute.snapshot.params.area;
    this.areaName = "";
    if (area === "landlord") {
      this.areaName = "landlord"
    }
    else if (area === "engineer") {
      this.areaName = "engineer"
    }
    this.user = JSON.parse(localStorage.getItem(`user_${this.areaName}`))

    this.username =
    JSON.parse(localStorage.getItem(`user_${this.areaName}`))?.username || "Guest";
    this.configImage();
    console.log(this.user)
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
      this.cookieService.delete(`remember_${this.areaName}`);
      this.cookieService.delete(`key_temp_${this.areaName}`);
      localStorage.setItem('lang','tw')
      this.router.navigate([`/mobile/${this.areaName}-login`]);
      this.alertify.message(this.trans.instant('Logged out'));
    });
  }


  noFunction() {
    alert('This function is not ready!')
  }
  configImage() {
    var btnCust = '<button type="button" class="btn btn-secondary edit-profile" >' +
    '<i class="bi-tag"></i>' +
    '</button>'; 
    const option = {
      overwriteInitial: true,
      maxFileSize: 1500,
      showClose: false,
      showCaption: false,
      browseLabel: '',
      removeLabel: '',
      browseIcon: '<i class="bi-folder2-open"></i>',
      removeIcon: '<i class="bi-x-lg"></i>',
      removeTitle: 'Cancel or reset changes',
      elErrorContainer: '#kv-avatar-errors-1',
      msgErrorClass: 'alert alert-block alert-danger',
      defaultPreviewContent: '<img class="img-circle" src="../../../../../assets/images/no-img.jpg" alt="No Image">',
      layoutTemplates: { main2: '{preview} ' +  btnCust + ' {browse}' },
      allowedFileExtensions: ["jpg", "png", "gif"],
      initialPreview: [],
      initialPreviewConfig: [],
      deleteUrl: `${environment.apiUrl}${this.areaName}/DeleteUploadFile`
    };
  
    $("#avatar-1").fileinput(option);;
    let that = this;
    $('#avatar-1').on('filedeleted', function (event, key, jqXHR, data) {

    });
    $('.edit-profile').on('click', function (event, key, jqXHR, data) {
      alert(1)
    });
  }
}
