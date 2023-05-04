

import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AlertifyService, BaseComponent } from 'herr-core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { L10n,setCulture } from '@syncfusion/ej2-base';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { Favorite } from 'src/app/_core/_model/evse/model';
import { FavoriteActionComponent } from './favorite-action/favorite-action.component';
import { FavoriteService } from 'src/app/_core/_service/evse/favorite.service';
import { DataManager, Query, UrlAdaptor, Predicate } from "@syncfusion/ej2-data";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent  extends BaseComponent implements OnInit, OnChanges {
  locale = localStorage.getItem('lang');
  @ViewChild('grid') public grid: GridComponent;
  @ViewChild(FavoriteActionComponent) public action: FavoriteActionComponent;
  toolbarOptions = ['Add', 'Search'];
  editSettings = { showDeleteConfirmDialog: false, allowEditing: false, allowAdding: true, allowDeleting: false, mode: 'Normal' };
  dataSource: any;
  baseUrl = environment.apiUrl;
  query: Query;
  @Input() favorite: Favorite;
  @Input() memberGuid: string;
  @Output() favoriteChange = new EventEmitter<Favorite>();

  constructor(
    private alertify: AlertifyService,
    private service: FavoriteService,
    public translate: TranslateService,
  ) {
    super(translate,environment.apiUrl); 
   }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['memberGuid']) {
      this.loadData();
    }
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
    

  }
  loadData() {
    this.query = new Query();
    this.query.where("memberGuid", "equal", this.memberGuid);
    const accessToken = localStorage.getItem('token');
    const lang = localStorage.getItem('lang');
    this.dataSource = new DataManager({
      url: `${this.baseUrl}Favorite/LoadData?lang=${lang}`,
      adaptor: new UrlAdaptor,
      headers: [{ authorization: `Bearer ${accessToken}` }]
    }, this.query);
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
 this.favorite = args.rowData as Favorite;
 this.favoriteChange.emit(args.rowData);
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
