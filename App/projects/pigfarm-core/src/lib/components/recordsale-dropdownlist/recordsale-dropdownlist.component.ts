
import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import { Component, Input, OnInit, ViewChild, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectorRef, AfterViewChecked ,Inject } from '@angular/core';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { TranslateService } from '@ngx-translate/core';
import { PigfarmCoreService } from '../../../services';

@Component({
  selector: 'app-recordsale-dropdownlist',
  templateUrl: './recordsale-dropdownlist.component.html',
  styleUrls: ['./recordsale-dropdownlist.component.scss']
})
export class RecordsaleDropdownlistComponent implements OnInit, OnChanges, AfterViewChecked {
  @Input() id = "recordsale-remote";
  @Input() selectedValue: any = '';
  @Input() placeholder = "";
  @Input() disabled = false;
  @Output() change = new EventEmitter<any>();
  @Output() selectedValueChange = new EventEmitter<any>();
  @ViewChild('remote') public dropdownObj: DropDownListComponent
  public data: any;
  public query: Query ;
  public remoteFields: Object = { text: 'name', value: 'guid' };
  
  public onFiltering: any = (e: any) => {
    if (e.text === '') {
      e.updateData(this.data);
    } else {
      const query = this.dropdownObj.query.clone().search(e.text, ['name','no']);
      e.updateData(this.data, query);
    }
  };
  constructor(@Inject("Env") private baseUrl,public trans: TranslateService,
    private cd: ChangeDetectorRef,
    public service: PigfarmCoreService) {}
  ngAfterViewChecked(): void {
    this.selectedValue = this.selectedValue || "";
    this.cd.detectChanges()
  }
  ngOnInit() {
    this.service.getByFarmGuid(localStorage.getItem('farmGuid')).subscribe(x=> {
      this.data = x;
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
  }
  onChange(args) {
    this.change.emit(args);
    this.selectedValueChange.emit(args.value);
  }

}
