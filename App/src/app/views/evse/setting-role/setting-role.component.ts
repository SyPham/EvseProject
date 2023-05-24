import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertifyService } from '@pigfarm-core';
import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import { from } from 'rxjs';
import { concatMap, map, toArray } from 'rxjs/operators';
import { MessageConstants } from 'src/app/_core/_constants';
import { CodePermissionService } from 'src/app/_core/_service/code-permission.service';
import { XAccountGroupService } from 'src/app/_core/_service/xaccount-group.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-setting-role',
  templateUrl: './setting-role.component.html',
  styleUrls: ['./setting-role.component.scss']
})
export class SettingRoleComponent implements OnInit {
  role
  dataSource
  data
  baseUrl = environment.apiUrl;
  public query: Query ;
  public remoteFields: Object = { text: 'name', value: 'guid' };
  alert = {
    updateMessage: this.trans.instant(MessageConstants.UPDATE_MESSAGE),
    updateTitle:  this.trans.instant(MessageConstants.UPDATE_TITLE),
    createMessage: this.trans.instant(MessageConstants.CREATE_MESSAGE),
    createTitle:  this.trans.instant(MessageConstants.CREATE_TITLE),
    deleteMessage:  this.trans.instant(MessageConstants.DELETE_MESSAGE),
    deleteTitle:  this.trans.instant(MessageConstants.DELETE_TITLE),
    cancelMessage:  this.trans.instant(MessageConstants.CANCEL_MESSAGE),
    serverError:  this.trans.instant(MessageConstants.SERVER_ERROR),
    deleted_ok_msg:  this.trans.instant(MessageConstants.DELETED_OK_MSG),
    created_ok_msg:  this.trans.instant(MessageConstants.CREATED_OK_MSG),
    updated_ok_msg:  this.trans.instant(MessageConstants.UPDATED_OK_MSG),
    system_error_msg:  this.trans.instant(MessageConstants.SYSTEM_ERROR_MSG),
    exist_message: this.trans.instant( MessageConstants.EXIST_MESSAGE),
    yes_message:  this.trans.instant(MessageConstants.YES_MSG),
    no_message:  this.trans.instant(MessageConstants.NO_MSG),

  };
  model: {guid:string, permission:string} = {guid: null, permission: null}
  data2: never[];
  constructor(
   private xaccountGroup: XAccountGroupService,
   private codePermissionService:CodePermissionService,
   private alertify: AlertifyService,
   private trans: TranslateService,

  ) { }

  ngOnInit() {
    this.getRoles();
    this.getPermissions();
  }
  changeRole(e) {
    if (e.isInteracted) {
      this.getPermissions();
      let data = e.itemData;
      this.model.guid = data.roleGuid
    }
  }
  checkedPermission(e, data) {
    this.model.permission = data.guid
    this.storePermission();
  }
  getPermissions() {
    this.codePermissionService.getPermissionsByRoleId(this.role || "").pipe(
      ).subscribe((roles: [])=> {
        let length = roles.length
        let rolesTemp = [...roles];
        let flength = Math.ceil(length/2);
        this.data = rolesTemp.splice(0, flength)
         rolesTemp = [...roles];
        this.data2 = rolesTemp.splice(flength, length);
      })
  }
  getRoles() {
    this.xaccountGroup.getAll().pipe(
        concatMap(roles => from(roles)),
        map(role=> (
          {
          guid: role.groupNo,
          name: role.groupName,
          roleGuid: role.guid
         }
        )),
        toArray()
     ).subscribe(roles=> {
      this.dataSource =roles
     })
    }

    storePermission() {
      if (!this.model.guid)  {
        this.alertify.warning(this.trans.instant("Please choice a role first!"))
        this.getPermissions();
        return;
      }
      this.xaccountGroup.storePermissionForCheckBox(this.model).subscribe(
        (res) => {
          if (res.success === true) {
            this.alertify.success(this.alert.updated_ok_msg);
            this.getPermissions();
          } else {
            this.alertify.warning(this.alert.system_error_msg);
          }
        },
        (error) => {
          this.alertify.warning(this.alert.system_error_msg);
        }
      );
     }
}
