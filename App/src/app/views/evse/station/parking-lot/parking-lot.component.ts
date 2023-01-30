import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AlertifyService, BaseComponent } from '@pigfarm-core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { L10n,setCulture } from '@syncfusion/ej2-base';
import { ParkingLotService } from 'src/app/_core/_service/parking-lot/parking-lot.service';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { ParkingLot, Site } from 'src/app/_core/_model/evse/model';
import { ParkingLotActionComponent } from './parking-lot-action/parking-lot-action.component';
import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-parking-lot',
  templateUrl: './parking-lot.component.html',
  styleUrls: ['./parking-lot.component.scss']
})
export class ParkingLotComponent implements OnInit {
 @Input() site: Site
 @Input() packingLot: ParkingLot
 @Output() packingLotChange = new EventEmitter<ParkingLot>();
 locale = localStorage.getItem('lang');
 @ViewChild('grid') public grid: GridComponent;
 @ViewChild(ParkingLotActionComponent) public action: ParkingLotActionComponent;
 toolbarOptions = ['Add', 'Search'];
  editSettings = { showDeleteConfirmDialog: false, allowEditing: false, allowAdding: true, allowDeleting: false, mode: 'Normal' };
  dataSource: any;
  baseUrl = environment.apiUrl;
  constructor(
    private alertify: AlertifyService,
    private service: ParkingLotService,
    public translate: TranslateService,
  ) { }

  ngOnInit() {
  }
  loadData() {
    const accessToken = localStorage.getItem('token');
    const lang = localStorage.getItem('lang');
    this.query = new Query()
    .where('siteGuid', 'equal', this.site?.guid);
    this.dataSource = new DataManager({
      url: `${this.baseUrl}Site/LoadData?lang=${lang}`,
      adaptor: new UrlAdaptor,
      headers: [{ authorization: `Bearer ${accessToken}` }]
    },this.query);
}
recordClick(args: any) {
 this.packingLot = args.rowData as ParkingLot;
 this.packingLotChange.emit(args.rowData);
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
}
