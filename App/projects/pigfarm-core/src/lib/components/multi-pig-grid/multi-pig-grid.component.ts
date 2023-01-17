import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter ,Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageConstants } from '../../../_core/_constants';
import {
  DataManager,
  Query,
  ODataV4Adaptor,
  UrlAdaptor,
} from "@syncfusion/ej2-data";
import { AlertifyService } from '../../../services/alertify.service';
import { PigfarmCoreService } from '../../../services/pigfarm-core.service';
@Component({
  selector: 'app-multi-pig-grid',
  templateUrl: './multi-pig-grid.component.html',
  styleUrls: ['./multi-pig-grid.component.scss']
})
export class MultiPigGridComponent implements OnInit , OnChanges {
  @Input() height = 300;
  @Input() type = '';
  @Input() recordGuid = '';
  @Input() penGuid = '';
  @Input() checked = '';
  @Output('onCheckedChange') onCheckedChange = new EventEmitter<any>();

  
  pageSettings = {
    pageCount: 10,
    pageSizes: 20,
    enableQueryString: true,
    pageSize: 10,
    currentPage: 1,
    enableScroll: true,
  };
  searchOptions = { fields: ['name'], operator: 'contains', ignoreCase: true };
  model: any;
  alert = {
    updateMessage: this.translate.instant(MessageConstants.UPDATE_MESSAGE),
    updateTitle: this.translate.instant(MessageConstants.UPDATE_TITLE),
    createMessage: this.translate.instant(MessageConstants.CREATE_MESSAGE),
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
    choose_farm_message: this.translate.instant(
      MessageConstants.CHOOSE_FARM_MESSAGE
    ),
    select_order_message: this.translate.instant(
      MessageConstants.SELECT_ORDER_MESSAGE
    ),
    yes_message: this.translate.instant(MessageConstants.YES_MSG),
    no_message: this.translate.instant(MessageConstants.NO_MSG),
  };
  @Input() pigData: any;
  constructor(@Inject("Env") private baseUrl,
    private service: PigfarmCoreService,
    private alertify: AlertifyService,
    private translate: TranslateService
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    // if (changes.pigData.currentValue != changes.pigData.previousValue) {
    //   this.pigData = changes.pigData.currentValue;
    // }
  }

  ngOnInit() {
  }
  onChangeChecked(e, data) {
    let checked = e.checked;
    this.onCheckedChange.emit(e);
    this.toggle(checked, data.guid);
  }

  toggle(checked, pigGuid) {
    if (checked === false && this.recordGuid) {
      this.model = {
        recordGuid: this.recordGuid || "",
        pigGuid,
        type: this.type
      };
      this.service.removeRecord2Pig(this.model).subscribe(
        (res) => {
          if (res.success === true) {
            this.alertify.success(this.alert.deleted_ok_msg);
            this.loadDataByRoom();
          } else {
            this.alertify.warning(this.alert.system_error_msg);
          }
        },
        (error) => {
          this.alertify.warning(this.alert.system_error_msg);
        }
      );
    } else {
      if (this.recordGuid) {
        this.model = {
          recordGuid: this.recordGuid || "",
          pigGuid,
          type: this.type
        };
        this.service.addRecord2Pig(this.model).subscribe(
          (res) => {
            if (res.success === true) {
              this.alertify.success(this.alert.created_ok_msg);
              this.loadDataByRoom();
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
  }

  loadDataByRoom() {
    const accessToken = localStorage.getItem("token");
    this.pigData = new DataManager({
      url: `${this.baseUrl}Pen/GetPigsByPen?penGuid=${
        this.penGuid || ""
      }&recordGuid=${this.recordGuid || ""}&type=${this.type || ""}`,
      adaptor: new UrlAdaptor(),
      headers: [{ authorization: `Bearer ${accessToken}` }],
    });
  }
}
