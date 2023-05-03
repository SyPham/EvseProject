import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AlertifyService, BaseComponent } from 'herr-core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { L10n,setCulture } from '@syncfusion/ej2-base';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { ImageConfig } from 'src/app/_core/_model/evse/model';
import { ImageConfigActionComponent } from './image-config-action/image-config-action.component';
import { ImageConfigService } from 'src/app/_core/_service/evse/image-config.service';

@Component({
  selector: 'app-image-config',
  templateUrl: './image-config.component.html',
  styleUrls: ['./image-config.component.scss']
})
export class ImageConfigComponent  extends BaseComponent implements OnInit {
  locale = localStorage.getItem('lang');
  @ViewChild('grid') public grid: GridComponent;
  @ViewChild(ImageConfigActionComponent) public action: ImageConfigActionComponent;
  toolbarOptions = ['Add', 'Search'];
  editSettings = { showDeleteConfirmDialog: false, allowEditing: false, allowAdding: true, allowDeleting: false, mode: 'Normal' };
  dataSource: any;
  baseUrl = environment.apiUrl;
  @Input() imageConfig: ImageConfig;
  @Output() imageConfigChange = new EventEmitter<ImageConfig>();

  constructor(
    private alertify: AlertifyService,
    private service: ImageConfigService,
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
      url: `${this.baseUrl}ImageConfig/LoadData?lang=${lang}`,
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
 this.imageConfig = args.rowData as ImageConfig;
 this.imageConfigChange.emit(args.rowData);
}
  toolbarClick(args) {
    switch (args.item.id) {
      case 'grid_excelexport':
        this.grid.excelExport({ hierarchyExportMode: 'All' });
        break;
      case 'grid_add':
        args.cancel = true;
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
    this.action.open();
  }
  saveChange() {
    this.loadData();
  }
}
