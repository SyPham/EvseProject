
import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import { Component, Input, OnInit, ViewChild, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewInit, ChangeDetectorRef, AfterViewChecked ,Inject } from '@angular/core';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-code-type-dropdownlist',
  templateUrl: './code-type-dropdownlist.component.html',
  styleUrls: ['./code-type-dropdownlist.component.scss']
})
export class CodeTypeDropdownlistComponent implements OnInit, OnChanges, AfterViewChecked {
  @Input() id = "codeType-remote";
  @Input() selectedValue: any;
  @Input() placeholder = this.trans.instant("No item");
  @Input() codeType = "";
  @Input() disabled = false;
  @Output() change = new EventEmitter<any>();
  @Output() ngModelChange = new EventEmitter<any>();
  @Output() selectedValueChange = new EventEmitter<any>();
  @Output() selectedNameChange = new EventEmitter<any>();
  @ViewChild('codeTypeRemote') public dropdownObj: DropDownListComponent
  @Output('onblur') onblurChange = new EventEmitter<any>();

  public data: any;
  public query: Query ;
  public remoteFields: Object = { text: 'name', value: 'guid' };
  
  take = 100;
  skip = 0;
  firstValue: any;
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
    if (e.text === '') {
      e.updateData(this.data);
    } else {
      const query = this.dropdownObj.query.clone().search(e.text, 'name');
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
  constructor(@Inject("Env") private baseUrl,private cd: ChangeDetectorRef,public trans: TranslateService) {}
  ngAfterViewChecked(): void {
    this.selectedValue = this.selectedValue || "";
    this.id = this.id || Math.random() + '';
    this.cd.detectChanges()

  }
  ngOnInit() {
    this.query = new Query()
    .addParams("lang", localStorage.getItem('lang'));
    let data = new DataManager({
      url: `${this.baseUrl}CodeType/GetDataDropdownlist?lang=${localStorage.getItem('lang')}&codeType=${this.codeType}`,
      adaptor: new UrlAdaptor,
      crossDomain: true,
    });
    data.executeQuery(this.query.sortBy('guid')).then((x: any)=> {
      this.data = x.result.sort((a,b) => +a.guid - +b.guid);
      if ( this.data.length > 0) {
        this.firstValue = this.data[0].guid
      }
    })
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['codeType'] && changes['codeType'].currentValue === 'Employee_Status' ) {
      if (changes['selectedValue'] && changes['selectedValue'].currentValue) {
        this.selectedValue = changes['selectedValue'].currentValue + ''
      }
    }
  }
  onChange(args) {
    this.change.emit(args);
    this.selectedNameChange.emit(args.itemData?.name)
    this.selectedValueChange.emit(args.itemData?.guid)
  }
  onNgModelChange(value) {
    this.ngModelChange.emit(value);
    this.selectedValueChange.emit(value);
  }
  onblur(e) {
    this.onblurChange.emit(e);
  }
}
