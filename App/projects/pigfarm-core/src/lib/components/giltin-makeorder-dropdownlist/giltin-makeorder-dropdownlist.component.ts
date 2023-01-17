import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import { Component, Input, OnInit, ViewChild, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectorRef, AfterViewChecked, OnDestroy ,Inject } from '@angular/core';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { TranslateService } from '@ngx-translate/core';
import { PigfarmCoreService } from '../../../services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-giltin-makeorder-dropdownlist',
  templateUrl: './giltin-makeorder-dropdownlist.component.html',
  styleUrls: ['./giltin-makeorder-dropdownlist.component.css']
})
export class GiltinMakeorderDropdownlistComponent  implements OnInit, OnChanges, AfterViewChecked , OnDestroy{
  @Input() id = "makeorder2-remote";
  @Input() selectedValue: any = '';
  @Input() placeholder = "";
  @Input() disabled = false;
  @Output() change = new EventEmitter<any>();
  @Output() giltInGuidChange = new EventEmitter<any>();
  @Output() selectedValueChange = new EventEmitter<any>();
  @ViewChild('remote') public dropdownObj: DropDownListComponent
  public data: any;
  public query: Query ;
  public remoteFields: Object = { text: 'name', value: 'guid' };
  
  constructor(@Inject("Env") private baseUrl,public trans: TranslateService,
    private cd: ChangeDetectorRef,
    public service: PigfarmCoreService) {}
  ngOnDestroy(): void {
   
  }
  ngAfterViewChecked(): void {
    this.selectedValue = this.selectedValue || "";
    this.cd.detectChanges()
  }
  ngOnInit() {
   this.loadData()
  }
  loadData() {
    this.query = new Query()
    .where('farmGuid', 'equal', localStorage.getItem('farmGuid'));
    this.data = new DataManager({
      url: `${this.baseUrl}GiltIn/LoadDataDropdownlist`,
      adaptor: new UrlAdaptor,
      crossDomain: true,
    }, this.query);
  }
 
  ngOnChanges(changes: SimpleChanges): void {
   
   
  }
  onChange(args) {
    this.change.emit(args);
    this.giltInGuidChange.emit(args.itemData?.giltInGuid)
    this.selectedValueChange.emit(args.value);
  }

}
