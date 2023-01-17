
import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import { Component, Input, OnInit, ViewChild, Output, EventEmitter, OnChanges, SimpleChanges ,Inject } from '@angular/core';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { TranslateService } from '@ngx-translate/core';
import { PigfarmCoreService } from '../../../services';

@Component({
  selector: 'app-pen-dropdownlist-modal',
  templateUrl: './pen-dropdownlist-modal.component.html',
  styleUrls: ['./pen-dropdownlist-modal.component.scss']
})
export class PenDropdownlistModalComponent implements OnInit, OnChanges {
  @Input() id = "pen-remote";
  @Input() selectedValue: any;
  @Input() placeholder = this.trans.instant("No Item");
  @Input() disabled = false;
  @Output() change = new EventEmitter<any>();
  @Output() ngModelChange = new EventEmitter<any>();
  @Output() selectedValueChange = new EventEmitter<any>();
  @ViewChild('penRemote') public dropdownObj: DropDownListComponent
  public data: DataManager;
  public query: Query ;
  public remoteFields: Object = { text: 'name', value: 'guid' };
  
  take = 10;
  skip = 0;
  roomGuid = '';
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
      const query = this.dropdownObj.query.search(e.text, ['penName', 'penNo']);
      e.updateData(this.data, query);
    }
  };
  public actionComplete(e: any): void {
    e.result = e.result.map(x => {
      let name = x.id === 0 ? this.trans.instant(x.name) : x.name;
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

async ngOnInit() {
  await this.loadData();
}

async loadData() {
  const data=  await this.service.getPensByFarmGuidOrRoomGuid(localStorage.getItem("farmGuid"), this.roomGuid).toPromise();
  this.data = data


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
  ngOnChanges(changes: SimpleChanges): void {
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
