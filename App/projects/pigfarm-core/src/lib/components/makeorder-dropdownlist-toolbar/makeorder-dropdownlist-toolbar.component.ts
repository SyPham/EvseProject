import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import { Component, Input, OnInit, ViewChild, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectorRef, AfterViewChecked ,Inject } from '@angular/core';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { TranslateService } from '@ngx-translate/core';
import { PigfarmCoreService } from '../../../services';

@Component({
  selector: 'app-makeorder-dropdownlist-toolbar',
  templateUrl: './makeorder-dropdownlist-toolbar.component.html',
  styleUrls: ['./makeorder-dropdownlist-toolbar.component.scss']
})
export class MakeorderDropdownlistToolbarComponent implements OnInit, OnChanges, AfterViewChecked {
  @Input() id = "makeorder-remote";
  @Input() selectedValue: any = '';
  @Input() placeholder = "";
  @Input() popupWidth: any = '350px';
  @Input() popupHeight='200px';
  @Input() disabled = false;
  @Output() change = new EventEmitter<any>();
  @Output() selectedValueChange = new EventEmitter<any>();
  @ViewChild('remote') public dropdownObj: DropDownListComponent
  public data: any;
  public query: Query ;
  public remoteFields: Object = { text: 'orderName', value: 'guid' };
  

  constructor(@Inject("Env") private baseUrl,public trans: TranslateService,
    private cd: ChangeDetectorRef,
    public service: PigfarmCoreService) {}
  ngAfterViewChecked(): void {
    this.selectedValue = this.selectedValue || "";
    this.cd.detectChanges()
  }
  ngOnInit() {
    this.service.getMakeOrderByFarmGuid(localStorage.getItem('farmGuid')).subscribe(x=> {
      this.data = x;
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedValue']) {
      this.selectedValueChange.emit(this.selectedValue);
    }
  }
  onChange(args) {
    this.change.emit(args);
    this.selectedValueChange.emit(args.value);
  }

}
