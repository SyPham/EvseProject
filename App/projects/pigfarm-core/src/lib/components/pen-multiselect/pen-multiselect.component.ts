
import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import { Component, Input, OnInit, ViewChild, Output, EventEmitter, OnChanges, SimpleChanges ,Inject } from '@angular/core';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-pen-multiselect',
  templateUrl: './pen-multiselect.component.html',
  styleUrls: ['./pen-multiselect.component.scss']
})
export class PenMultiselectComponent implements OnInit, OnChanges {
  @Input() id = "pen-multi";
  @Input() selectedData: any=[];
  @Input() placeholder = "";
  @Input() roomGuid = "";
  @Input() disabled = false;
  @Output() change = new EventEmitter<any>();
  @Output() ngModelChange = new EventEmitter<any>();
  @Output() selectedValueChange = new EventEmitter<any>();
  @Output('onblur') onblurChange = new EventEmitter<any>();
  @ViewChild('penmulti') public dropdownObj: DropDownListComponent
  @Input() data: DataManager;
  @Input() query: Query ;
  @Input() popupHeight = '350px';
  public remoteFields: Object = { text: 'name', value: 'guid' };
  
  take = 10;
  skip = 0;

  public onFiltering: any = (e: any) => {
    if (e.text === '') {
      e.updateData(this.data);
    } else {
      const query = this.dropdownObj.query.clone().search(e.text, ['penName', 'penNo']);
      e.updateData(this.data, query);
    }
  };
  public actionComplete(e: any): void {
    e.result = e.result.filter(x=> x.guid != "");
}
  constructor(@Inject("Env") private baseUrl,public trans: TranslateService) {}

  ngOnInit() {

    this.query = new Query()
    .where('farmGuid', 'equal', localStorage.getItem('farmGuid'))
    .where('status', 'equal', 1);
    if (this.roomGuid) {
      this.query.where('roomGuid', 'equal', this.roomGuid);
    }
    this.data = new DataManager({
      url: `${this.baseUrl}Pen/GetDataDropdownlist`,
      adaptor: new UrlAdaptor,
      crossDomain: true,
    }, this.query);
  }
  ngOnChanges(changes: SimpleChanges): void {
  }
  onChange(args) {
    this.change.emit(args);
  }
  onNgModelChange(value) {
    this.ngModelChange.emit(value);
    this.selectedValueChange.emit(value);
  }

}
