
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { AccountTypeService } from 'src/app/_core/_service/account-type.service';
import { EmployeeService } from 'src/app/_core/_service/employee.service';
import { FarmService } from 'src/app/_core/_service/farms';
import { DataManager, Query, UrlAdaptor, Predicate } from '@syncfusion/ej2-data';
import { environment } from 'src/environments/environment';
import { ImagePathConstants, MessageConstants } from 'src/app/_core/_constants';
import { AlertifyService, UtilitiesService } from '@pigfarm-core';
import { Member } from 'src/app/_core/_model/evse/model';
import { MemberService } from 'src/app/_core/_service/evse/member.service';
import { XAccountService } from 'src/app/_core/_service/xaccount.service';
declare let $: any;

@Component({
  selector: 'app-member-action',
  templateUrl: './member-action.component.html',
  styleUrls: ['./member-action.component.css']
})
export class MemberActionComponent implements OnInit {
  loading
  model: Member = <Member>{};
  file: any;
  employeeFields: object = { text: 'nickName', value: 'guid' };
  farmFields: object = { text: 'farmName', value: 'guid' };
  fields: object = { text: 'groupName', value: 'guid' };
  employeeData: any[];
  farmData: any;
  permissionData: [] = [];
  memberGroupFields: object = { text: 'groupName', value: 'guid' };
  memberGroupData;
  apiHost = environment.apiUrl.replace('/api/', '');
  noImage = ImagePathConstants.NO_IMAGE;
  public onFiltering: any = (e: FilteringEventArgs) => {
    let query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where("name", "contains ", e.text, true) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.permissionData, query);
  };
id: any;
  audit: Member;
  alert = {
    updateMessage: this.translate.instant(MessageConstants.UPDATE_MESSAGE),
    updateTitle: this.translate.instant(MessageConstants.UPDATE_TITLE),
    createMessage:this.translate.instant(MessageConstants.CREATE_MESSAGE),
    createTitle: this.translate.instant(MessageConstants.CREATE_TITLE),
    deleteMessage: this.translate.instant(MessageConstants.DELETE_MESSAGE),
    deleteTitle: this.translate.instant(MessageConstants.DELETE_TITLE),
    cancelMessage: this.translate.instant(MessageConstants.CANCEL_MESSAGE),
    serverError: this.translate.instant(MessageConstants.SERVER_ERROR),
    deleted_ok_msg: this.translate.instant(MessageConstants.DELETED_OK_MSG),
    created_ok_msg: this.translate.instant(MessageConstants.CREATED_OK_MSG),
    updated_ok_msg: this.translate.instant(MessageConstants.UPDATED_OK_MSG),
    system_error_msg: this.translate.instant(MessageConstants.SYSTEM_ERROR_MSG),
    exist_message: this.translate.instant(MessageConstants.EXIST_MESSAGE),
    choose_farm_message: this.translate.instant(MessageConstants.CHOOSE_FARM_MESSAGE),
    select_order_message: this.translate.instant(MessageConstants.SELECT_ORDER_MESSAGE),
    yes_message: this.translate.instant(MessageConstants.YES_MSG),
    no_message: this.translate.instant(MessageConstants.NO_MSG),
  };
  sexData: any;
  constructor(
    private service: MemberService,
    private serviceXAccount: XAccountService,
    private serviceEmployee: EmployeeService,
    public modalService: NgbModal,
    private serviceFarm: FarmService,
    private alertify: AlertifyService,
    private utilityService: UtilitiesService,
    private datePipe: DatePipe,
     private config: NgbTooltipConfig,
    public translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }
  role = 'Member';
 async ngOnInit() {
  this.id = +this.route.snapshot.params['id'];
  this.role = this.route.snapshot.data['functionCode'];

  if ( this.id === 0) {
    this.reset()

  } else {
  const model=  await this.loadDetail();
  if (model == null) {
    this.alertify.errorConfirm("", this.translate.instant("Not found record"), () => {
      this.router.navigateByUrl("/")
      return;
    })
   
  }
  this.model = model;
    this.getAudit(this.id);
  }
    this.getEmployeesByMemberID(0);
    this.loadSexConfig();
   this.codeType();
   this.auditLogs();

  }
  getAccountNo() {
    if (this.model?.memberNo && this.role) {
      this.serviceXAccount.getAccountNo(this.role, this.model.memberNo).subscribe(res=> {
      this.model.memberNo =  res['value'];
      })
    }
   
  }
  inputType = 'password'
  inputTypeRePw = 'password'
  togglePassword() {
    this.inputType = this.inputType === "password" ? "text": "password"
  }
  toggleRePassword() {
    this.inputTypeRePw = this.inputTypeRePw === "password" ? "text": "password"
  }
  loadDetail() {
   return this.service.getById(this.id).toPromise()
  }
  loadSexConfig() {
    let query = new Query();
    const accessToken = localStorage.getItem("token");
    const lang = localStorage.getItem("lang");
    new DataManager({
      url: `${environment.apiUrl}CodeType/GetDataDropdownlist?lang=${lang}&codeType=SEX`,
      adaptor: new UrlAdaptor(),
      headers: [{ authorization: `Bearer ${accessToken}` }],
    })
      .executeQuery(query)
      .then((x: any) => {
        console.log(x);
        this.sexData = x.result;
      });
  }

  getAudit(id) {
    this.service.getAudit(id).subscribe(data => {
      this.audit = data;
    });

}
  imagePath(path) {
    if (path !== null && this.utilityService.checkValidImage(path)) {
      if (this.utilityService.checkExistHost(path)) {
        return path;
      }
      return this.apiHost + path;
    }
    return this.noImage;
  }
  reset() {
    this.id = null;
    this.model = <Member>{};
    this.model.memberStatus = 1;
    this.model.status= 1;
    this.model.id = 0;
    this.contactRel = '';
   
  }
  contactRel = ''
 


  onFileChangeLogo(args) {
    this.file = args.target.files[0];
  }

  getEmployeesByMemberID(memberID) {
    this.serviceEmployee.getEmployeesByAccountID(memberID || 0).subscribe(data => {
      this.employeeData = data;
    });
  }
  roles
  getFarms() {
    this.serviceFarm.getFarms().subscribe(data => {
      this.farmData = data;
    });
  }
  changeStatus(e) {
    if (e.checked) {
      this.model.status = 1
    } else {
      this.model.status = 0
    }

  }
  back() {
      this.router.navigateByUrl("/evse/member-v2")
  }
  create() {
  
    this.alertify.confirm4(
       this.alert.yes_message,
       this.alert.no_message,
       this.alert.createTitle,
       this.alert.createMessage,
       () => {
        this.model.memberStatus = this.model.status + ''
         this.service.insertForm(this.ToFormatModel(this.model)).subscribe(
           (res) => {
             if (res.success === true) {
               this.alertify.success(this.alert.created_ok_msg);
               this.back();
 
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
       },
       'success'
     );
 
   }
   update() {
    this.alertify.confirm4(
       this.alert.yes_message,
       this.alert.no_message,
       this.alert.updateTitle,
       this.alert.updateMessage,
       () => {
        this.model.memberStatus = this.model.status + ''
         this.service.updateForm(this.ToFormatModel(this.model)).subscribe(
           (res) => {
             if (res.success === true) {
               this.alertify.success(this.alert.updated_ok_msg);
               this.back();
 
             } else {
               this.alertify.warning(res.message, true);
             }
           },
           (error) => {
             this.alertify.warning(this.alert.system_error_msg);
           }
         );
       }, () => {
         this.alertify.error(this.alert.cancelMessage);
 
       },
       'success'
     );
 
   }
   save() {

    if (this.model.id > 0) {
      this.update();
    } else {
      this.create();
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

  changeRepassword(e) {
  }
  query;
  contactRelData
  codeType() {
    this.query = new Query()
    .addParams("lang", localStorage.getItem('lang'));
    let data = new DataManager({
      url: `${environment.apiUrl}CodeType/GetDataDropdownlist?lang=${localStorage.getItem('lang')}&codeType=ContactRel`,
      adaptor: new UrlAdaptor,
      crossDomain: true,
    });
    data.executeQuery(this.query.sortBy('guid')).then((x: any)=> {
      this.contactRelData = x.result;
      if (this.model.id > 0 && this.contactRelData.length > 0) {
       
      }
    })
  }
  auditLogsQuery: Query; 
  auditLogsData$: any; 
  locale = localStorage.getItem('lang');
  pageText = 'Total Records Count {{items}} items'

  auditLogs() {
    this.auditLogsQuery = new Query();
    this.auditLogsData$ = new DataManager({
      url: `${environment.apiUrl}AuditLog/LoadData?lang=${localStorage.getItem('lang')}`,
      adaptor: new UrlAdaptor,
      crossDomain: true,
    });
  }
  
}
