import { DataManager, Query, UrlAdaptor, Predicate } from '@syncfusion/ej2-data';
import { Component, Input, OnInit, ViewChild, Output, EventEmitter, OnChanges, SimpleChanges ,Inject } from '@angular/core';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-customer-dropdownlist-toolbar',
  templateUrl: './customer-dropdownlist-toolbar.component.html',
  styleUrls: ['./customer-dropdownlist-toolbar.component.css']
})
export class CustomerDropdownlistToolbarComponent implements OnInit, OnChanges {
  @Input() id = "customer-remote";
  @Input() selectedValue: any;
  @Input() placeholder = "";
  @Input() disabled = false;
  @Output() change = new EventEmitter<any>();
  @Output() ngModelChange = new EventEmitter<any>();
  @Output() selectedValueChange = new EventEmitter<any>();
  @ViewChild('customerRemote') public dropdownObj: DropDownListComponent
  public data: any;
  public query: Query ;
  public remoteFields: Object = { text: 'name', value: 'guid' };
  
  take = 1000;
  skip = 0;
  public onOpen(args) {
    // let start: number = this.take;
    // let end: number = 5;
    // let listElement: HTMLElement = (this.dropdownObj as any).list;
    // listElement.addEventListener('scroll', () => {
    //   console.log(listElement.scrollTop + listElement.offsetHeight,listElement.scrollHeight )
    //   if ((listElement.scrollTop + listElement.offsetHeight) >= listElement.scrollHeight) {

    //     let filterQuery = this.dropdownObj.query.clone();
    //     this.data.executeQuery(filterQuery.skip(start).take(end)).then((event: any) => {
    //       start = end;
    //       end += 5;
    //       // const unique = [...new Set(event.result.map(item => item.group))];
    //       this.dropdownObj.addItem(event.result as { [key: string]: Object }[]);
    //     }).catch((e: Object) => {
    //     });
    //   }
    // })
  }
  public onFiltering: any = (e: any) => {
    let query = new Query();
    //frame the query based on search string with filter type.
    let predicate: Predicate = new Predicate('name', 'contains', e.text);
    predicate = predicate.or('no', 'contains', e.text);
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.data, query);
  };
  public actionComplete(e: any): void {
    console.log(e);
}
  constructor(@Inject("Env") private baseUrl,public trans: TranslateService) {}
  ngOnInit() {
    this.query = new Query()
    new DataManager({
      url: `${this.baseUrl}Customer/GetCustomersSP`,
      adaptor: new UrlAdaptor,
      crossDomain: true,
    }).executeQuery(this.query).then((x: any)=> {
      this.data = x.result
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.selectedValue);
    this.selectedValue = this.selectedValue || "";
  }
  onChange(args) {
    this.change.emit(args);
  }
  onNgModelChange(value) {
    this.ngModelChange.emit(value);
    this.selectedValueChange.emit(value);
  }
}
