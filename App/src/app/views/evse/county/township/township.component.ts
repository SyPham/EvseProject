
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { AlertifyService, BaseComponent } from "herr-core";
import { GridComponent } from "@syncfusion/ej2-angular-grids";
import { L10n, setCulture } from "@syncfusion/ej2-base";
import { environment } from "src/environments/environment";
import { TranslateService } from "@ngx-translate/core";
import { Township, ParkingLot, Site, County } from "src/app/_core/_model/evse/model";
import { TownshipActionComponent } from "./township-action/township-action.component";
import { DataManager, Query, UrlAdaptor } from "@syncfusion/ej2-data";
import { TownshipService } from "src/app/_core/_service/evse/township.service";

@Component({
  selector: 'app-township',
  templateUrl: './township.component.html',
  styleUrls: ['./township.component.css']
})
export class TownshipComponent
  extends BaseComponent
  implements OnInit, OnChanges
{
  @Input() county: County;
  @Input() township: Township;
  @Output() townshipChange = new EventEmitter<Township>();
  locale = localStorage.getItem("lang");
  @ViewChild("grid") public grid: GridComponent;
  @ViewChild(TownshipActionComponent) public action: TownshipActionComponent;
  toolbarOptions = ["Add", "Search"];
  editSettings = {
    showDeleteConfirmDialog: false,
    allowEditing: false,
    allowAdding: true,
    allowDeleting: false,
    mode: "Normal",
  };
  dataSource: any;
  baseUrl = environment.apiUrl;
  public query: Query;

  constructor(
    private alertify: AlertifyService,
    private service: TownshipService,
    public translate: TranslateService
  ) {
    super(translate, environment.apiUrl);
  }

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty("county")) {
      if (changes?.county.currentValue != changes?.county.previousValue) {
        this.loadData();
      }
    }
  }
  recordClick(args: any) {
    this.township = args.rowData as Township;
    this.townshipChange.emit(args.rowData);
  }
  loadData() {
    const accessToken = localStorage.getItem("token");
    const lang = localStorage.getItem("lang");
    this.query = new Query().where("countyId", "equal", this.county?.countyId);
    this.dataSource = new DataManager(
      {
        url: `${this.baseUrl}Township/LoadData?lang=${lang}`,
        adaptor: new UrlAdaptor(),
        headers: [{ authorization: `Bearer ${accessToken}` }],
      },
      this.query
    );
  }

  toolbarClick(args) {
    switch (args.item.id) {
      case "grid_excelexport":
        this.grid.excelExport({ hierarchyExportMode: "All" });
        break;
      case "grid_add":
        args.cancel = true;
        this.action.mode = 'add';
        this.action.initModel();
        this.action.open();
        break;
      default:
        break;
    }
  }
  delete(id) {
    this.alertify.confirm4(
      this.alert.yes_message,
      this.alert.no_message,
      this.alert.deleteTitle,
      this.alert.deleteMessage,
      () => {
        this.service.delete(id).subscribe(
          (res) => {
            if (res.success === true) {
              this.alertify.success(this.alert.deleted_ok_msg);
              this.loadData();
            } else {
              this.alertify.warning(this.alert.system_error_msg);
            }
          },
          (err) => this.alertify.warning(this.alert.system_error_msg)
        );
      },
      () => {
        this.alertify.error(this.alert.cancelMessage);
      }
    );
  }
  edit(data) {
    this.action.initModel();
    this.action.guid = data.guid;
    this.action.mode = 'edit';
    this.action.open();
  }
  saveChange() {
    this.loadData();
  }
}
