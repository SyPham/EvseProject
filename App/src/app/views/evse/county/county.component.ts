
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AlertifyService, BaseComponent } from 'herr-core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { L10n,setCulture } from '@syncfusion/ej2-base';
import { CountyService } from 'src/app/_core/_service/evse/county.service';
import { CountyActionComponent } from './county-action/county-action.component';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { County } from 'src/app/_core/_model/evse/model';
import { TownshipComponent } from './township/township.component';

@Component({
  selector: 'app-county',
  templateUrl: './county.component.html',
  styleUrls: ['./county.component.css']
})
export class CountyComponent extends BaseComponent implements OnInit {
  locale = localStorage.getItem('lang');
  @ViewChild('grid') public grid: GridComponent;
  @ViewChild(CountyActionComponent) public action: CountyActionComponent;
  @ViewChild(TownshipComponent) public townshipComponent: TownshipComponent;
  toolbarOptions = ['Add', 'Search'];
  editSettings = { showDeleteConfirmDialog: false, allowEditing: false, allowAdding: true, allowDeleting: false, mode: 'Normal' };
  dataSource: any;
  baseUrl = environment.apiUrl;
  @Input() county: County;
  @Output() countyChange = new EventEmitter<County>();

  constructor(
    private alertify: AlertifyService,
    private service: CountyService,
    public translate: TranslateService,
  ) {
    super(translate,environment.apiUrl); 
   }

  ngOnInit() {
    let lang = localStorage.getItem('lang');
    let languages = JSON.parse(localStorage.getItem('languages'));
    // setCulture(lang);
    let load = {
      [lang]: {
        grid: languages['grid'],
        pager: languages['pager']
      }
    };
    L10n.load(load);
    this.loadData();

  }
  loadData() {
    const accessToken = localStorage.getItem('token');
    const lang = localStorage.getItem('lang');
    this.dataSource = new DataManager({
      url: `${this.baseUrl}County/LoadData?lang=${lang}`,
      adaptor: new UrlAdaptor,
      headers: [{ authorization: `Bearer ${accessToken}` }]
    });
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
    }, () => {
      this.alertify.error(this.alert.cancelMessage);

    }
  );

}
recordClick(args: any) {
 this.county = args.rowData as County;

 this.countyChange.emit(args.rowData);
}
  toolbarClick(args) {
    switch (args.item.id) {
      case 'grid_excelexport':
        this.grid.excelExport({ hierarchyExportMode: 'All' });
        break;
      case 'grid_add':
        args.cancel = true;
        this.action.mode = 'add';
        this.action.initModel();
        this.action.open();
        break;
      default:
        break;
    }
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
