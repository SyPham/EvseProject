
import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import { Component, Input, OnInit, ViewChild, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectorRef, AfterViewChecked, OnDestroy ,Inject } from '@angular/core';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { TranslateService } from '@ngx-translate/core';
import { PigfarmCoreService } from '../../../services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-makeorder-dropdownlist',
  templateUrl: './makeorder-dropdownlist.component.html',
  styleUrls: ['./makeorder-dropdownlist.component.scss']
})
export class MakeorderDropdownlistComponent  implements OnInit, OnChanges, AfterViewChecked , OnDestroy{
  @Input() id = "makeorder-remote";
  @Input() selectedValue: any = '';
  @Input() placeholder = "";
  @Input() pigType = "";
  @Input() disabled = false;
  @Input() popupWidth = 'auto' ;
  @Output() change = new EventEmitter<any>();
  @Output() selectedValueChange = new EventEmitter<any>();
  @ViewChild('remote') public dropdownObj: DropDownListComponent
  public data: any;
  public query: Query ;
  public remoteFields: Object = { text: 'orderName', value: 'guid' };
  
  subscription: Subscription
  subscription2: Subscription
  constructor(@Inject("Env") private baseUrl,public trans: TranslateService,
    private cd: ChangeDetectorRef,
    public service: PigfarmCoreService) {}
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.subscription2?.unsubscribe();
  }
  ngAfterViewChecked(): void {
    this.selectedValue = this.selectedValue || "";
    this.cd.detectChanges()
  }
  ngOnInit() {
    if (!this.pigType) {
      this.loadData();
    }
  }
  loadData() {
   this.subscription = this.service.getMakeOrderByFarmGuid(localStorage.getItem('farmGuid')).subscribe(x=> {
      this.data = x;
    })
  }

  loadDataByPigType() {
    this.subscription2 = this.service.getMakeOrderByFarmGuidAndPigType(localStorage.getItem('farmGuid'), this.pigType).subscribe(x=> {
       this.data = x;
     })
   }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedValue']) {
      this.selectedValueChange.emit(this.selectedValue);
    }
    if (changes['pigType'] && changes['pigType'].currentValue) {
     this.loadDataByPigType();
    }
  }
  onChange(args) {
    this.change.emit(args);
    this.selectedValueChange.emit(args.value);
  }

}
