import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import { Component, Input, OnInit, ViewChild, Output, EventEmitter, OnChanges, SimpleChanges ,Inject } from '@angular/core';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-treatment-dropdownlist',
  templateUrl: './treatment-dropdownlist.component.html',
  styleUrls: ['./treatment-dropdownlist.component.scss']
})
export class TreatmentDropdownlistComponent implements OnInit {
  @Input() id = "treatmentMaster-remote";
  @Input() selectedValue: any;
  @Input() placeholder = "";
  @Input() disabled = false;
  @Output() change = new EventEmitter<any>();
  @Output() ngModelChange = new EventEmitter<any>();
  @Output() selectedValueChange = new EventEmitter<any>();
  @Input() popupWidth: any = '350px';
  @ViewChild('treatmentMasterRemote') public dropdownObj: DropDownListComponent
  public data: DataManager;
  public query: Query ;
  public remoteFields: Object = { text: 'name', value: 'guid' };
  
  take = 1000;
  skip = 0;
  public onFiltering: any = (e: any) => {
    if (e.text === '') {
      e.updateData(this.data);
    } else {
      const query = this.dropdownObj.query.clone().search(e.text, 'name');
      e.updateData(this.data, query);
    }
  };
  public actionComplete(e: any): void {
    console.log(e);
}
  constructor(@Inject("Env") private baseUrl,public trans: TranslateService) {}
  ngOnInit() {
    this.query = new Query()
    this.data = new DataManager({
      url: `${this.baseUrl}TreatmentMaster/GetDataDropdownlist`,
      adaptor: new UrlAdaptor,
      crossDomain: true,
    }, this.query);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.selectedValue = this.selectedValue || "";
  }
  onChange(args) {
    this.change.emit(args);
    this.selectedValueChange.emit(args.itemData?.guid)
  }
  onNgModelChange(value) {
    this.ngModelChange.emit(value);
    this.selectedValueChange.emit(value);
  }
}
