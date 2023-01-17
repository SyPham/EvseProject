import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import { Component, Input, OnInit, ViewChild, Output, EventEmitter, OnChanges, SimpleChanges ,Inject } from '@angular/core';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { TranslateService } from '@ngx-translate/core';
import { Predicate } from '@syncfusion/ej2-angular-grids';
import { PigfarmCoreService } from '../../../services/pigfarm-core.service';

@Component({
  selector: 'app-pen-dropdownlist',
  templateUrl: './pen-dropdownlist.component.html',
  styleUrls: ['./pen-dropdownlist.component.scss']
})
export class PenDropdownlistComponent implements OnInit, OnChanges {
  @Input() id = "pen-remote";
  @Input() selectedValue: any;
  @Input() placeholder = this.trans.instant("No Item");
  @Input() roomGuid = "";
  @Input() disabled = false;
  @Input() popupWidth = 300;
  @Input() enabledLoad = true;
  @Input() predicate: Predicate | null;
  @Output() change = new EventEmitter<any>();
  @Output() ngModelChange = new EventEmitter<any>();
  @Output() selectedValueChange = new EventEmitter<any>();
  @Output() selectedNameChange = new EventEmitter<any>();
  @Output('onblur') onblurChange = new EventEmitter<any>();
  @ViewChild('penRemote') public dropdownObj: DropDownListComponent
  public data: any;
  public penGuidName: any;
  public query: Query ;
  public remoteFields: Object = { text: 'name', value: 'guid' };
  
  take = 1000;
  skip = 0;
 
  public onFiltering: any = (e: any) => {
    if (e.text === '') {
      e.updateData(this.data);
    } else {
      const query = this.dropdownObj.query.search(e.text, ['penName', 'penNo']);
      e.updateData(this.data, query);
    }
  };
  public actionComplete(e: any): void {
    e.result = e.result.map(x => {
      let name = x.guid === "" ? this.trans.instant(x.name) : x.name;
      return {
        guid: x.guid,
        name: name
      }
    })
}
  constructor(@Inject("Env") private baseUrl,
    public trans: TranslateService,
    public service: PigfarmCoreService
    ) {

  }

  ngOnInit() {
  }
  
   async loadData() {
    this.data = await this.service.getPensByFarmGuidOrRoomGuid(localStorage.getItem("farmGuid"), this.roomGuid).toPromise();

    // this.query = new Query()
    //   .where('farmGuid', 'equal', localStorage.getItem('farmGuid'))
    //   .where('status', 'equal', 1);
    //   if (this.roomGuid) {
    //     this.query.where('roomGuid', 'equal', this.roomGuid);
    //   }
    // this.data = new DataManager({
    //   url: `${this.baseUrl}Pen/GetDataDropdownlist`,
    //   adaptor: new UrlAdaptor,
    //   crossDomain: true,
    // }, this.query.sortBy('penNo'));
  }
  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    this.selectedValue = this.selectedValue || "";
    if(this.dropdownObj && !this.selectedValue) {
      this.dropdownObj.value = null;
    }
    if (changes['enabledLoad'] && changes.enabledLoad.currentValue) {
      await this.loadData();
      this.selectedValue = changes['selectedValue']?.currentValue
    }
    if (changes['roomGuid'] && changes.roomGuid.currentValue) {
      await this.loadData();
      this.selectedValue = changes['selectedValue']?.currentValue
    }
  }
  onChange(args) {
    this.penGuidName = args.itemData?.name
    this.selectedNameChange.emit(args.itemData?.name || '')
    this.selectedValueChange.emit(args.itemData?.guid);
    this.ngModelChange.emit(args.itemData?.guid);
    this.change.emit(args);
  }
  onNgModelChange(value) {
    this.ngModelChange.emit(value);
    this.selectedValueChange.emit(value);
  }
  onblur(e) {
    this.onblurChange.emit(e);
  }
}
