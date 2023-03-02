import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagePathConstants } from 'src/app/_core/_constants';
import { ReportError, Site } from 'src/app/_core/_model/evse/model';
import { SiteService } from 'src/app/_core/_service/evse/site.service';
import { environment } from 'src/environments/environment';
import { DataManager, UrlAdaptor, Query } from "@syncfusion/ej2-data";
import { DeviceService } from 'src/app/_core/_service/evse/device.service';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { UtilitiesService, AlertifyService, BaseComponent } from 'herr-core';
import { ReportErrorService } from 'src/app/_core/_service/evse/report-error.service';

@Component({
  selector: 'app-report-error-detail',
  templateUrl: './report-error-detail.component.html',
  styleUrls: ['./report-error-detail.component.scss']
})
export class ReportErrorDetailComponent  extends BaseComponent implements OnInit {
  input: Site = <Site>{}
  model: ReportError = <ReportError>{}
  baseUrl = environment.apiUrlImage;
  noImage = ImagePathConstants.NO_IMAGE_ACTION_COMPONENT;
  inputDevice: any;
  errorTypeData: any;
  areaName: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private siteService: SiteService,
    private deviceService: DeviceService,
    private reportErrorService: ReportErrorService,
    private utilityService: UtilitiesService,
    private alertify: AlertifyService,
    public translate: TranslateService,
    public datePipe: DatePipe,
    public router: Router,
    ) {
    super(translate,environment.apiUrl);

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
    this.loadDetail();
    this.loadDeviceDetail();
    this.loadErrorType();
  }
  change(e) {
    this.model.errorType = e.value;
  }
  loadErrorType() {
    new DataManager({
      url: `${
        environment.apiUrl
      }CodeType/GetDataDropdownlist?lang=${localStorage.getItem(
        "lang"
      )}&codeType=Error_Type`,
      adaptor: new UrlAdaptor(),
      crossDomain: true,
    })
      .executeQuery(
        new Query()
          .skip(this.skip)
          .take(this.take)
          .addParams("lang", localStorage.getItem("lang"))
      )
      .then((data: any) => {
        this.errorTypeData = data.result;
      });
  }
  loadDetail() {
    const guid = this.activatedRoute.snapshot.params.guid;
    if (guid) {
      this.siteService.getByGuid(guid).subscribe(x=> {
        this.input = x;

      })
    }
    
  }
  loadDeviceDetail() {
    const guid = this.activatedRoute.snapshot.params.device;
    if (guid) {
      this.deviceService.getByGuid(guid).subscribe(x=> {
        this.inputDevice = x;

      })
    }
    
  }

  ToFormatModel(model: any) {
    for (let key in model) {
      let value = model[key];
      if (value && value instanceof Date) {
        if (key === 'createDate') {
          model[key] = this.datePipe.transform(value, "yyyy/MM/dd HH:mm:ss");
        } else {
          model[key] = this.datePipe.transform(value, "yyyy/MM/dd");
        }
      } else {
        model[key] = value;
      }
    }
    return model;
  }
  create() {
    this.alertify.confirm4(
       this.alert.yes_message,
       this.alert.no_message,
       this.alert.createTitle,
       this.alert.createMessage,
       () => {
        this.model.deviceGuid = this.inputDevice.guid;
        this.model.errorFixedDate = this.datePipe.transform(new Date(), "yyyy-MM-dd HH:mm:ss");
         this.reportErrorService.add(this.ToFormatModel(this.model)).subscribe(
           (res) => {
             if (res.success === true) {
               this.alertify.success(this.alert.created_ok_msg);
               this.router.navigate(['/mobile/field'])
             } else {
               this.translate.get(res.message).subscribe((data: string) => {
                 this.alertify.warning(data, true);
               });
             }
 
           },
           (error) => {
             this.alertify.warning(this.alert.system_error_msg);
           }
         );
       }, () => {
         this.alertify.error(this.alert.cancelMessage);
       }
     );
 
   }

}
